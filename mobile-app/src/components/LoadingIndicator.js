import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';

const LoadingIndicator = ({message = 'Loading...'}) => {
  return (
    <View style={styles.container}>
      {/* Spinner */}
      <ActivityIndicator size="large" color="#002B5B" />

      {/* Loading Message */}
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: 15,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#002B5B', 
    textAlign: 'center',
  },
});

export default LoadingIndicator;
