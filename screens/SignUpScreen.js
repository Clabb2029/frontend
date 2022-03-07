import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Pressable, TextInput } from 'react-native';
import { CheckBox, Icon, Switch, SocialIcon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
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
              title="Sign Up facebook"
              type="facebook"
              onPress={onFacebookSingInPressed}
            />
          </View>
          <View style={{width: '100%', flexDirection: 'column'}}>
            <SocialIcon
              title="Sign Up Google Plus"
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


 

export default function SignUpScreen(props) {

  const dispatch = useDispatch()

  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [optinEmails, setOptinEmails] = useState(false)
  const [errorSignUp, setErrorSignUp] = useState('')
  const [isSignUp, setIsSignUp ] = useState(false)

   // Statut Proprio vs Sitter
    const [owner, setOwner] = useState(true);


const onForgotPasswordPressed = () => {
    console.warn('Your password')
};

const onSingInPressed = () => {
    console.warn('SingIn')
};

// Gestion du signup :
var handleSubmitSignup = async () => {
  const request = await fetch('http://172.16.190.17:3000/users/signup', {
  method: "POST",
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: `pseudo=${pseudo}&email=${email}&password=${password}&status=${owner}&optinEmails=${optinEmails}`
})
 const response = await request.json()

 if (response.result == true){
   setErrorSignUp('')
   setIsSignUp(true)
   dispatch({type: 'addToken', token: response.userSaved.token})
  props.navigation.navigate('MoreInfoScreen', { token: response.userSaved.token })
 } else if (response.error === "email déjà utilisé") {
  setErrorSignUp("Email déjà utilisé")
} else {
  setErrorSignUp("Veuillez remplir tous les champs!")
}
 }

  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Inscription</Text>
    <SocialMediaButtons/>
    <CustomInputs placeholder="Pseudo" value={pseudo} setValue={setPseudo}/>
    <CustomInputs placeholder="Email" value={email} setValue={setEmail}/>
    <CustomInputs placeholder="Password" value={password} setValue={setPassword} secureTextEntry />
    <Text style={styles.error}>{errorSignUp}</Text>
    <CustomButton text="Password Forgot" onPress={onForgotPasswordPressed} type="TERTIARY" />
    <CustomButton text="Have an Account? Sign In Here" onPress={onSingInPressed} type="TERTIARY" />
    <View style={styles.souhait}>
    <Text style={styles.subtile}>Je veux:</Text>
    <View style={styles.containerCheckbox}>
        <CheckBox
          center
          title="Garder"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={owner}
          onPress={() => setOwner(!owner)}
        />
         <CheckBox
          center
          title="Faire Garder"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={!owner}
          onPress={() => setOwner(!owner)}
        />
      </View>
    <View style={styles.souhaitToogle}>
    <Text style={styles.subtile}>J'accepte de reçevoir des mails de la part de petFriends</Text>
    <View style={styles.view}>
       <Switch
          value={optinEmails}
          onValueChange={(value) => setOptinEmails(value)}
        />
      </View>
    </View>
    </View>
    <CustomButton text="S'inscrire" 
        onPress={ () => handleSubmitSignup () }
      />
</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerCheckbox: {
    flexDirection: 'row',
    borderRadius: 25,
    padding: 1,
    marginVertical: 1,
    marginTop: 15,
  },
  error :{
    color: "red"
  },
  souhaitToogle: {
    flexDirection: "row"
  },
  containerButton: {
    width: "100%",
    padding: 10,
    marginVertical: 1,
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
  backgroundColor: "#fff",
  width: "100%",
  padding: 10,
  borderColor: "#e8e8e8",
  borderWidth: 1,
  borderRadius: 5,
  paddingHorizontal: 10,
  marginVertical: 5
},
container: {
  alignItems: 'center',
  padding: 10
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