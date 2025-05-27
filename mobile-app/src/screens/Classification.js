import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Header from '../components/Header';
import axios from 'axios';
import {
  Provider as PaperProvider,
  Button,
  Card,
} from 'react-native-paper';
import ImageSelector from '../components/ImageSelector';
import ImageResult from '../components/ImageResult';
import LoadingIndicator from '../components/LoadingIndicator';

const Classification = () => {
  const [imageUri, setImageUri] = useState(null);
  const [classificationResult, setClassificationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const classifyImage = async () => {
    if (!imageUri) {
      alert('Please select or capture an image first!');
      return;
    }

    const formData = new FormData();
    formData.append('files', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });

    setLoading(true);
    try {
      const response = await axios.post(
        'https://hrvit.animoe.my.id/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.data && response.data.results) {
        setClassificationResult(response.data.results[0]);
      }
    } catch (error) {
      console.error('Error when sending the image:', error);
      alert('An error occurred while classifying the image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Header logoSource={require('../images/logo.png')} />
        <ImageSelector
          setImageUri={setImageUri}
          setClassificationResult={setClassificationResult}
        />

        {/* Image Preview */}
        {!imageUri ? (
          <View style={styles.heroClassification}>
            <Card style={styles.heroCard}>
              <View style={styles.noImageContainer}>
                <Text style={styles.noImageText}>Choose from Gallery or Take from Camera</Text>
              </View>
            </Card>
          </View>
        ) : (
          <View style={styles.heroClassification}>
            <Card style={styles.heroCard}>
              <Card.Cover source={{ uri: imageUri }} style={styles.heroImage} />
              <ImageResult classificationResult={classificationResult} />
            </Card>
          </View>
        )}


        {/* Loading or Classify Button */}
        {loading ? (
          <LoadingIndicator />
        ) : (
          <Button
            mode="contained"
            onPress={classifyImage}
            style={styles.classifyButton}
            contentStyle={styles.buttonContent}
            disabled={!imageUri}
            icon="image-search"
            >
            <Text style={styles.classifyText}>Process</Text>
          </Button>
        )}
      </ScrollView>
    </PaperProvider>
  );
};

export default Classification;

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
  card: {
    marginVertical: 20,
    borderRadius: 12,
    elevation: 4,
  },
  image: {
    height: 200,
    borderRadius: 12,
  },
  classifyButton: {
    marginVertical: 20,
    borderRadius: 30,
    color: 'white',
    backgroundColor: '#5cbcbc',
    alignSelf: 'center', // Menjaga tombol di tengah
    width: '40%', // Mengatur lebar tombol menjadi 50% dari lebar layar
  },
  classifyText: {
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  buttonContent: {
    paddingVertical: 10,
  },
  heroClassification: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    marginTop: 10,
  },
  heroCard: {
    width: '90%',
    marginVertical: 10,
    borderRadius: 26,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: '#5cbcbc',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 15,
  },
  heroImage: {
    width: 234,
    height: 260,
    marginBottom: 30,
    marginTop: 30,
    marginRight: 30,
    marginLeft: 30,
    borderRadius: 26,
  },
  heroTitleText: {
    fontFamily: 'Poppins-Bold',
    textAlign: 'left',
    marginLeft: 30,
    color: '#040627',
    fontSize: 22,
    marginBottom: 10,
  },
  heroFileText: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'left',
    marginLeft: 30,
    color: '#9192A5',
    fontSize: 16,
  },
  heroProbabilityText: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'left',
    marginLeft: 30,
    color: '#9192A5',
    fontSize: 16,
  },
  noImageText: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#9192A5',
    fontSize: 16,
    marginVertical: 20,
  },
  noImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 85,
  },
});