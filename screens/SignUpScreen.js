import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Pressable, TextInput } from 'react-native';
import { CheckBox, Icon, Switch } from 'react-native-elements';


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
          <CustomButton text="Sign In With Google" onPress={onGoogleSignInPressed}
          bgColor='#FAE9EA'
          fgColor="#DD4D44"
          />
          <CustomButton text="Sign In with FaceBook" onPress={onFacebookSingInPressed}
           bgColor='#E7EAF4'
           fgColor="#4769A9"
          />
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

function SwitchButton (props) {
  const [checked, setChecked] = useState(false);

  const toggleSwitch = () => {
    setChecked(!checked);
  };

  return (
    <View style={styles.view}>
     <Switch
        value={checked}
        onValueChange={(value) => setChecked(value)}
      />
    </View>
  );
}

function CheckoxScreen(props) {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  

  const onCheckedChange = (isChecked) => {
    console.log("yay")
  };

  return (
    <View style={styles.containerCheckbox}>
      <CheckBox
        center
        title="Garder"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={check2}
        onPress={() => setCheck1(!check2)}
      />
       <CheckBox
        center
        title="Faire Garder"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={check2}
        onPress={() => setCheck2(!check2)}
      />
    </View>

  );
};
 

export default function SignUpScreen(props) {

  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegisterPressed = () => {
    console.warn("Sign In")
};
const onForgotPasswordPressed = () => {
    console.warn('Your password')
};

const onSingInPressed = () => {
    console.warn('SingIn')
};

  return (
    <>
    <Text style={styles.title}>Inscription</Text>
    <SocialMediaButtons/>
    <CustomInputs placeholder="Pseudo" value={pseudo} setValue={setPseudo}/>
    <CustomInputs placeholder="Email" value={email} setValue={setEmail}/>
    <CustomInputs placeholder="Password" value={password} setValue={setPassword} secureTextEntry />
    <CustomButton text="Password Forgot" onPress={onForgotPasswordPressed} type="TERTIARY" />
    <CustomButton text="Have an Account? Sign In Here" onPress={onSingInPressed} type="TERTIARY" />
    <View style={styles.souhait}>
    <Text style={styles.subtile}>Je veux:</Text>
    <CheckoxScreen />
    <Text style={styles.subtile}>J'accepte de reçevoir des mails de la part de petFriends</Text>
    <SwitchButton />
    <CustomButton text="SUIVANT" onPress={onRegisterPressed} />
    </View>
</>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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