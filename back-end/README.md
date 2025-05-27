# Vision Transformer Hybrid with ResNet-50 Backend

This project implements a Vision Transformer Hybrid model using ResNet-50 as the feature extractor for waste classification. The application includes a backend built with Flask, providing endpoints for health checks, predictions, and file uploads.

## Table of Contents
- [Overview](#overview)
- [Setup](#setup)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Features](#features)
- [Best Practices Implemented](#best-practices-implemented)
- [Future Improvements](#future-improvements)

## Overview
This system is designed for waste classification into six categories:
- Battery
- Glass
- Metal
- Organic
- Paper
- Plastic

## Setup
### Prerequisites
- Python 3.9+
- TensorFlow 2.10+
- Flask

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/barenbaruna/HR-ViT.git
   cd your-repo
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Place the trained model file (`vit_hybrid_resnet_u10_final`) in the `model/` directory.

4. Start the Flask server:
   ```bash
   flask run
   ```

   Alternatively, use Gunicorn for production:
   ```bash
   gunicorn main:create_app
   ```

## Usage
### Prediction Example
To predict the class of an image, send a POST request to the `/predict` endpoint with the image path:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"image_path": "path/to/image.jpg"}' http://127.0.0.1:5000/predict
```

### Upload Multiple Files Example
You can upload multiple files using the `/upload` endpoint. Here’s an example using `curl`:

```bash
curl -X POST -F "files=@image1.jpg" -F "files=@image2.jpg" http://127.0.0.1:5000/upload
```

## Endpoints
### `/health` (GET)
- **Description**: Check if the server is running.
- **Response**: `{ "status": "healthy" }`

### `/predict` (POST)
- **Description**: Predict the class of an image.
- **Request Body**:
  ```json
  {
    "image_path": "path/to/image.jpg"
  }
  ```
- **Response**:
  ```json
  {
    "class_name": "plastic",
    "probability": 0.95
  }
  ```

### `/upload` (POST)
- **Description**: Upload multiple images for batch prediction.
- **Request Body**: Multipart form-data with files.
- **Response**:
  ```json
  {
    "results": [
      {
        "file": "image1.jpg",
        "class_name": "glass",
        "probability": 0.85
      },
      {
        "file": "image2.jpg",
        "class_name": "paper",
        "probability": 0.92
      }
    ]
  }
  ```

### `/class_names` (GET)
- **Description**: Retrieve the list of class names.
- **Response**:
  ```json
  {
    "class_names": ["battery", "glass", "metal", "organic", "paper", "plastic"]
  }
  ```

### `/logs` (GET)
- **Description**: Retrieve the latest 50 lines from the application log.
- **Response**:
  ```json
  {
    "logs": [
      "2024-12-01 12:00:00 [INFO] Model loaded successfully.",
      "2024-12-01 12:05:00 [INFO] Prediction requested for image: image.jpg"
    ]
  }
  ```

## Features
- **Robust Preprocessing**: Images are preprocessed with `preprocess_input` (ResNet-50 compatible) to ensure compatibility with the backbone.
- **Logging**: Logs all operations, including errors and predictions, to `app.log`.

## Best Practices Implemented
- **Validation**: Ensures only valid image files are processed.
- **Modular Design**: Functions and endpoints are modular for clarity and maintainability.
- **Temporary File Management**: Uses temporary directories for file uploads.
- **Documentation**: Provides clear and detailed API documentation for easy integration.

## Future Improvements
- **Model Optimization**:
  - Prune or quantize the model for faster inference.
  - Implement ensemble learning for improved accuracy.
- **Frontend Integration**: Build a user-friendly interface for image uploads and visualization.
- **Out-of-Distribution Enhancements**: Integrate advanced OOD detection techniques (e.g., Mahalanobis distance).
- **Continuous Monitoring**: Add metrics to monitor model performance in production.

---
For any issues or contributions, please submit a pull request or open an issue on the repository.

---
**Author**: AMH Project 0.2 Team
**Date**: on December, 2024  
