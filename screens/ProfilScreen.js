import { StyleSheet, View, ScrollView, Text, TouchableOpacity, DevSettings, Image, Dimensions, TextInput} from 'react-native';
import { Tabs } from '@ant-design/react-native';
import { Badge, ListItem, Overlay, Button, Tooltip } from 'react-native-elements';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRef, useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Carousel from 'react-native-snap-carousel'

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


export default function ProfilScreen({ route }) {
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

  // Récupération des données du profil :
  const [reviewSender, setReviewSender] = useState([])
  const [userData, setUserData] = useState([])
  const [userInfo, setUserInfo] = useState([])
  const { userID } = route.params;
  const  token  = useSelector(state => state.token)

  AsyncStorage.setItem("token", token)

  const currentUserID = useSelector(state => state.userID)

 
  // Calcul de la moyenne des notes
  var totalRate = 0;
  var averageRate = []
  for (var j = 0; j < userData.length; j++) {
    totalRate += userData[j].rate
    var average = Math.round(totalRate / userData.length);
  }
  for (var j = 0; j < 5; j++) {
    var color = {};
    if (j < average) {
      color = '#D35400'
    } else { color = '#2C3E50' }
    averageRate.push(<FontAwesome name="star" size={24} color={color} />)
  }

useEffect(() => {
 const loadData = async  () => {
   const rawData = await fetch(`${ipAdress}/users/${userID}`);
   const data = await rawData.json();
   setUserData(data.reviews)
   setUserInfo(data.userInfo)
   setReviewSender(data.reviewSender)
 }
 loadData();
}, []);


// Eléments à injecter dans l'onglet Avis
var noReviews = "";
if (userData.length === 0){
  noReviews = "Pas encore d'avis !"
 }

  
  let userReviews = reviewSender.map((review, e) => {
    // Notes
    var rating = []
    for (var j = 0; j < 5; j++) {
      var color = {};
      if (j < review.rate) {
        color = '#D35400'
      } else { color = '#2C3E50' }
      rating.push(<FontAwesome name="star" size={24} color={color} />)
    }
    return (
      <ListItem key={e} bottomDivider style={{ backgroundColor: '#ECF0F1' }}>
        <Image source={{uri : review.id_sender.avatar}} style={styles.avatarItem}></Image>
        <ListItem.Content>
          <ListItem.Title style={styles.h6}>
            {review.id_sender.pseudo}
          </ListItem.Title>
          <View style={{ flexDirection: 'row' }}>
            {rating}
          </View>
          <ListItem.Subtitle style={styles.textReview}>{review.message}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>)
  })

  // Elements à injecter dans le caroussel d'images
  const [index, setIndex] = useState(0)
  const isCarousel = useRef(null)
  const SLIDER_WIDTH = Dimensions.get('window').width
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1)

  const CarouselCardItem = ({ item, index }) => {
    return (
      <View style={styles.containerCarousel} key={index}>
        <Image
          source={{uri : item}}
          style={styles.image}
        />
      </View>

    )
  }
// Affichage des badges :
let badgeName = ''
if (userInfo.guardType == true){
badgeName = 'Régulière'
} 
if (userInfo.guardType == false) {
  badgeName ='Ponctuelle'}

// Envois des messages : 
const read = false 
const [visible, setVisible] = useState(false);
const [message, setMessage] = useState('')
const toggleOverlay = () => {
  setVisible(!visible);
};


