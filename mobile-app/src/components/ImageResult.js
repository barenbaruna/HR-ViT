import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Paragraph, Text} from 'react-native-paper';

const formatProbability = probability => {
  return (probability * 100).toFixed(2) + '%';
};

const TextItem = ({label, value, isBold}) => (
  <Paragraph style={styles.text}>
    {label}:{' '}
    <Text style={[styles.text, isBold && styles.boldText]}>{value}</Text>
  </Paragraph>
);

const ImageResult = ({classificationResult}) => {
  if (!classificationResult) return null;

  const {class_name, file, probability} = classificationResult;

  return (
    <Card.Content style={styles.cardContent}>
      <Text style={styles.titleClassification}>{class_name}</Text>
      <TextItem label="File" value={file} />
      <TextItem
        label="Probability"
        value={formatProbability(probability)}
        isBold
      />
    </Card.Content>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    marginBottom: 10,
  },
  titleClassification: {
    fontFamily: 'Poppins-Bold',
    marginLeft: 30,
    textAlign: 'left',
    color: '#040627',
    fontSize: 22,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  text: {
    color: '#9192A5',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginLeft: 30,
  },
});

export default ImageResult;
