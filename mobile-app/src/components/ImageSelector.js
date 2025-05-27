import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {Button} from 'react-native-paper';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

const ImageSelector = ({setImageUri, setClassificationResult}) => {
  const handleImageResponse = response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
      return;
    }
    if (response.errorCode) {
      console.error('Image picker error: ', response.errorMessage);
      return;
    }
    if (response.assets && response.assets[0].uri) {
      setImageUri(response.assets[0].uri);
      setClassificationResult(null);
    }
  };

  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      handleImageResponse,
    );
  };

  const captureImage = () => {
    launchCamera(
      {
        mediaType: 'photo',
        maxHeight: 1080,
        maxWidth: 1920,
        cameraType: 'back',
        presentationStyle: 'fullScreen',
        includeBase64: false,
      },
      handleImageResponse,
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={[styles.button, styles.galleryButton]}
          labelStyle={styles.buttonLabel}
          icon="image" // Gallery icon
          onPress={selectImage}>
          Gallery
        </Button>
        <Button
          mode="contained"
          style={[styles.button, styles.cameraButton]}
          labelStyle={styles.buttonLabel}
          icon="camera" // Camera icon
          onPress={captureImage}>
          Camera
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 5,
  },
  button: {
    backgroundColor: '#5cbcbc',
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 20,
    elevation: 2,
  },
  buttonLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: 'white',
  },
});

export default ImageSelector;
