import React, { useState } from 'react';
import { Image } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import Home from './src/screens/Home';
import Course from './src/screens/Course';
import Classification from './src/screens/Classification';


const App = () => {
  const [selectedTab,setSelectedTab]= useState(0)

  // const CustomTabButton = ({children, onPress})

  return (
    <>
    <View style = {styles.container}>
      {selectedTab==0?<Home/>:selectedTab==1?<Learn/>:selectedTab==2?<Classification/>:selectedTab==3?<Course/>:<WatchList/>}
      <View style={styles.bottomNav}>
        <View style={styles.bottomNav2}>
          <TouchableOpacity style={styles.bottomTab} onPress={() => {setSelectedTab(0);}}>
          <View style={[styles.tabIconBg, {backgroundColor: selectedTab == 0 ? '#e4e4e4' : 'white', borderRadius: scale(10)}]}>
            <Image source={require('./src/images/home.png')} style={styles.tabIcon}/> 
            </View>
            <Text style={{color: '#5cbcbc', fontSize:14}}>Home</Text>
          </TouchableOpacity>
         
          <TouchableOpacity style={styles.bottomTab} onPress={() => {setSelectedTab(2);}}>
          <View style={[styles.tabIconBg, {backgroundColor: selectedTab == 2 ? '#e4e4e4' : 'white', borderRadius: scale(10)}]}>
            <Image source={require('./src/images/scan.png')} style={styles.tabIcon}/>
            </View>
            <Text style={{color: '#5cbcbc', fontSize:14, }}>Scan</Text> 
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomTab} onPress={() => {setSelectedTab(3);}}>
          <View style={[styles.tabIconBg, {backgroundColor: selectedTab == 3 ? '#e4e4e4' : 'white', borderRadius: scale(10)}]}>
            <Image source={require('./src/images/info.png')} style={styles.tabIcon}/>
            </View>
            <Text style={{color: '#5cbcbc', fontSize:14, }}>Categories</Text> 
          </TouchableOpacity>
          
        </View>
      </View>
    </View>


    </>
    
  );
}



export default App;

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'white'
    },

    bottomNav:{
      width:'100%',
      height:verticalScale(60),
      backgroundColor:'white',
      borderTopStartRadius:scale(17),
      borderTopRightRadius:scale(17),
      position:'absolute',
      bottom:0
    },

    bottomNav2:{
      width:'100%',
      height:verticalScale(55),
      justifyContent:'space-evenly',
      alignItems:'center',
      flexDirection:'row'
    },

    bottomTab:{
      width:'20%',
      height:'100%',
      justifyContent:'center',
      alignItems:'center',
      marginTop: 10
    },

    tabIcon:{
      width:scale(20),
      height:scale(20)
    },

    tabIconBg:{
      width:scale(38),
      height:scale(38),
      justifyContent:'center',
      alignItems:'center'
    },

    tabIcon2: {
      width:scale(28),
      height:scale(28),
      tintColor:'white', 
      marginTop:15, 
      marginLeft:29
    }
})