// Ajout en favoris :
const [favorisOK, setFavorisOK] = useState('');
const [visibleOK, setVisibleOK] = useState(false);
const [colorFavorite, setColorFavorite] = useState('#2C3E50')
const favoriteOverlay = () => {
  setVisibleOK(!visibleOK)
}

  // Entête nav du haut
  const tabs = [
    { title: 'Infos', icon: "info-circle" },
    { title: 'Photos', icon: "images" },
    { title: 'Avis', icon: "pencil-alt" },
  ];

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={{ flex: 1, marginTop: 50 }}>
        <Image
          style={styles.avatar}
          source={{ uri: userInfo.avatar }}
        ></Image>
        {/* TabBar :  */}
        <Tabs
          tabs={tabs}
          renderTabBar={tabProps => (
            <View
              style={styles.tabs}
            >
              {tabProps.tabs.map((tab, i) => (
                // change the style to fit your needs
                <TouchableOpacity
                  activeOpacity={0.9}
                  key={tab.key || i}
                  style={{
                    // width: '30%',
                    padding: 6,
                  }}
                  onPress={() => {
                    const { goToTab, onTabClick } = tabProps;
                    // tslint:disable-next-line:no-unused-expression
                    onTabClick && onTabClick(tabs[i], i);
                    // tslint:disable-next-line:no-unused-expression
                    goToTab && goToTab(i);
                  }}
                >
                  <FontAwesome5 name={tab.icon} size={24}
                    style={{
                      color: tabProps.activeTab === i ? '#D35400' : "#2C3E50",
                    }} />
                  <Text
                    style={{
                      color: tabProps.activeTab === i ? '#D35400' : "#2C3E50",
                      fontFamily: 'AlegreyaSans_500Medium',
                    }}
                  >
                    {tab.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        >
          {/* Tab infos :           */}
          <View style={styles.tab}>
            <Text style={styles.h6}>Profil de {userInfo.pseudo}</Text>
            <View style={styles.buttonRight}>
  
              <FontAwesome name="envelope" size={25} color="#2C3E50" style={{ marginRight: 15 }} 
              onPress={toggleOverlay}       
              />

              <MaterialCommunityIcons name="account-star" size={29} color={colorFavorite} style={{ marginRight: 10 }} 
              onPress={ async () => {
                const request = await fetch(`${ipAdress}/add-favorite/${token}`, {
                method: "POST",
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                body: `id_user=${userID}&pseudo=${userInfo.pseudo}&avatar=${userInfo.avatar}`
                })
                const response = await request.json()
                console.log(response)
                if (response.result == true){
                  setFavorisOK(`${userInfo.pseudo} a bien été rajouté à vos favoris !`)
                  favoriteOverlay()
                  setColorFavorite('#D35400')
                  dispatch({type: 'addFavorites', favorites : userInfo})
                } else {
                  setFavorisOK(`${userInfo.pseudo} est déjà dans vos favoris ! `)
                  favoriteOverlay()
                  setColorFavorite('#D35400')
                }
              }}/>
              <Overlay isVisible={visibleOK} overlayStyle={{ width: 250, height: 130 }}>
              <Text style={styles.textFavoriteOverlay}>{favorisOK}</Text>
              <Button
                title="OK"
                buttonStyle={{
                  backgroundColor:"#2C3E50",
                  borderRadius: 3,
                }}
                containerStyle={{marginTop:10, width: '30%', alignSelf: 'center'}}
                titleStyle={{ fontFamily: 'AlegreyaSans_500Medium', fontSize: 20 }}
                onPress={ () => {
                  favoriteOverlay()
                }}
              />
              </Overlay>
            </View>

            <Overlay isVisible={visible} overlayStyle={{ width: 300, height: 300 }}>

              <Text style={styles.textMessageOverlay}>Envoyer un message à {userInfo.pseudo}</Text>

              <TextInput
                style = {{fontFamily: 'AlegreyaSans_400Regular', color: "#2C3E50", marginHorizontal: 20, marginTop: 10}}
                multiline
                placeholder='Tapez votre message ...'
                onChangeText={(msg)=>setMessage(msg)}
                value={message}
              />

              <View style={styles.messageButtonContainer}>
                <Button
                  title="Envoyer"
                  buttonStyle={{
                    backgroundColor: '#D35400',
                    borderRadius: 3,
                    width: '50%',
                    alignSelf: 'center'
                  }}
                  titleStyle={{ fontFamily: 'AlegreyaSans_500Medium', fontSize: 20 }}
                  onPress={async () => {
                    toggleOverlay()
                    var userInfoID = userInfo._id 
                    console.warn("valeur de ID userInfo : ", userInfoID, "valeur de currentUserID : ", currentUserID)
                    await fetch(`${ipAdress}send-message/`, {
                      method: "POST",
                      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                      body: `id_receiver=${userInfoID}&id_sender=${currentUserID}&message=${message}&createdAt=${Date.now()}&read=${read}`
                    })
                    setMessage()
                  }}
                />

                <Button
                  title="Fermer"
                  buttonStyle={{
                    backgroundColor:"#2C3E50",
                    borderRadius: 3,
                    width: '50%', alignSelf: 'center'
                  }}
                  containerStyle={{marginTop:10}}
                  titleStyle={{ fontFamily: 'AlegreyaSans_500Medium', fontSize: 20 }}
                  onPress={ () => {
                    toggleOverlay()
                  }}
                />
              </View>
            </Overlay>

            <View style={styles.star}>
              {averageRate}
            </View>
            <Text style={styles.h6}>Description</Text>
            <Text style={styles.text}>{userInfo.description}</Text>
            <Text style={styles.h6}>Type de Garde souhaitée</Text>
            <View >
              <Badge value={badgeName} badgeStyle={styles.badge}>
              </Badge>
            </View>
          </View>

          {/* Tab Photos :           */}
          <View style={styles.tab}>
            <Carousel
              layout="tinder"
              layoutCardOffset={10}
              ref={isCarousel}
              data={userInfo.photos}
              renderItem={CarouselCardItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              inactiveSlideShift={0}
              onSnapToItem={(index) => setIndex(index)}
              useScrollView={true} />
          </View>

          {/* Tab Avis : */}
          <View style={styles.tab}>
            <ScrollView>
              {userReviews}
              <Text style={styles.noreviews}>{noReviews}</Text>
            </ScrollView>

          </View>
        </Tabs>
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
  avatar: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 100,
    alignSelf: 'center'
  },
  tabs: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  star: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 40
  },
  buttonRight: {
    flexDirection: 'row',
    position: 'absolute',
    top: 30,
    right: 20,
    marginLeft: 280
  },
  tab: {
    flex: 1,
    height: 150,
    backgroundColor: '#ECF0F1',
  },
  h6: {
    color: '#2C3E50',
    fontFamily: 'AlegreyaSans_500Medium',
    fontSize: 20,
    textAlign: 'left',
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20
  },
  text: {
    color: '#2C3E50',
    marginHorizontal: 40,
    marginTop: 10,
    textAlign: 'justify',
    fontFamily: 'AlegreyaSans_400Regular'
  },
  badge: {
    backgroundColor: "#D35400",
    width: 125,
    height: 25,
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 40
  },
  avatarItem: {
    width: 60,
    height: 60,
    borderRadius : 50
  },
  textReview: {
    fontFamily: 'AlegreyaSans_400Regular',
    color: '#2C3E50',
    marginRight: 10,
    textAlign: 'justify'
  },
  noreviews: {
    color: '#2C3E50',
    fontFamily: 'AlegreyaSans_500Medium',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10
  },
  containerCarousel: {
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 8,
    width: '90%',
    paddingBottom: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: '100%',
    height: 400,
  },
  textMessageOverlay: {
    color: '#2C3E50',
    fontFamily: 'AlegreyaSans_500Medium',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 5, 
    marginBottom: 20
  },
  messageButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10
  },
  textFavoriteOverlay: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
    fontFamily: 'AlegreyaSans_500Medium',
    fontSize: 17,
  },
});
