import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { CheckBox, Button, Icon, Switch, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
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

export default function SignUpScreen(props) {

  let [fontsLoaded] = useFonts({
    AlegreyaSans_300Light,
    AlegreyaSans_400Regular,
    AlegreyaSans_500Medium,
    AlegreyaSans_700Bold,
  });


  const dispatch = useDispatch()

  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [optinEmails, setOptinEmails] = useState(false)
  const [errorSignUp, setErrorSignUp] = useState('')

  // Statut Proprio vs Sitter
  const [owner, setOwner] = useState(false);
  const [sitter, setSitter] = useState(false)


  const onForgotPasswordPressed = () => {
    console.warn('Your password')
  };

  const onSingInPressed = () => {
    props.navigation.navigate('SignInScreen')
  };

  // Gestion du signup :
  var handleSubmitSignup = async () => {

    if (owner != false || sitter != false) {

      var request = await fetch(`${ipAdress}/users/signup`, {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `pseudo=${pseudo}&email=${email}&password=${password}&status=${owner}&optinEmails=${optinEmails}`
      })

      const response = await request.json()
      if (response.result == true) {
        setErrorSignUp('')
        dispatch({ type: 'addToken', token: response.userSaved.token })
        dispatch({ type: 'addUserID', userID: response.userSaved._id })
        // AsyncStorage.setItem({"pseudo": pseudo})
        props.navigation.navigate('MoreInfoScreen', { token: response.userSaved.token })
      } else if (response.error === "email déjà utilisé") {
        setErrorSignUp("Email déjà utilisé")
      } else if (response.error === "Veuillez saisir un email valide ! ") {
        setErrorSignUp("Veuillez saisir un email valide ! ")
      }
      else {
        setErrorSignUp("Veuillez remplir tous les champs!")
      }
    } else {
      setErrorSignUp("Veuillez selectionner une checkbox")
    }

  }
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

    return (
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <ScrollView style={{ width: '100%' }}>
            <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
              <Text style={styles.title}>Inscription</Text>

              <View style={styles.buttonContainer}>
                <Button title={"Facebook"} icon={{ name: 'facebook', type: 'font-awesome', size: 15, color: '#1775f1' }} iconContainerStyle={{ marginRight: 15 }} buttonStyle={{ borderColor: '#1775f1' }} type="outline" containerStyle={{ width: '40%', marginBottom: 15, marginHorizontal: 5 }} titleStyle={{ fontSize: 17, color: 'black', fontFamily: 'AlegreyaSans_500Medium' }} />
                <Button title={"Google"} icon={{ name: 'google', type: 'font-awesome', size: 15, color: '#ea4438' }} iconContainerStyle={{ marginRight: 15 }} buttonStyle={{ borderColor: '#ea4438' }} type="outline" containerStyle={{ width: '40%', marginBottom: 15, marginHorizontal: 5 }} titleStyle={{ fontSize: 17, color: 'black', fontFamily: 'AlegreyaSans_500Medium' }} />
              </View>

              <Text onPress={onSingInPressed} style={{ fontSize: 17, color: '#34495E', fontFamily: 'AlegreyaSans_400Regular' }}>Déjà un compte? Connectez-vous ici !</Text>
              <View style={styles.divider}></View>
              <Text style={styles.text}>ou</Text>
              <View style={styles.inputContainer}>
                <Input placeholder='Email' leftIcon={{ type: 'font-awesome', name: 'envelope', marginRight: 5 }} label='Email' style={{ fontFamily: 'AlegreyaSans_400Regular' }} labelStyle={{ color: '#2C3E50' }} value={email} onChangeText={setEmail} />
                <Input placeholder="Pseudo" leftIcon={{ type: 'font-awesome', name: 'user', marginRight: 5 }} label='Pseudo' style={{ fontFamily: 'AlegreyaSans_400Regular' }} labelStyle={{ color: '#2C3E50' }} value={pseudo} onChangeText={setPseudo} />
                <Input placeholder='Mot de passe' leftIcon={{ type: 'font-awesome', name: 'lock', marginRight: 5 }} label='Mot de passe' style={{ fontFamily: 'AlegreyaSans_400Regular' }} labelStyle={{ color: '#2C3E50' }} containerStyle={{ marginTop: 10 }} value={password} onChangeText={setPassword} secureTextEntry />
                <Text style={styles.error}>{errorSignUp}</Text>
              </View>

              <Text onPress={onForgotPasswordPressed} style={{ fontSize: 17, color: '#34495E', fontFamily: 'AlegreyaSans_400Regular', position: 'relative', bottom: 30 }} >Mot de passe oublié ?</Text>
              <Text style={styles.subtile}>Je souhaite :</Text>
                <View style={styles.containerCheckbox}>
                  <CheckBox
                    center
                    title="Garder"
                    checkedColor={'#D35400'}
                    textStyle={styles.textCheckbox}
                    checked={owner}
                    onPress={() => { setSitter(false); setOwner(true) }}
                  />
                  <CheckBox
                    center
                    title="Faire Garder"
                    checkedColor={'#D35400'}
                    textStyle={styles.textCheckbox}
                    checked={sitter}
                    onPress={() => { setSitter(true); setOwner(false) }}
                  />
                </View>

                <View style={{flexDirection:'row', width:'90%', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AlegreyaSans_300Light', marginTop:30}}>J'accepte de recevoir des mails de PetFriends   </Text>
                <Switch
                  value={optinEmails}
                  onValueChange={(value) => setOptinEmails(value)}
                  color={'#D35400'}
                  marginTop={20}
                />
                </View>
              </View>
              <View style={styles.validateContainer}>
                <Button title={"S'inscrire"} icon={{ name: 'arrow-right', type: 'font-awesome', size: 20, color: 'white' }} iconContainerStyle={{ marginRight: 15 }} buttonStyle={{ backgroundColor: '#D35400' }} containerStyle={{ width: '70%', marginBottom: 15, marginHorizontal: 5 }} titleStyle={{ fontFamily: 'AlegreyaSans_700Bold', fontSize: 20 }} onPress={() => handleSubmitSignup()} />
              </View>
         
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  containerCheckbox: {
    flexDirection: 'row',
    borderRadius: 25,
    padding: 1,
    marginVertical: 1,
    marginTop: 15,
    alignSelf: 'center'
  },
  error: {
    color: "red"
  },

  divider: {
    width: '80%',
    height: 1,
    backgroundColor: '#c7c7c7',
    marginTop: 30
  },

  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },

  text: {
    color: '#c7c7c7',
    fontFamily: 'AlegreyaSans_300Light'
  },
  inputContainer: {
    width: '80%',
    marginTop: 15
  },
  title: {
    color: '#2C3E50',
    fontFamily: 'AlegreyaSans_500Medium',
    fontSize: 35,
    textAlign: 'center',
    marginTop: 50
  },
  textCheckbox: {
    color: '#2C3E50',
    fontFamily: 'AlegreyaSans_500Medium',
    fontSize: 15
  },
  subtile: {
    fontSize: 19,
    color: '#2C3E50',
    alignSelf: 'flex-start',
    marginLeft: 45,
    fontFamily: 'AlegreyaSans_700Bold',
    marginTop: -10
  },
  validateContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: -40
  },

});