import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

class Header extends React.Component {
  render() {
    const {headline, caption, logoSource} = this.props;

    return (
      <View style={styles.headerContainer}>
        {/* Logo Section */}
        <Image source={logoSource} style={styles.logo} />

      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'left',
    
    marginTop: 10
  },
  logo: {
    width: 200,
    height: 50,
  },
  headline: {
    fontFamily: 'Poppins-ExtraBold',
    fontSize: 26,
    textAlign: 'center',
    marginTop: 20,
    color: '#040627',
  },
  caption: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    fontSize: 18,
    color: '#9192A5',
    marginBottom: 20,
  },
});

export default Header;
