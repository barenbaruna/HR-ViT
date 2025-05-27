import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Modal } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { Card } from 'react-native-paper';
import Header from '../components/Header';

const Course = () => {
  // State untuk mengelola modal dan data detail
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Data statis untuk Waste Classification
  const staticData = [
    { image: require('../images/plastic.png'), label: 'Plastic', description: 'Electronic waste such as used batteries. Must be disposed of in special facilities due to harmful chemical content' },
    { image: require('../images/metal.png'), label: 'Metal', description: 'Waste made of metal material, often recycled to create new products.' },
    { image: require('../images/glass.png'), label: 'Glass', description: 'Waste made of glass material that can be recycled' },
    { image: require('../images/organic.png'), label: 'Organic', description: 'Waste that can decompose naturally.' },
    { image: require('../images/battery.png'), label: 'Battery', description: 'Electronic waste such as used batteries. Must be disposed of in special facilities due to harmful chemical content.' },
    { image: require('../images/paper.png'), label: 'Paper', description: 'Waste made from plastic materials. Widely used but takes a long time to decompose.' },
  ];

  // Fungsi untuk membuka modal dengan data detail
  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {/* Header */}
      <Header logoSource={require('../images/logo.png')} />

      {/* Waste Classification Section */}
      <Text style={styles.titleClassification}>Waste Categories</Text>
      <View style={styles.wasteClassification}>
        {staticData.map((item, index) => (
          <Card
            key={index}
            style={styles.wasteCard}
            onPress={() => openModal(item)}
          >
            <Image source={item.image} style={styles.wasteImage} />
            <Text style={styles.wasteButtonText}>{item.label}</Text>
          </Card>
        ))}
      </View>

      {/* Modal for Detail */}
      {selectedItem && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={selectedItem.image} style={styles.modalImage} />
              <Text style={styles.modalTitle}>{selectedItem.label}</Text>
              <Text style={styles.modalDescription}>{selectedItem.description}</Text>
              <View style={styles.closeButton} onTouchEnd={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};

export default Course;

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
  titleClassification: {
    fontFamily: 'Poppins-ExtraBold',
    fontSize: 26,
    textAlign: 'center',
    marginTop: verticalScale(40),
    fontWeight: 'bold',
    color: '#577B8D'
  },
  wasteClassification: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    marginTop: 10,
  },
  wasteCard: {
    width: '45%',
    marginVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: '#5cbcbc',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 15,
  },
  wasteImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
    borderRadius: 10,
  },
  wasteButtonText: {
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    color: '#040627',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#5cbcbc',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 