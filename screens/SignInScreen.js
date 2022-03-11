import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, Input } from 'react-native-elements';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ipAdress from '../ip.js';

import AppLoading from 'expo-app-loading';
import {
  useFonts, 
  AlegreyaSans_300Light,  
  AlegreyaSans_400Regular,  
  AlegreyaSans_500Medium, 
  AlegreyaSans_700Bold,  
} from '@expo-google-fonts/alegreya-sans';


export default function SignInScreen(props) {

  let [fontsLoaded] = useFonts({
   AlegreyaSans_300Light,  
  AlegreyaSans_400Regular,  
  AlegreyaSans_500Medium, 
  AlegreyaSans_700Bold,  
  });

  const dispatch = useDispatch()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorSignIn, setErrorSignIn] = useState('')

  var handleSubmitSignin = async () => {

    var request = await fetch(`${ipAdress}/users/signin`, {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `email=${email}&password=${password}`
      })
    const response = await request.json() 
    if (response.result == true){
      dispatch({type: 'addToken', token: response.user.token})
      dispatch({type: 'addUserID', userID: response.user._id})
      props.navigation.navigate('BottomNavigator')
    }else{
      setErrorSignIn(response.error)
    } 

  }


  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={{width: '100%', height: '100%', alignItems: 'center'}}>

      <Text style={styles.title}>Connexion</Text>
      
      <View style={styles.buttonContainer}>
        <Button title={"Facebook"} icon={{name:'facebook', type: 'font-awesome', size: 15, color:'#1775f1'}}  iconContainerStyle={{ marginRight: 15 }} buttonStyle={{borderColor: '#1775f1'}} type="outline" containerStyle={{width: '40%', marginBottom: 15, marginHorizontal: 5}} titleStyle={{ fontSize: 17, color: 'black', fontFamily: 'AlegreyaSans_500Medium' }} />
        <Button title={"Google"} icon={{name:'google', type: 'font-awesome', size: 15, color:'#ea4438'}}  iconContainerStyle={{ marginRight: 15 }} buttonStyle={{borderColor: '#ea4438'}} type="outline" containerStyle={{width: '40%', marginBottom: 15, marginHorizontal: 5}} titleStyle={{fontSize: 17, color: 'black', fontFamily: 'AlegreyaSans_500Medium'}} />
      </View>

      <View style={styles.divider}></View>

      <Text style={styles.text}>ou</Text>

      <View style={styles.inputContainer}>
        <Input placeholder='Email' leftIcon={{ type: 'font-awesome', name: 'envelope', marginRight: 5 }} label='Email' style={{fontFamily: 'AlegreyaSans_400Regular'}} labelStyle={{color: '#2C3E50' }} value={email} onChangeText={setEmail}/>
        <Input placeholder='Mot de passe' leftIcon={{ type: 'font-awesome', name: 'lock', marginRight: 5}} label='Mot de passe' style={{fontFamily: 'AlegreyaSans_400Regular' }} labelStyle={{color: '#2C3E50' }} containerStyle={{marginTop: 20}} value={password} onChangeText={setPassword} secureTextEntry/>
        <Text style={styles.error}>{errorSignIn}</Text>
      </View>

      <View style={styles.validateContainer}>
        <Button title={"Se connecter"} icon={{name:'arrow-right', type: 'font-awesome', size: 20, color:'white'}}  iconContainerStyle={{ marginRight: 15 }} buttonStyle={{backgroundColor: '#D35400'}} containerStyle={{width: '70%', marginBottom: 15, marginHorizontal: 5}} titleStyle={{fontFamily: 'AlegreyaSans_700Bold', fontSize: 20}} onPress={() => handleSubmitSignin()}/>
      </View>

      </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )};
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },

  title: {
    color: '#2C3E50',
    fontFamily: 'AlegreyaSans_500Medium',
    fontSize: 35,
    textAlign: 'center',
    marginTop: 50
  },

  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 70,
  },

  divider: {
    width: '80%',
    height: 1,
    backgroundColor: '#c7c7c7',
    marginTop: 40
  },

  text: {
    color: '#c7c7c7',
    fontFamily: 'AlegreyaSans_300Light'
  },

  inputContainer: {
    width: '80%',
    marginTop: 30
  },

  validateContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 70
  },

  error: {
    color: 'red',
    alignSelf: 'center',
    fontFamily: 'AlegreyaSans_300Light',
    fontSize: 15
  }
});
