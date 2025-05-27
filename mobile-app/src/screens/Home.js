import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Header from '../components/Header';
import { scale, verticalScale } from 'react-native-size-matters';

const Home = () => {

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {/* Header */}
      <Header logoSource={require('../images/logo.png')} />

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Image
          source={require('../images/welcome.png')} // Gambar untuk banner selamat datang
          style={styles.welcomeImage}
          resizeMode="cover"
        />
        
        {/* Typed Text */}
        <Text style={styles.welcomeText}>Hello, Welcome To ViTrash!</Text>
      </View>


      {/* Categories */}
      <View style={styles.categoriesContainer}>
        {/* Organic Category */}
        <View style={styles.card}>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>What is this App?</Text>
            <Text style={styles.cardSubtitle}>This app helps you identify the type of waste using artificial intelligence powered by a Hybrid Vision Transformer combined with ResNet50.
            </Text>
          </View>
        </View>
      </View>

      

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        {/* Organic Category */}
        <View style={styles.card}>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>How Does it Work?</Text>
            <Text style={styles.cardSubtitle}>Simply take a photo of your waste, and the app will classify it into one of six categories: battery, glass, metal, organic, paper, or plastic.</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: 10,
    paddingBottom: 100,
    backgroundColor: '#fffff',
  },
  welcomeSection: {
    width: '100%',
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Vertically align text with the image
    marginVertical: verticalScale(20),
  },
  welcomeImage: {
    width: verticalScale(110), // Adjust the width of the image
    height: verticalScale(120), // Adjust the height of the image
    borderRadius: 10,
  },
  welcomeText: {
    fontSize: scale(20),
    fontWeight: 'bold',
    marginLeft: scale(15), // Space between image and text
    color: '#577B8D',
    flex: 1, // Ensures the text takes up the remaining space
  },
  title: {
    fontSize: scale(20),
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: verticalScale(15),
    color: '#577B8D',
  },
  categoriesContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#5cbcbc',
    borderRadius: 10,
    marginVertical: verticalScale(10),
    marginHorizontal: scale(10),
    width: '100%',
    paddingTop: 10,
    height: verticalScale(150),
    flexDirection: 'row',
    alignItems: 'flex-start',  // Change from center to flex-start
    justifyContent: 'flex-start',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: verticalScale(130),
    height: verticalScale(270),
    borderRadius: 10,
    marginLeft: scale(10),
  },
  cardTextContainer: {
    flex: 1,
    marginLeft: scale(20),
    marginRight: scale(20),
    marginTop: verticalScale(10),
    alignItems: 'flex-start', // Align text to the top left
    justifyContent: 'flex-start', // Ensure content starts from the top
  },
  cardTitle: {
    fontSize: scale(16),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: verticalScale(5), // Add space between title and subtitle
  },
  cardSubtitle: {
    fontSize: scale(14),
    color: 'white', // Soft color for subtitle
    marginTop: verticalScale(5), // Add space between subtitle and title
    textAlign: 'justify',
    lineHeight: verticalScale(20),
  },
});
