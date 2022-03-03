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

function CheckBoxSquareScreen({title}) {
  const [check1, setCheck1] = useState(false);
  return (
    <CheckBox
    title={title}
    checked={check1}
    onPress={() => setCheck1(!check1)}
  />
  )
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
        title="Appartement"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={check2}
        onPress={() => setCheck1(!check2)}
      />
       <CheckBox
        center
        title="Maison"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={check2}
        onPress={() => setCheck2(!check2)}
      />
    </View>

  );
};
 

export default function SignUpScreen(props) {

  const [codePostal, setCodePostal] = useState('');
  const [ville, setVille] = useState('');

  const onRegisterPressed = () => {
    console.warn("Sign In")
};

const onSingInPressed = () => {
    console.warn('SingIn')
};

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Informations complementaires</Text>
    <View style={styles.addressContainter}>
    <Text style={styles.subtile}>Où je vis:</Text>
    <View style={styles.address}>
    <CustomInputs placeholder="Code Postal" value={codePostal} setValue={setCodePostal}/>
    <CustomInputs placeholder="Ville" value={ville} setValue={setVille}/>
    </View>
    </View>
    <CheckoxScreen />
    <View style={styles.speciesCheckox}>
    <Text style={styles.subtileSouhait}>Espèces que je souhaite garder:</Text>
    <View style={styles.twoColumns}>
    <View style={styles.speciesChoices}>
    <CheckBoxSquareScreen title='Chiens'/>
    <CheckBoxSquareScreen title='Chats'/>
    <CheckBoxSquareScreen title='Lapins'/>
    </View>
    <View style={styles.speciesChoices2}>
    <CheckBoxSquareScreen title='Chevaux'/>
    <CheckBoxSquareScreen title='Autres'/>
    </View>
    </View>
    </View>
    <View style ={styles.gardeType}>
    <Text style={styles.subtile}>Je cherche des gardes:</Text>
    <View style={styles.gardeTypeChoice}>
    <CheckBoxSquareScreen title='Ponctuelles'/>
    <CheckBoxSquareScreen title='Régulières'/>
    </View>
    </View>
    <CustomButton text="S'INSCRIRE" onPress={() => props.navigation.navigate('BottomNavigator')} />
    <View style ={styles.gardeType}>
    <Text style={styles.subtile}>Renseigner ces informations plus tard</Text>
    <View style={styles.gardeTypeChoice}>
    <CheckBoxSquareScreen title='Ponctuelles'/>
    <CheckBoxSquareScreen title='Régulières'/>
    </View>
    </View>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressContainter:  {
    width: "100%",
  },
  address: {
    flexDirection: "row",
    width: "50%",
    borderRadius: 25,
    marginRight: 5,
  },
  gardeType: {
    width: "100%",
    paddingBottom: 15
  },
  gardeTypeChoice: {
    flexDirection: "row",
    width: "50%",
    borderRadius: 25,
    marginRight: 5,
    
  },
  speciesCheckox: {
    width: "100%"
  },

  twoColumns: {
    flexDirection: 'row'
  },
  speciesChoices: {
    flexDirection: "column",
    width: "50%",
    borderRadius: 25,
    marginRight: 5,
  },
  speciesChoices2: {
    flexDirection: "column",
    width: "50%",
    borderRadius: 25,
    marginRight: 5,
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
    padding: 5,
    marginTop: 10,
    marginVertical: 1,
    alignItems: 'center',
    borderRadius: 10,
    
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
  fontSize: 15,
  fontWeight: 'bold',
  color: '#000',
  margin: 1
},

subtileSouhait: {
  fontSize: 15,
  fontWeight: 'bold',
  color: '#000',
}

});