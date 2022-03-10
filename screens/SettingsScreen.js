import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Input, CheckBox, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import ipAdress from '../ip.js';

import {
  useFonts,
  AlegreyaSans_100Thin,
  AlegreyaSans_100Thin_Italic,
  AlegreyaSans_300Light,
  AlegreyaSans_300Light_Italic,
  AlegreyaSans_400Regular,
  AlegreyaSans_400Regular_Italic,
  AlegreyaSans_500Medium,
  AlegreyaSans_500Medium_Italic,
  AlegreyaSans_700Bold,
  AlegreyaSans_700Bold_Italic,
  AlegreyaSans_800ExtraBold,
  AlegreyaSans_800ExtraBold_Italic,
  AlegreyaSans_900Black,
  AlegreyaSans_900Black_Italic,
} from '@expo-google-fonts/alegreya-sans';

export default function SettingsScreen(props) {
  let [fontsLoaded] = useFonts({
    AlegreyaSans_100Thin,
    AlegreyaSans_100Thin_Italic,
    AlegreyaSans_300Light,
    AlegreyaSans_300Light_Italic,
    AlegreyaSans_400Regular,
    AlegreyaSans_400Regular_Italic,
    AlegreyaSans_500Medium,
    AlegreyaSans_500Medium_Italic,
    AlegreyaSans_700Bold,
    AlegreyaSans_700Bold_Italic,
    AlegreyaSans_800ExtraBold,
    AlegreyaSans_800ExtraBold_Italic,
    AlegreyaSans_900Black,
    AlegreyaSans_900Black_Italic,
  });

  const token = useSelector(state => state.token)
  const [codePostal, setCodePostal] = useState('');
  const [ville, setVille] = useState('');

  // Elements checkbox : 
  const [chien, setChien] = useState(false);
  const [chat, setChat] = useState(false);
  const [cheval, setCheval] = useState(false);
  const [lapin, setLapin] = useState(false);
  const [autres, setAutres] = useState(false);

  // Checkbox maison / appartement
  const [maison, setMaison] = useState(false);
  const [appartement, setAppartement] = useState(false);

  // gardes regulière ou ponctuelle
  const [ponctuelle, setPonctuelle] = useState(false);
  const [regular, setRegular] = useState(false)

  const [description, setDescription] = useState("")

  const [password, setPassword] = useState("")

  //Pour ajouter images via la pellicule
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
      <View style={styles.container}>
        <ScrollView>
        <Button 
          title="Se Déconnecter"
          buttonStyle={{ backgroundColor: "red", borderRadius: 3 }} 
          containerStyle={{ width: 130, marginLeft: 120, marginTop: 45 }} 
          titleStyle={{ fontFamily: 'AlegreyaSans_500Medium', fontSize: 18 }}
          onPress= {async ()=> 
           ( AsyncStorage.clear(),
             props.navigation.navigate('HomeScreen')
          )}/>
          <Text style={styles.h1}>Modifier mon profil : </Text>
          <Text style={styles.h6}>Où je vis : </Text>
          <View style={{ flexDirection: "row", marginHorizontal: 30 }}>
            <Input
              placeholder='Code Postal'
              value={codePostal} setValue={setCodePostal}
              containerStyle={{ width: 150 }}
            />
            <Input
              placeholder='Ville'
              value={ville} setValue={setVille}
              containerStyle={{ width: 150 }}
            />
          </View>
          <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
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
          
          <Text style={styles.h6}>Espèces que je souhaites garder : </Text>
          <View style={{ flexDirection: "row" }}>
            <CheckBox
              center
              title="Chien"
              textStyle={styles.textCheckbox}
              checked={chien}
              checkedColor={'#D35400'}
              onPress={() => setChien(!chien)}
            />
            <CheckBox
              center
              title="Chat"
              textStyle={styles.textCheckbox}
              checked={chat}
              checkedColor={'#D35400'}
              onPress={() => setChat(!chat)}
            />
            <CheckBox
              center
              title="Lapin"
              textStyle={styles.textCheckbox}
              checked={lapin}
              checkedColor={'#D35400'}
              onPress={() => setLapin(!lapin)}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <CheckBox
              center
              title="Cheval"
              textStyle={styles.textCheckbox}
              checked={cheval}
              checkedColor={'#D35400'}
              onPress={() => setCheval(!cheval)}
            />
            <CheckBox
              center
              title="Autres"
              textStyle={styles.textCheckbox}
              checked={autres}
              checkedColor={'#D35400'}
              onPress={() => setAutres(!autres)}
            />
          </View>
          <Text style={styles.h6}>Je recherche des gardes : </Text>
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
          <Text style={styles.h6}>Description : </Text>
          <TextInput
            placeholder='Décrivez-vous et vos attentes'
                multiline
                style={{fontFamily:'AlegreyaSans_400Regular', color:"#2C3E50"}}
                onChangeText={(value) => setDescription(value)}
                value={description} />
          <Text style={styles.h6}>Disponibilités souhaitées : </Text>
          <Input
          containerStyle={{ width: 150}}
          />
          <Text style={styles.h6}>Modifier mon mot de passe : </Text>
          <Input 
          placeholder='Ancien mot de passe'
          containerStyle={{ width: 250 }}
          />
          <Input 
          placeholder='Nouveau mot de passe'
          containerStyle={{ width: 250 }}
          onChangeText={(value) => setPassword(value)}
          value={password}
          />
          <Text style={styles.h6}>Changer mon avatar : </Text>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Choisir une image"
              buttonStyle={{ backgroundColor: "#2C3E50", borderRadius: 3 }}
              containerStyle={{ width: 100, marginRight: 15, marginVertical: 10 }}
              titleStyle={{ fontFamily: 'AlegreyaSans_500Medium', fontSize: 18 }}
              onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          </View>
          <Button 
          title="Valider les modifications !"
          buttonStyle={{ backgroundColor: "#D35400", borderRadius: 3 }} 
          containerStyle={{ width: 130, marginLeft: 120, marginVertical: 10 }} 
          titleStyle={{ fontFamily: 'AlegreyaSans_500Medium', fontSize: 18 }}
          onPress={async () => {
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
                description: description,
                newpassword: password
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
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    color: '#2C3E50',
    fontFamily: 'AlegreyaSans_500Medium',
    fontSize: 35,
    textAlign: 'center',
    marginTop: 25
  },
  h6: {
    color: '#2C3E50',
    fontFamily: 'AlegreyaSans_500Medium',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10
  },
});
