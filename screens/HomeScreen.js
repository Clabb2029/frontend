import { StyleSheet, Text, Image, View, Button, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFonts, AlegreyaSans_100Thin, AlegreyaSans_500Medium } from '@expo-google-fonts/alegreya-sans'
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';


function CustomButton({ onPress, text, type = "PRIMARY", bgColor, fgColor }) {

  return (
    <Pressable onPress={onPress}
      style={[styles.containerButton, styles[`container_${type}`],
      bgColor ? { backgroundColor: bgColor } : {}
      ]}>
      <Text
        style={[styles.text, styles[`text_${type}`],
        fgColor ? { color: fgColor } : {}
        ]}>{text}</Text>
    </Pressable>
  );
}

export default function HomeScreen(props) {
  const isFocused = useIsFocused();
  const onRegisterPressed = () => {
    console.warn("Sign In")
  };

  let [fontsLoaded] = useFonts({
    AlegreyaSans_100Thin, AlegreyaSans_500Medium
  })

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
  var textWelcome = ''
  if (message === true) {
    textWelcome =
      <View>
        <Text style={{ textAlign: 'center', marginBottom: 25, fontSize: 25 }}>Welcome back {pseudo} !</Text>
        <CustomButton text="Aller sur la map" onPress={() => props.navigation.navigate('BottomNavigator')} />
      </View>

  } else {
    textWelcome =
      (<View style={styles.buttonsContainer}>
        <CustomButton text="SE CONNECTER" onPress={() => props.navigation.navigate('SignInScreen')} />
        <CustomButton text="S'INSCRIRE" onPress={() => props.navigation.navigate('SignUpScreen')} />
      </View>)
  }
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/petfriends-logo.png')} resizeMode={'contain'} />
      {textWelcome}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  buttonsContainer: {
    width: "100%",
    padding: 20
  },

  containerButton: {
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 10,
  },

  container_PRIMARY: {
    backgroundColor: "#D35400",
  },
  text: {
    fontWeight: 'bold',
    color: '#fff'
  },
  container_TERTIARY: {

  },
  image: {
    borderRadius: 15,
    backgroundColor: "#FFF",
    marginBottom: 50,
    overflow: 'hidden',
    width: "100%",
    height: 400,
  },

  title: {
    padding: 2,
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10
  },
});
