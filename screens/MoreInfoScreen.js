import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image, ScrollView } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import ipAdress from '../ip.js'


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


export default function SignUpScreen({ route, navigation }) {

  const token = useSelector(state => state.token)
  const [codePostal, setCodePostal] = useState('');
  const [ville, setVille] = useState('');
  const [errorSignUp, setErrorSignUp] = useState('')

  // Checkbox maison / appartement
  const [maison, setMaison] = useState(false);
  const [appartement, setAppartement] = useState(false);

  // gardes regulière ou ponctuelle
  const [ponctuelle, setPonctuelle] = useState(false);
  const [regular, setRegular] = useState(false)

  // Sélection avatar via pelicule photo : 
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);

    }
  };


  return (
    <View style={styles.container}>
      <ScrollView>
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
            checked={appartement}
            onPress={() => { setAppartement(true); setMaison(false) }}
          />
          <CheckBox
            center
            title="Maison"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={maison}
            onPress={() => { setAppartement(false); setMaison(true) }}
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
              onPress={() => { setRegular(false); setPonctuelle(true) }}
            />
            <CheckBox
              center
              title="Régulière"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={regular}
              onPress={() => { setRegular(true); setPonctuelle(false) }}
            />
          </View>
          <Text style={styles.subtile}>Choisir mon image de profil:</Text>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Choisir une image"
              buttonStyle={{ backgroundColor: "#2C3E50", borderRadius: 3 }}
              containerStyle={{ width: 100, marginRight: 15, marginVertical: 10 }}
              titleStyle={{ fontFamily: 'AlegreyaSans_500Medium', fontSize: 18 }}
              onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          </View>
          <View style={{ borderBottomColor: '#2C3E50', borderBottomWidth: 1, margin: 20 }} />
          <Button title="Valider mon inscription"
            buttonStyle={{ backgroundColor: "#D35400", borderRadius: 3 }}
            containerStyle={{ width: 315, marginLeft: 20, marginVertical: 10 }}
            titleStyle={{ fontFamily: 'AlegreyaSans_500Medium', fontSize: 18 }}
            onPress={async () => {
              if ((maison != false || appartement != false) && (ponctuelle != false || regular != false)) {
                var data = new FormData();
                data.append('image', {
                  uri: image,
                  type: 'image/jpeg',
                  name: 'image.jpg'
                });
                data.append('userInfo', JSON.stringify({
                  zipcode: codePostal,
                  city: ville,
                  livingPlace: maison,
                  guardType: ponctuelle,
                }))

                const request = await fetch(`${ipAdress}/users/signup-more/${token}`, {
                  method: "POST",
                  body: data
                })
                const reponse = await request.json()
                console.log(reponse)
                if (reponse.result) {
                  navigation.navigate('BottomNavigator')
                } else {
                  setErrorSignUp(reponse.error)
                }
              } else {
                setErrorSignUp("Veuillez selectionner une checkbox")
              }
            }} />
          <View>
            <Text style={styles.subtile}>Renseigner ces informations plus tard !
              <MaterialCommunityIcons style={{ marginLeft: 350 }} name="arrow-right-bold-circle-outline" size={24} color="#2C3E50"
                onPress={() => navigation.navigate('BottomNavigator')} /></Text>
          </View>
        </View>
      </ScrollView>
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