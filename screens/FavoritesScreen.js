import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableWithoutFeedback } from 'react-native';
import { ListItem, Button, Overlay } from 'react-native-elements';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import ipAdress from '../ip.js'


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

export default function FavoritesScreen(props) {
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
  const dispatch = useDispatch()
  const isFocused = useIsFocused();
  const token = useSelector(state => state.token)
  const favoritesList = useSelector(state => state.favoritesList)
  const currentUserID = useSelector(state => state.userID)
  // Récupération des favoris du user :

  useEffect(() => {
    const loadData = async () => {
      const rawData = await fetch(`${ipAdress}/favorites/${token}`);
      const data = await rawData.json();
      dispatch({ type: 'loadList', list: data.favoris })
    }
    loadData();
  }, []);

  // Envois des messages : 
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('')
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  //Affichages des favoris du user :

  var noFavorites = "";
  if (favoritesList.length === 0) {
    noFavorites = "Pas encore d'utilisateurs en favoris!"
  }
  let favorites = favoritesList.map((user, e) => {
    var favoriteID = user._id
    return (
      <View>
        <ListItem key={e} bottomDivider style={{ backgroundColor: '#ECF0F1' }}>
          <ListItem.Swipeable
            leftContent={
              <Button
                title="Message"
                icon={{ name: 'message', color: 'white' }}
                buttonStyle={{ minHeight: '100%' }}
                onPress={toggleOverlay} 
              />
            }
            rightContent={
              <Button
                title="Supprimer"
                icon={{ name: 'delete', color: 'white' }}
                buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                onPress={async () => {
                  const request = await fetch(`${ipAdress}/delete-favorite/${token}/${favoriteID}`,
                    {
                      method: 'DELETE'
                    })
                  const response = await request.json()
                  if (response.result == true) {
                    dispatch({ type: 'deleteFavorite', position: e })
                  }
                }}
              />
            }
          >
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '90%'}}>
              <View style={{width: '100%', flexDirection: 'row'}}>
              <Image source={{ uri: user.avatar }} style={styles.avatar}></Image>
              <ListItem.Title style={styles.h6}>
                {user.pseudo}
              </ListItem.Title> 
              </View>
              
            
            <Button title={"Voir"} buttonStyle={{ backgroundColor: "#D35400", borderRadius: 3 }} containerStyle={{ width: 60, alignSelf: 'center'}} titleStyle={{ fontFamily: 'AlegreyaSans_500Medium', fontSize: 20 }}
              onPressIn={() =>  props.navigation.navigate('ProfilScreen', { userID: user.id_user })} /> 
            
            </View>
              
          </ListItem.Swipeable>
        </ListItem>

        {/* <ListItem key={i} bottomDivider style={{ backgroundColor: '#ECF0F1' }}>
        <Image source={{uri : data.avatar}} style={styles.avatarItem}></Image>
        <ListItem.Content style={{ flexDirection: 'row' }}>
          <ListItem.Title style={styles.text}>
            {data.pseudo}
          </ListItem.Title>
        </ListItem.Content>
        <Image source={icon} style={{width:35, height:35, marginRight:75}}></Image>
        <ListItem.Content right><Button title="Voir" buttonStyle={{ backgroundColor: "#D35400", borderRadius: 3 }} containerStyle={{ width: 80, marginRight: 15, marginVertical: 10 }} titleStyle={{ fontFamily: 'AlegreyaSans_500Medium', fontSize: 18 }}
          onPress={() => props.navigation.navigate('ProfilScreen', { userID: data._id })} /></ListItem.Content>
      </ListItem> */}





        <Overlay isVisible={visible} overlayStyle={{ width: 325, height: 450 }}>
          <Text style={styles.textOverlay}>Envoyer un message à {user.pseudo} :</Text>
          <TextInput
            style={{ fontFamily: 'AlegreyaSans_400Regular', color: "#2C3E50" }}
            multiline
            placeholder='Type your message ...'
            onChangeText={(msg) => setMessage(msg)}
            value={message}
          />
          <Button
            title="Send"
            buttonStyle={{
              backgroundColor: '#D35400',
              borderRadius: 3,
            }}
            titleStyle={{ fontFamily: 'AlegreyaSans_500Medium', fontSize: 20 }}
            onPress={async () => {
              const request = await fetch(`${ipAdress}/delete-favorite/${token}`,
                {
                  method: 'DELETE'
                })
                const response = await request.json()
              toggleOverlay()
              var userInfoID = user._id
              console.warn("valeur de ID userInfo : ", userInfoID, "valeur de currentUserID : ", currentUserID)
              await fetch(`${ipAdress}/send-message/`, {
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `participant1=${userInfoID}&participant2=${currentUserID}&message=${message}&createdAt=${Date.now()}`
              })
              setMessage()
            }}
          />
          <Button
            title="Fermer"
            buttonStyle={{
              backgroundColor: "#2C3E50",
              borderRadius: 3,
            }}
            containerStyle={{ marginTop: 10 }}
            titleStyle={{ fontFamily: 'AlegreyaSans_500Medium', fontSize: 20 }}
            onPress={() => {
              toggleOverlay()
            }}
          />
        </Overlay>
      </View>

    )
  })

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Mes favoris</Text>
        <ScrollView>
          <View style={{ flex: 1 }}>
            {favorites}
            <Text style={styles.nofavorites}>{noFavorites}</Text>
          </View>
        </ScrollView>
      </View>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  h1: {
    color: '#2C3E50',
    fontFamily: 'AlegreyaSans_500Medium',
    fontSize: 35,
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20
  },
  h6: {
    color: '#2C3E50',
    fontFamily: 'AlegreyaSans_500Medium',
    fontSize: 25,
    alignSelf: 'center',
    marginLeft: 15
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 50
  },
  nofavorites: {
    color: '#2C3E50',
    fontFamily: 'AlegreyaSans_500Medium',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10
  },
  favoriteContainer:{
    flexDirection: 'row',
    width: '100%'
  }
});
