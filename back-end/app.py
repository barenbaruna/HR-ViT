import os

# Nonaktifkan penggunaan GPU oleh TensorFlow
# os.environ['CUDA_VISIBLE_DEVICES'] = '-1'

import logging
from flask import Flask, render_template, jsonify, request
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.applications.resnet50 import preprocess_input


# ---------------------------------------------------------
# Logging Configuration
# ---------------------------------------------------------
# Konfigurasi logging
# Menambahkan file handler agar log disimpan ke 'app.log'
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(name)s: %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('app.log', mode='a', encoding='utf-8')
    ]
)

logger = logging.getLogger(__name__)

# ---------------------------------------------------------
# Configuration & Model Setup
# ---------------------------------------------------------
class Config:
    MODEL_PATH = "model/vit_hybrid_resnet_u10_final.h5"
    CLASS_NAMES = ["battery", "glass", "metal", "organic", "paper", "plastic"]

class Patches(tf.keras.layers.Layer):
    def __init__(self, patch_size, **kwargs):
        super().__init__(**kwargs)
        self.patch_size = patch_size

    def get_config(self):
        config = {"patch_size": self.patch_size}
        base_config = super().get_config()
        return {**base_config, **config}

    def call(self, images):
        batch_size = tf.shape(images)[0]
        patches = tf.image.extract_patches(
            images=images,
            sizes=[1, self.patch_size, self.patch_size, 1],
            strides=[1, self.patch_size, self.patch_size, 1],
            rates=[1, 1, 1, 1],
            padding="VALID",
        )
        patch_dims = patches.shape[-1]
        return tf.reshape(patches, [batch_size, -1, patch_dims])

class PatchClassEmbedding(tf.keras.layers.Layer):
    def __init__(self, d_model, num_patches):
        super().__init__()
        self.d_model = d_model
        self.num_patches = num_patches

    def build(self, input_shape):
        self.class_token = self.add_weight(
            name="class_token",
            shape=[1, 1, self.d_model],
            initializer="zeros",
            trainable=True,
        )
        self.position_embedding = self.add_weight(
            name="position_embedding",
            shape=[1, self.num_patches + 1, self.d_model],
            initializer="zeros",
            trainable=True,
        )

    def call(self, x):
        batch_size = tf.shape(x)[0]
        class_token = tf.broadcast_to(self.class_token, [batch_size, 1, self.d_model])
        x = tf.concat([class_token, x], axis=1)
        return x + self.position_embedding

    def get_config(self):
        return {"d_model": self.d_model, "num_patches": self.num_patches}


def load_vit_model(custom_objects):
    try:
        model = load_model(Config.MODEL_PATH, custom_objects=custom_objects)
        logger.info("Model loaded successfully.")
        return model
    except Exception as e:
        logger.error(f"Model failed to load: {str(e)}")
        raise Exception(f"Error loading model: {str(e)}")

custom_objects = {
    'Patches': Patches,
    'PatchClassEmbedding': PatchClassEmbedding
}

model = load_vit_model(custom_objects)


# ---------------------------------------------------------
# Helper Functions
# ---------------------------------------------------------
def preprocess_image(image_path, img_size=(224, 224)):
    img = load_img(image_path, target_size=img_size)
    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    return preprocess_input(img_array)  # ResNet50-compatible preprocessing



# ---------------------------------------------------------
# Endpoints
# ---------------------------------------------------------
def health_check():
    return jsonify({"status": "healthy"}), 200

def get_class_names():
    return jsonify({"class_names": Config.CLASS_NAMES}), 200

def get_logs():
    # Membaca log dari file 'app.log'
    log_file_path = 'app.log'
    if not os.path.exists(log_file_path):
        return jsonify({"logs": []}), 200

    # Misalnya, kita hanya mengambil 50 baris terakhir log
    with open(log_file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    recent_logs = lines[-50:]

    return jsonify({"logs": recent_logs}), 200

def predict():
    data = request.get_json()
    if 'image_path' not in data:
        logger.warning("Prediction requested without providing image_path.")
        return jsonify({"error": "Image path not provided."}), 400

    image_path = data['image_path']
    try:
        logger.info(f"Prediction requested for image: {image_path}")
        preprocessed_image = preprocess_image(image_path)
        predictions = model.predict(preprocessed_image)
        predicted_class = np.argmax(predictions[0])
        logger.info(f"Prediction result: {Config.CLASS_NAMES[predicted_class]} with probability {predictions[0][predicted_class]}")
        return jsonify({
            "class_name": Config.CLASS_NAMES[predicted_class],
            "probability": float(predictions[0][predicted_class])
        }), 200
    except Exception as e:
        logger.error(f"Error during prediction: {str(e)}")
        return jsonify({"error": str(e)}), 500

def status_check():
    if model is None:
        logger.error("Status check: Model not loaded.")
        return jsonify({"status": "unhealthy", "message": "Model not loaded."}), 500
    logger.info("Status check: Model is loaded and healthy.")
    return jsonify({"status": "healthy", "message": "Model loaded successfully."}), 200

def upload_files():
    files = request.files.getlist("files")
    if not files:
        logger.warning("Upload requested without any files.")
        return jsonify({"error": "No files provided."}), 400

    results = []
    temp_dir = 'waste/temp'
    os.makedirs(temp_dir, exist_ok=True)

    for file in files:
        if file.filename == '':
            logger.warning("File upload with empty filename.")
            return jsonify({"error": "No selected file."}), 400

        temp_path = os.path.join(temp_dir, file.filename)
        file.save(temp_path)
        logger.info(f"File {file.filename} uploaded and saved temporarily.")

        try:
            preprocessed_image = preprocess_image(temp_path)
            predictions = model.predict(preprocessed_image)
            predicted_class = np.argmax(predictions[0])
            probability = float(predictions[0][predicted_class])
            results.append({
                "file": file.filename,
                "class_name": Config.CLASS_NAMES[predicted_class],
                "probability": probability
            })
            logger.info(f"File {file.filename} predicted as {Config.CLASS_NAMES[predicted_class]} with probability {probability}")
        except Exception as e:
            logger.error(f"Error during file prediction: {str(e)}")
        finally:
            os.remove(temp_path)
            logger.info(f"Temporary file {file.filename} removed.")

    return jsonify({"results": results}), 200

def create_app():
    app = Flask(__name__, template_folder='waste/templates')
    
    @app.route('/')
    def index():
        return render_template('index.html')

    # Define routes
    app.add_url_rule('/health', 'health_check', health_check, methods=['GET'])
    app.add_url_rule('/predict', 'predict', predict, methods=['POST'])
    app.add_url_rule('/upload', 'upload_files', upload_files, methods=['POST'])
    app.add_url_rule('/class_names', 'get_class_names', get_class_names, methods=['GET'])
    app.add_url_rule('/status', 'status_check', status_check, methods=['GET'])
    app.add_url_rule('/logs', 'get_logs', get_logs, methods=['GET'])

    return app
