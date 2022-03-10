import { StyleSheet, View, ScrollView, Text, TouchableOpacity, DevSettings, Image, Dimensions, TextInput} from 'react-native';
import { Tabs } from '@ant-design/react-native';
import { Badge, ListItem, Overlay, Button, Tooltip } from 'react-native-elements';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRef, useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Carousel, { Pagination } from 'react-native-snap-carousel'

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

  useEffect(() => {
    const loadData = async () => {
      const rawData = await fetch(`https://petfriendsback.herokuapp.com/users/${userID}`);
      const data = await rawData.json();
      setUserData(data.reviews)
      setUserInfo(data.userInfo)
      setReviewSender(data.reviewSender)
    }
    loadData();
  }, []);
 
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
   const rawData = await fetch(`https://petfriendsback.herokuapp.com/users/${userID}`);
   const data = await rawData.json();
   setUserData(data.reviews)
   setUserInfo(data.userInfo)
   setReviewSender(data.reviewSender)
 }
 loadData();
}, []);

// Calcul de la moyenne des notes
var totalRate = 0;
var averageRate =[]
for (var j = 0; j< userData.length; j++){
  totalRate += userData[j].rate
  var average = Math.round( totalRate / userData.length);
}
for (var j = 0; j < 5; j++) {
  var color = {};
  if (j < average) {
    color = '#D35400' 
  } else {color = '#2C3E50' }
  averageRate.push(<FontAwesome name="star" size={24} color={color} />)
}

// Eléments à injecter dans l'onglet Avis
var noReviews = "";
if (userData.length === 0){
  noReviews = "Pas encore d'avis !"
 }

  // Eléments à injecter dans l'onglet Avis
  var noReviews = "";
  if (userData.length === 0) {
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
        <Image source={require('../assets/avatar.png')} style={styles.avatarItem}></Image>
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
                const request = await fetch(`https://petfriendsback.herokuapp.com/add-favorite/${token}`, {
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
              <Overlay isVisible={visibleOK} overlayStyle={{ width: 300, height: 150 }}>
              <Text style={styles.h6}>{favorisOK}</Text>
              <Button
                title="OK"
                buttonStyle={{
                  backgroundColor:"#2C3E50",
                  borderRadius: 3,
                }}
                containerStyle={{marginTop:10}}
                titleStyle={{ fontFamily: 'AlegreyaSans_500Medium', fontSize: 20 }}
                onPress={ () => {
                  favoriteOverlay()
                }}
              />
              </Overlay>
            </View>

            <Overlay isVisible={visible} overlayStyle={{ width: 325, height: 450 }}>

              <Text style={styles.textOverlay}>Envoyer un message à {userInfo.pseudo} :</Text>

              <TextInput
                style = {{fontFamily: 'AlegreyaSans_400Regular', color: "#2C3E50"}}
                multiline
                placeholder='Type your message ...'
                onChangeText={(msg)=>setMessage(msg)}
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
                  toggleOverlay()
                  var userInfoID = userInfo._id 
                  console.warn("valeur de ID userInfo : ", userInfoID, "valeur de currentUserID : ", currentUserID)
                  await fetch('https://petfriendsback.herokuapp.com/send-message/', {
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
                }}
                containerStyle={{marginTop:10}}
                titleStyle={{ fontFamily: 'AlegreyaSans_500Medium', fontSize: 20 }}
                onPress={ () => {
                  toggleOverlay()
                }}
              />
            </Overlay>

            <View style={styles.star}>
              {averageRate}
            </View>
            <Text style={styles.h6}>Description :</Text>
            <Text style={styles.text}>{userInfo.description}</Text>
            <Text style={styles.h6}>Type de Garde souhaitée : </Text>
            <View >
              <Badge value={badgeName} badgeStyle={styles.badge}>
              </Badge>
            </View>
            <Text style={styles.h6}>Disponibilité souhaitée :</Text>
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
            {/* <Pagination
              dotsLength={userInfo.photos.length}
              activeDotIndex={index}
              carouselRef={isCarousel}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.92)'
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              tappableDots={true}
            /> */}
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
    width: 100,
    height: 100,
    marginLeft: 135,
    marginBottom: 15,
    borderRadius: 50
  },
  tabs: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  star: {
    flexDirection: 'row',
    marginLeft: 20
  },
  buttonRight: {
    flexDirection: 'row',
    position: 'absolute',
    margin: 10,
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
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10
  },
  text: {
    color: '#2C3E50',
    marginLeft: 20,
    marginRight: 10,
    fontFamily: 'AlegreyaSans_400Regular'
  },
  badge: {
    backgroundColor: "#D35400",
    width: 125,
    height: 25
  },
  avatarItem: {
    width: 75,
    height: 75
  },
  textReview: {
    fontFamily: 'AlegreyaSans_400Regular',
    color: '#2C3E50',
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
    borderRadius: 8,
    width: Dimensions.get('window').width,
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
    width: Math.round(Dimensions.get('window').width * 1),
    height: 400,
  },
  textOverlay: {
    color: '#2C3E50',
    fontFamily: 'AlegreyaSans_500Medium',
    textAlign: 'center',
    fontSize: 20
  },
});
