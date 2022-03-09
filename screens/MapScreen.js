import { StyleSheet, Text, View, Dimensions, Image, ScrollView } from 'react-native';
import { ListItem, Button, Overlay, CheckBox } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons'; 
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';

import AppLoading from 'expo-app-loading';
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

export default function MapScreen(props) {
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

  // Chargement de la map :
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);
  useEffect(() => {
    async function askPermissions() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 2 }, (location) => {
          setCurrentLatitude(location.coords.latitude);
          setCurrentLongitude(location.coords.longitude)
        })
      }
    }
    askPermissions();
  }, []);

  // Récupération des profils users (owner) : 
  const [userOwnerData, setUserOwnerData] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const rawData = await fetch('http://172.16.190.12:3000/users-position');
      const data = await rawData.json();
      setUserOwnerData(data.usersOwner.sort())
    }
    loadData();
  }, []);


  // Overlay et ses filtres : 
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const [chien, setChien] = useState(false);
  const [chat, setChat] = useState(false);
  const [cheval, setCheval] = useState(false);
  const [lapin, setLapin] = useState(false);
  const [autres, setAutres] = useState(false);

  // Filtres des users :
  dataFiltered = userOwnerData
  if (chien == true) {
    var dataFiltered = userOwnerData.filter(pet => pet.petChoice == "chien")
  }
  if (chat == true) {
    dataFiltered = userOwnerData.filter(pet => pet.petChoice == "chat")
  }
  if (lapin == true) {
    dataFiltered = userOwnerData.filter(pet => pet.petChoice == "lapin")
  }
  if (cheval == true) {
    dataFiltered = userOwnerData.filter(pet => pet.petChoice == "cheval")
  }
  if (autres == true){
    dataFiltered = userOwnerData.filter(pet => pet.petChoice == "autres")
  }

  // Affichage des profils users : 
  const [profilVisible, setProfilVisible] = useState(false)

  var userNear = dataFiltered.map((data, i) => {
    var icon;
    if (data.petChoice == "chien") {
      icon = require('../assets/dog.png')
    }
    if (data.petChoice == "chat") {
      icon = require('../assets/cat.png')
    }
    if (data.petChoice == "cheval") {
      icon = require('../assets/horse.png')
    }
    if (data.petChoice == "lapin") {
      icon = require('../assets/rabbit.png')
    }
    if (data.petChoice == "autres"){
      icon = require('../assets/paw.png')
    }

    return (
      <ListItem key={i} bottomDivider style={{ backgroundColor: '#ECF0F1' }}>
        <Image source={{uri : data.avatar}} style={styles.avatarItem}></Image>
        <ListItem.Content style={{ flexDirection: 'row' }}>
          <ListItem.Title style={styles.text}>
            {data.pseudo}
          </ListItem.Title>
        </ListItem.Content>
        <Image source={icon} style={{width:35, height:35, marginRight:75}}></Image>
        <ListItem.Content right><Button title="Voir" buttonStyle={{ backgroundColor: "#2C3E50", borderRadius: 3 }} containerStyle={{ width: 80, marginRight: 15, marginVertical: 10 }} titleStyle={{ fontFamily: 'AlegreyaSans_500Medium', fontSize: 18 }}
          onPress={() => props.navigation.navigate('ProfilScreen', { userID: data._id })} /></ListItem.Content>
      </ListItem>
    )
  })
  const [userPseudo, setUserPseudo] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [userMarkerId, setUserMarkerId] = useState('')
  // Affichage des markers : 
  var markerUsers = dataFiltered.map((user, j) => {
 
    if (user.address.length > 0) {
      var imageMarker;
      if (user.petChoice == "chien") {
        imageMarker = require('../assets/dog.png')
      }
      if (user.petChoice == "chat") {
        imageMarker = require('../assets/cat.png')
      }
      if (user.petChoice == "cheval") {
        imageMarker = require('../assets/horse.png')
      }
      if (user.petChoice == "lapin") {
        imageMarker = require('../assets/rabbit.png')
      }
      if (user.petChoice == "autres"){
        imageMarker = require('../assets/paw.png')
      }

      const markerOk = (pseudo, id) => {
        setProfilVisible(true);
        setUserPseudo(user.pseudo)
        setUserAvatar(user.avatar)
        setUserMarkerId(user._id)
      };
      const markerClose = () => {
        setProfilVisible(false)
      }
      return (

        <Marker key={j} coordinate={{ latitude: user.address[0].latitude, longitude: user.address[0].longitude }}
          
          onPress = {() => markerOk(user.pseudo, user._id, user.avatar)}>
          <Image
            source={imageMarker}
            style={{ width: 30, height: 32 }}
            resizeMode="contain"
          />
           <Overlay isVisible={profilVisible} overlayStyle={{ width: 135, height: 180 }}>
           <ScrollView>
           <FontAwesome name="close" size={24} color="#2C3E50" style={{marginLeft:80}} onPress={markerClose}/>
            <View style={{marginLeft:20}}>
            <Text style={styles.textOverlay}>{userPseudo}</Text>
              <Image source={{uri : userAvatar}} style={styles.avatarItem}></Image>
              <Button title="Voir" buttonStyle={{ backgroundColor: "#2C3E50", borderRadius: 3 }} containerStyle={{ width: 80, marginRight: 15, marginVertical: 10 }} titleStyle={{ fontFamily: 'AlegreyaSans_500Medium', fontSize: 18 }}
          onPress={() => (props.navigation.navigate('ProfilScreen', { userID: userMarkerId }), markerClose() )} />
            </View>
              </ScrollView>
             </Overlay>
        </Marker>
      )
    }
  })

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Utilisateurs à proximité :</Text>
        {/* Affichage filtres         */}
        <View style={{ flexDirection: 'row' }}>
          <Button title="Ajouter des filtres"
            buttonStyle={{ borderColor: "#2C3E50", backgroundColor: "#ECF0F1", borderRadius: 3 }}
            type="outline"
            containerStyle={{ width: 150, marginVertical: 10, }}
            titleStyle={{ color: "#2C3E50", fontFamily: 'AlegreyaSans_500Medium', fontSize: 18 }}
            onPress={toggleOverlay}
          />
          <Overlay isVisible={visible} overlayStyle={{ width: 325, height: 360 }}>
            <ScrollView>
              <Text style={styles.textOverlay}>Type d'animal à garder : </Text>
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
              <Button
                onPress={toggleOverlay}
                title="Valider filtres"
                buttonStyle={{ backgroundColor: '#D35400', borderRadius: 3, }}
              />
            </ScrollView>
          </Overlay>

        </View>

        {/* Affichage de la map :         */}
        <MapView style={styles.map}
          initialRegion={{
            latitude: 45.764043,  // pour centrer la carte
            longitude: 4.835659,
            latitudeDelta: 0.1122,  // le rayon à afficher à partir du centre
            longitudeDelta: 0.1321,
          }}>
          <Marker coordinate={{ latitude: currentLatitude, longitude: currentLongitude }}
            title="Votre position"
            pinColor='#2C3E50'
            draggable  // Rendre le marqueur drag & dropable
            opacity={0.5}  // Modifier l'opacité
          />
          {markerUsers}
        </MapView>

        {/* Affichage de la liste de users à proximité : */}
        <ScrollView>
          <View style={{
            flex: 1, width: 365,
            backgroundColor: '#ECF0F1',
          }}>
            {userNear}
          </View>
        </ScrollView>
      </View>
    );
  }
};

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
  textOverlay: {
    color: '#2C3E50',
    fontFamily: 'AlegreyaSans_500Medium',
    fontSize: 20
  },
  textCheckbox: {
    color: '#2C3E50',
    fontFamily: 'AlegreyaSans_500Medium',
    fontSize: 18
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.47,
  },
  text: {
    color: '#2C3E50',
    marginVertical: 20,
    marginRight: 15,
    fontFamily: 'AlegreyaSans_500Medium',
    fontSize: 20
  },
  avatarItem: {
    width: 55,
    height: 55,
    borderRadius : 50 
  },
});
