import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, Pressable } from 'react-native';
import {Button} from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

import AppLoading from 'expo-app-loading';
import {
  useFonts,
  AlegreyaSans_100Thin,
  AlegreyaSans_100Thin_Italic,
  AlegreyaSans_300Light,
  AlegreyaSans_300Light_Italic,
  AlegreyaSans_400Regular,
  AlegreyaSans_400Regular_Italic,
  AlegreyaSans_500Medium,
  AlegreyaSans_500Medium_Italic,
  AlegreyaSans_700Bold,
  AlegreyaSans_700Bold_Italic,
  AlegreyaSans_800ExtraBold,
  AlegreyaSans_800ExtraBold_Italic,
  AlegreyaSans_900Black,
  AlegreyaSans_900Black_Italic,
} from '@expo-google-fonts/alegreya-sans';


// function CustomButton({ onPress, text, type = "PRIMARY", bgColor, fgColor }) {

//   return (
//     <Pressable onPress={onPress}
//       style={[styles.containerButton, styles[`container_${type}`],
//       bgColor ? { backgroundColor: bgColor } : {}
//       ]}>
//       <Text
//         style={[styles.text, styles[`text_${type}`],
//         fgColor ? { color: fgColor } : {}
//         ]}>{text}</Text>
//     </Pressable>
//   );
// }

export default function HomeScreen(props) {

  let [fontsLoaded] = useFonts({
    AlegreyaSans_100Thin,
    AlegreyaSans_100Thin_Italic,
    AlegreyaSans_300Light,
    AlegreyaSans_300Light_Italic,
    AlegreyaSans_400Regular,
    AlegreyaSans_400Regular_Italic,
    AlegreyaSans_500Medium,
    AlegreyaSans_500Medium_Italic,
    AlegreyaSans_700Bold,
    AlegreyaSans_700Bold_Italic,
    AlegreyaSans_800ExtraBold,
    AlegreyaSans_800ExtraBold_Italic,
    AlegreyaSans_900Black,
    AlegreyaSans_900Black_Italic,
  });


  const isFocused = useIsFocused();
  
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

        <Text style={styles.title}>Bienvenue parmi nous !</Text>

        <Image style={styles.image} source={require('../assets/petfriends-logo.png')} resizeMode={'contain'} />
        <Text style={styles.subtitle}>L'application qui te permet de faire des rencontres grâce à nos compagnons préférés !</Text>

        <View style={styles.buttonContainer}>
          <Button title={'Se connecter'} buttonStyle={{backgroundColor: '#D35400'}} containerStyle={{width: '70%', marginBottom: 15}} titleStyle={{fontFamily: 'AlegreyaSans_700Bold', fontSize: 20}} onPress={() => props.navigation.navigate('SignInScreen')}/>
          <Button title={"S'inscrire"} buttonStyle={{backgroundColor: '#D35400'}} containerStyle={{width: '70%', marginBottom: 15}} titleStyle={{fontFamily: 'AlegreyaSans_700Bold', fontSize: 20}} onPress={() => props.navigation.navigate('SignUpScreen')}/>
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
    backgroundColor: 'rgb(255, 249, 234)',
    paddingTop: 50,
  },

  title: {
    fontSize: 35,
    color: '#2C3E50',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'AlegreyaSans_500Medium'
  },

  buttonContainer: {
    width: "100%",
    marginTop: 100,
    alignItems: 'center'    
  },

  image: {
    backgroundColor: 'rgb(255, 249, 234)',
    width: "100%",
    height: 300,
  },

  subtitle: {
    textAlign: 'center',
    fontFamily: 'AlegreyaSans_400Regular_Italic',
    color: '#2C3E50',
    fontSize: 15,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20
  }, 
});
