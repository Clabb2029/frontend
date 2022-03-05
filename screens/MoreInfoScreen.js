import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Pressable, TextInput } from 'react-native';
import { CheckBox, Icon, Switch } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import {useSelector} from 'react-redux';


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

function CustomInputs({ value, setValue, placeholder, secureTextEntry }) {
  return (
    <View style={styles.containerInput}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry} />
    </View>
  );
}



export default function SignUpScreen( { route, navigation }) {

  const  token  = useSelector(state => state.token)
  const [codePostal, setCodePostal] = useState('');
  const [ville, setVille] = useState('');


 // Checkbox maison / appartement
  const [maison, setMaison] = useState(false);

  // gardes regulière ou ponctuelle
  const [ponctuelle, setPonctuelle] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informations complementaires</Text>
      <View style={styles.addressContainter}>
        <Text style={styles.subtile}>Où je vis:</Text>
        <View style={styles.address}>
          <CustomInputs placeholder="Code Postal" value={codePostal} setValue={setCodePostal} />
          <CustomInputs placeholder="Ville" value={ville} setValue={setVille} />
        </View>
      </View>
      <View style={styles.containerCheckbox}>
        <CheckBox
          center
          title="Appartement"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={!maison}
          onPress={() => setMaison(!maison)}
        />
        <CheckBox
          center
          title="Maison"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={maison}
          onPress={() => setMaison(!maison)}
        />
      </View>

        <View style={styles.gardeType}>
          <Text style={styles.subtile}>Je cherche des gardes:</Text>
          <View style={styles.gardeTypeChoice}>
            <CheckBox
              center
              title="Ponctuelle"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={ponctuelle}
              onPress={() => setPonctuelle(!ponctuelle)}
            />
            <CheckBox
              center
              title="Régulière"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={!ponctuelle}
              onPress={() => setPonctuelle(!ponctuelle)}
            />
        </View>
        <CustomButton text="Valider"
          onPress={async () => {
            const request = await fetch(`http://192.168.1.5:3000/users/signup-more/${token}`, {
              method: "PUT",
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: `zipcode=${codePostal}&city=${ville}&livingPlace=${maison}&guardType=${ponctuelle}`
            })
            const data = await request.json()
            if (data.result) {
              navigation.navigate('BottomNavigator')
            }
          }} />  
          <View>
          <Text style={styles.subtile}>Renseigner ces informations plus tard ! 
        <MaterialCommunityIcons style={{ marginLeft: 350 }} name="arrow-right-bold-circle-outline" size={24} color="#2C3E50"
        onPress={()=> navigation.navigate('BottomNavigator')} /></Text>
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
  addressContainter: {
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

  souhait: {
    padding: 1,
    margin: 10
  },
  subtile: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 25,
  },

  subtileSouhait: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  }

});