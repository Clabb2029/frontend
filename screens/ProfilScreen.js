import { StyleSheet, View, Button, ScrollView, Text, TouchableOpacity, DevSettings, Image, Dimensions } from 'react-native';
import { Tabs } from '@ant-design/react-native';
import { Badge, ListItem } from 'react-native-elements';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRef, useState } from 'react';

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


export default function ProfilScreen(props) {
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

  // Elements à injecter dans le caroussel d'images
  const isCarousel = useRef(null)
  const SLIDER_WIDTH = Dimensions.get('window').width
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1)
  const data = [
    {
      imgUrl: require('../assets/chien1.jpeg')
    },
    {
      imgUrl: require('../assets/chien2.jpeg')
    },
    {
      imgUrl: require('../assets/chien3.jpeg')
    }
  ]
  const CarouselCardItem = ({ item, index }) => {
    return (
      <View style={styles.containerCarousel}>
        <Image
          source={item.imgUrl}
          style={styles.image}
        />
      </View>

    )
  }
  const [index, setIndex] = useState(0)

  // Entête nav du haut
  const tabs = [
    { title: 'Infos', icon: "info-circle" },
    { title: 'Photos', icon: "images" },
    { title: 'Avis', icon: "pencil-alt" },
  ];

  // Listes d'avis
  const reviews = [
    { userName: 'User A', avatar: require('../assets/avatar.png'), text: "lorem ipsum, bla bla bla kikou c'est moi et j'aime la vie quand il y a du soleil" },
    { userName: 'User C', avatar: require('../assets/avatar.png'), text: "lorem ipsum, bla bla bla kikou c'est moi et j'aime la vie quand il y a du soleil" },
    { userName: 'User B', avatar: require('../assets/avatar.png'), text: "lorem ipsum, bla bla bla kikou c'est moi et j'aime la vie quand il y a du soleil" }
  ]
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={{ flex: 1, marginTop: 50 }}>
        <Image
          style={styles.avatar}
          source={require('../assets/avatar.png')}
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
            <Text style={styles.h6}>Profil de Clabb</Text>
            <View style={styles.buttonRight}>
              <FontAwesome name="envelope" size={25} color="#2C3E50" style={{ marginRight: 15 }} />
              <MaterialCommunityIcons name="account-star" size={29} color="#2C3E50" style={{ marginRight: 10 }} />
            </View>
            <View style={styles.star}>
              <FontAwesome name="star" size={24} color="#D35400" />
              <FontAwesome name="star" size={24} color="#D35400" />
              <FontAwesome name="star" size={24} color="#D35400" />
              <FontAwesome name="star" size={24} color="#D35400" />
              <FontAwesome name="star" size={24} color="#2C3E50" />
            </View>
            <Text style={styles.h6}>Description :</Text>
            <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
            <Text style={styles.h6}>Type de Garde souhaitée : </Text>
            <View >
              <Badge value="Régulière" badgeStyle={styles.badge}>
              </Badge>
              <Badge value="Ponctuelle" badgeStyle={styles.badge}>
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
              data={data}
              renderItem={CarouselCardItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              inactiveSlideShift={0}
              onSnapToItem={(index) => setIndex(index)}
              useScrollView={true} />
            <Pagination
              dotsLength={data.length}
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
            />
          </View>

          {/* Tab Avis : */}
          <View style={styles.tab}>
            <ScrollView>
              {reviews.map((l, i) => (
                <ListItem key={i} bottomDivider style={{ backgroundColor: '#ECF0F1' }}>
                  <Image source={l.avatar} style={styles.avatarItem}></Image>
                  <ListItem.Content>
                    <ListItem.Title style={styles.h6}>
                      {l.userName}
                    </ListItem.Title>
                    <View style={{ flexDirection: 'row' }}>
                      <FontAwesome name="star" size={24} color="#D35400" />
                      <FontAwesome name="star" size={24} color="#D35400" />
                      <FontAwesome name="star" size={24} color="#D35400" />
                      <FontAwesome name="star" size={24} color="#D35400" />
                      <FontAwesome name="star" size={24} color="#2C3E50" />
                    </View>
                    <ListItem.Subtitle style={styles.textReview}>{l.text}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>))}
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
    marginBottom: 15
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
});
