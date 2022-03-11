import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import {Button} from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppLoading from 'expo-app-loading';
import {
  useFonts,
  AlegreyaSans_400Regular_Italic,
  AlegreyaSans_700Bold,
} from '@expo-google-fonts/alegreya-sans';


export default function HomeScreen(props) {

  let [fontsLoaded] = useFonts({
    AlegreyaSans_400Regular_Italic,
    AlegreyaSans_700Bold,
  });


  
  const [pseudo, setPseudo] = useState('')
  const [message, setMessage] = useState(false)

  // Récupération du pseudo au chargement de la page :
  useEffect(() => {
    AsyncStorage.getItem('user', function (error, data) {
      if (pseudo) {
        setMessage(true)
        setPseudo(data.pseudo)
        console.log("local storage : " + pseudo)
      } else {
        setMessage(false)
      }
    })
  }, [])

  //Affichage de la home différente en fonction de si le user est connu ou pas ! 
  var display = ''
  if (message === true) {
    display =
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Tu nous avais manqués {pseudo} !</Text>
        <Image style={styles.image} source={require('../assets/petfriends-logo.png')} resizeMode={'contain'} />

        <Button title={'Aller sur la carte '} containerStyle={styles.button} onPress={() => props.navigation.navigate('BottomNavigator')}/>
      </View>

    </View>

  } else {
    display =
      <View style={styles.container}>

        <Image style={styles.image} source={require('../assets/petfriends-logo.png')} resizeMode={'contain'} />
        <Text style={styles.subtitle}>L'application qui te permet de faire des rencontres grâce à nos compagnons préférés !</Text>

        <View style={styles.buttonContainer}>
          <Button title={"S'inscre sur PetFriends"} buttonStyle={{backgroundColor: '#D35400'}} containerStyle={{width: '70%', marginBottom: 15}} titleStyle={{fontFamily: 'AlegreyaSans_700Bold', fontSize: 20}} onPress={() => props.navigation.navigate('SignUpScreen')}/>
          <Button title={"J'ai déjà un compte"} buttonStyle={{borderColor: '#D35400'}} type="outline" containerStyle={{width: '70%', marginBottom: 15}} titleStyle={{fontFamily: 'AlegreyaSans_700Bold', fontSize: 20, color: '#D35400'}} onPress={() => props.navigation.navigate('SignInScreen')}/>
        </View>
      </View>
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    
    [display]

  );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: 'white'
  },

  buttonContainer: {
    width: "100%",
    marginTop: 100,
    alignItems: 'center'    
  },

  image: {
    width: "100%",
    height: 250,
    width: 250,
    marginTop: 50,
    alignSelf: 'center'
  },

  subtitle: {
    textAlign: 'center',
    fontFamily: 'AlegreyaSans_400Regular_Italic',
    color: '#2C3E50',
    fontSize: 16,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20
  }, 
});
