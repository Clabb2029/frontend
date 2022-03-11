import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { CheckBox, Button, Input } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import ipAdress from '../ip.js'

import AppLoading from 'expo-app-loading';
import {
  useFonts,
  AlegreyaSans_300Light,
  AlegreyaSans_400Regular,
  AlegreyaSans_500Medium,
  AlegreyaSans_700Bold,
} from '@expo-google-fonts/alegreya-sans';


export default function SignUpScreen({ route, navigation }) {

  let [fontsLoaded] = useFonts({
    AlegreyaSans_300Light,
    AlegreyaSans_400Regular,
    AlegreyaSans_500Medium,
    AlegreyaSans_700Bold,
  });
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

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

    return (
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={{ width: '100%' }}>
            <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
              <Text style={styles.title}>Informations complementaires</Text>
              <View style={styles.addressContainter}>
                <View style={styles.address}>
                  <Input placeholder="Code Postal" leftIcon={{ type: 'font-awesome', name: 'map-pin', marginRight: 5 }} label='Code Postal' style={{ fontFamily: 'AlegreyaSans_400Regular' }} labelStyle={{ color: '#2C3E50' }} value={codePostal} onChangeText={setCodePostal} />
                  <Input placeholder="Ville" leftIcon={{ type: 'font-awesome', name: 'home', marginRight: 5 }} label='Ville' style={{ fontFamily: 'AlegreyaSans_400Regular' }} labelStyle={{ color: '#2C3E50' }} value={ville} onChangeText={setVille} />
                </View>
              </View>
              <Text style={styles.subtile}>Je vis dans :</Text>
              <View style={styles.containerCheckbox}>
                <CheckBox
                  center
                  title="Appartement"
                  checkedColor={'#D35400'}
                  textStyle={styles.textCheckbox}
                  checked={appartement}
                  onPress={() => { setAppartement(true); setMaison(false) }}
                />
                <CheckBox
                  center
                  title="Maison"
                  checkedColor={'#D35400'}
                  textStyle={styles.textCheckbox}
                  checked={maison}
                  onPress={() => { setAppartement(false); setMaison(true) }}
                />
              </View>
                <Text style={styles.subtile}>Je cherche des gardes:</Text>
                <View style={styles.containerCheckbox}>
                  <CheckBox
                    center
                    title="Ponctuelle"
                    checkedColor={'#D35400'}
                    textStyle={styles.textCheckbox}
                    checked={ponctuelle}
                    onPress={() => { setRegular(false); setPonctuelle(true) }}
                  />
                  <CheckBox
                    center
                    title="Régulière"
                    checkedColor={'#D35400'}
                    textStyle={styles.textCheckbox}
                    checked={regular}
                    onPress={() => { setRegular(true); setPonctuelle(false) }}
                  />
                </View>
                <Text style={styles.subtile}>Choisir mon image de profil:</Text>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Button title="Choisir une image"
                    buttonStyle={{ backgroundColor: "#2C3E50", borderRadius: 3 }}
                    containerStyle={{ width: '100%', marginRight: 15}}
                    titleStyle={{ fontFamily: 'AlegreyaSans_500Medium', fontSize: 18 }}
                    onPress={pickImage} />
                  {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                </View>
                <View style={styles.validateContainer} />
                <Button title="Valider mon inscription"
                  buttonStyle={{ backgroundColor: "#D35400", borderRadius: 3 }}
                  icon={{name:'arrow-right', type: 'font-awesome', size: 20, color:'white'}}
                  iconContainerStyle={{ marginRight: 15 }}
                  containerStyle={{width: '70%', marginBottom: 15, marginHorizontal: 5}} 
                  titleStyle={{fontFamily: 'AlegreyaSans_700Bold', fontSize: 20}}
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
                <View style={{flexDirection:'row', justifyContent:'flex-end', width:'95%', marginTop: 20}}>
                  <Text style={{fontFamily:'AlegreyaSans_300Light', fontSize:16, }}>Renseigner ces informations plus tard !</Text>
                  <MaterialCommunityIcons name="arrow-right-bold-circle-outline" size={20} color="#2C3E50"
                      onPress={() => navigation.navigate('BottomNavigator')} />
                </View>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressContainter: {
    width: "80%",
  },
  address: {
    flexDirection: "row",
    width: "50%",
    borderRadius: 25,
    marginRight: 5,
  },
  containerCheckbox: {
    flexDirection: 'row',
    borderRadius: 25,
    padding: 10,
  },
  containerButton: {
    width: "100%",
    padding: 5,
    marginTop: 10,
    marginVertical: 1,
    alignItems: 'center',
    borderRadius: 10,
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
  title: {
    color: '#2C3E50',
    fontFamily: 'AlegreyaSans_500Medium',
    fontSize: 35,
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 45
  },
  subtile: {
    fontSize: 19,
    color: '#2C3E50',
    alignSelf: 'flex-start',
    marginLeft: 45,
    fontFamily: 'AlegreyaSans_700Bold',
    marginVertical: 15
  },
  validateContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 70
  },

});