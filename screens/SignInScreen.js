import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Pressable, TextInput } from 'react-native';
import { CheckBox, SocialIcon,Icon, Switch } from 'react-native-elements';
import {useDispatch} from 'react-redux';

function CustomButton({onPress, text, type ="PRIMARY", bgColor, fgColor }) {
  return (
     <Pressable onPress={onPress} 
     style={[styles.containerButton, styles[`container_${type}`],
     bgColor ? {backgroundColor: bgColor} : {}
     ]}>
         <Text 
         style={[styles.text, styles[`text_${type}`],
         fgColor ? {color: fgColor} :{}
         ]}>{text}</Text>
     </Pressable>
  );
}

function SocialMediaButtons(props) {

  const onGoogleSignInPressed = () => {
      console.warn('"Gloogloo')
  };

  const onFacebookSingInPressed = () => {
      console.warn('faceAbook')
  };
  return (
      <>
    <View style={{width: '100%', flexDirection: 'column'}}>
            <SocialIcon
              button
              title="Sign In facebook"
              type="facebook"
              onPress={onFacebookSingInPressed}
            />
          </View>
          <View style={{width: '100%', flexDirection: 'column'}}>
            <SocialIcon
              title="Sign In Google Plus"
              button
              type="google-plus-official"
              onPress={onGoogleSignInPressed}
            />
          </View>
          </>
  );
}

function CustomInputs({value, setValue, placeholder, secureTextEntry}) {
  return (
     <View style={styles.containerInput}>
         <TextInput
         value={value}
         onChangeText={setValue}
         placeholder={placeholder }
         style={styles.input}
         secureTextEntry={secureTextEntry}/>
     </View>
  );
}

 
export default function SignInScreen(props) {

  const dispatch = useDispatch()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorSignIn, setErrorSignIn] = useState('')

var handleSubmitSignin = async () => {

<<<<<<< HEAD
  var request = await fetch('http://192.168.72.114:3000/users/signin', {
=======
  var request = await fetch('http://192.168.1.5:3000/users/signin', {
>>>>>>> 82c519d4a20d8393f7b4d7b3ba5275d706fbc61c
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
return (
  <View style={styles.container}>
    <Text style={styles.title}>CONNECTION</Text>
    
    <SocialMediaButtons />
      <View style={styles.inputButton}>
      <CustomInputs placeholder="Email" value={email} setValue={setEmail}/>
      <CustomInputs placeholder="Password" value={password} setValue={setPassword} secureTextEntry />
      </View>
    <Text style={styles.error}>{errorSignIn}</Text>
    <CustomButton text="SE CONNECTER" onPress={() => handleSubmitSignin()} />
  </View>
);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    padding: 10,
  },

  inputButton: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
  
  },
  containerCheckbox: {
    flexDirection: 'row',
    borderRadius: 25,
    padding: 1,
    marginVertical: 1,
    marginTop: 15,
  },
  containerButton: {
    width: "100%",
    padding: 10,
    marginVertical: 1,
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
    borderRadius: 10
},

container_PRIMARY: {
    backgroundColor: "#D35400",
},

container_TERTIARY: {

},

text: {
    fontWeight: 'bold',
    color: '#fff'
},
text_TERTIARY: {
    color: "gray"
},

containerInput: {
  width: "100%",
  padding: 10,
  backgroundColor: "#fff",
  borderColor: "#e8e8e8",
  borderWidth: 1,
  borderRadius: 5,

},
container: {
  alignItems: 'center',
  width: "100%",
  padding: 50
},
title: {
  padding: 35,
  alignSelf: 'center',
  fontSize: 24,
  fontWeight: 'bold',
  color: '#051C60',
  margin: 10
},

souhait:  {
  padding: 1,
  margin: 10
},
subtile: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#000',
  margin: 1
},

});
