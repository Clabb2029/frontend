import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesome5 } from '@expo/vector-icons';
import { SwipeAction } from '@ant-design/react-native'

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

  const token = useSelector(state => state.token)
  const [userFavorites, setUserFavorites] = useState([])
  // Récupération des favoris du user :
  useEffect(() => {
    const loadData = async () => {
      const rawData = await fetch(`http://192.168.1.5:3000/favorites/${token}`);
      const data = await rawData.json();
      setUserFavorites(data.favoris)
    }
    loadData();
  }, []);
  console.log(userFavorites)

  //Affichages des favoris du user :

  var noFavorites = "";
  if (userFavorites.length === 0) {
    noFavorites = "Pas encore d'utilisateurs en favoris!"
  }
  let favorites = userFavorites.map((user, e) => {
   var userID = user._id
    return (
      <ListItem key={e} bottomDivider style={{ backgroundColor: '#ECF0F1' }}>
        <Image source={{ uri: user.avatar }} style={styles.avatar}></Image>
        <ListItem.Content>
          <ListItem.Title style={styles.h6}>
            {user.pseudo}
          </ListItem.Title>
        </ListItem.Content>
        <Button title="Voir" buttonStyle={{ backgroundColor: "#D35400", borderRadius: 3 }} containerStyle={{ width: 80, marginRight: 15, marginVertical: 10 }} titleStyle={{ fontFamily: 'AlegreyaSans_500Medium', fontSize: 18 }}
          onPress={() => props.navigation.navigate('ProfilScreen', { userID: user._id })} />
        <ListItem.Content right>
          <FontAwesome5 name="trash-alt" size={24} color="#2C3E50"
            onPress={async () => {
              const request = await fetch(`http://192.168.1.5:3000/delete-favorite/${token}`,
                {
                  method: 'DELETE'
                })
                const response = await request.json()
                console.log(response)
            }}
          />
        </ListItem.Content>
      </ListItem>)
  })

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Favoris : </Text>
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
    marginTop: 45,
    marginBottom: 15
  },
  h6: {
    color: '#2C3E50',
    fontFamily: 'AlegreyaSans_500Medium',
    fontSize: 20,
    textAlign: 'left',
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 10
  },
  avatar: {
    width: 55,
    height: 55,
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
});
