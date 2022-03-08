import { StyleSheet, View, ScrollView, Text, TouchableOpacity, DevSettings, Image, TextInput } from 'react-native';
import { Tabs } from '@ant-design/react-native';
import { ListItem, Button, Overlay, Rating, } from 'react-native-elements';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
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

// Mise en forme des dates
let dateFormat = function (date) {
  var dates = new Date(date);
  return dates.toLocaleDateString("fr")
}

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

  // Récupération du token 
  const  token  = useSelector(state => state.token)

  // Entête nav du haut
  const tabs = [
    { title: 'Calendrier', icon: "history" },
    { title: 'Demandes', icon: "hourglass-half" },
  ];

  // Récupération de l'agenda

  const [agendaInfo, setAgendaInfo] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const rawData = await fetch(`http://192.168.1.5:3000/agenda/:${token}`);
      const data = await rawData.json();
      setAgendaInfo(data.agendaInfo.sort())
    }
    loadData();
  }, []);

  // Affichage overlay pour donner son avis
  const [rate, setRate] = useState(0)
  const [visible, setVisible] = useState(false);
  const [avis, setAvis] = useState('')
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const ratingCompleted = (rating) => {
    console.log('Rating is: ' + rating);
    setRate(rating)
  };

  // Affichage des dates 
  // gardes effectuées :
  var agendaList = agendaInfo.map((date, i) => {
    if (date.status == "Validé" && new Date(date.beginning) < new Date()) {
      return (<ListItem key={i} bottomDivider style={{ backgroundColor: '#ECF0F1' }}>
        <Image source={require('../assets/avatar.png')} style={styles.avatarItem}></Image>
        <ListItem.Content>
          <ListItem.Title style={styles.h6}>
            {date.id_sender.pseudo}
          </ListItem.Title>
          <ListItem.Subtitle style={styles.text}>Du {dateFormat(date.beginning)} au {dateFormat(date.ending)}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content right>
          <MaterialCommunityIcons name="comment-edit" size={30} color="#2C3E50" style={{ marginRight: 20 }} onPress={toggleOverlay} />
          <Overlay isVisible={visible} overlayStyle={{ width: 325, height: 450 }}>
            <Text style={styles.textOverlay}>Avis sur votre garde : </Text>
            <Rating
              showRating
              type="custom"
              ratingColor="#D35400"
              startingValue={3}
              imageSize={40}
              defaultRating={3}
              onFinishRating={ratingCompleted}
              style={{ paddingVertical: 10 }}
            /><ScrollView>
              <TextInput
                placeholder='Avis'
                multiline
                style={{fontFamily:'AlegreyaSans_400Regular', color:"#2C3E50"}}
                onChangeText={(value) => setAvis(value)}
                value={avis} />
            </ScrollView>
            <Button
              title="Ajouter un avis"
              buttonStyle={{
                backgroundColor: '#D35400',
                borderRadius: 3,
              }}
              titleStyle={{ fontFamily: 'AlegreyaSans_500Medium', fontSize: 20 }}
              onPress={async () => {
                toggleOverlay()
                await fetch('http://192.168.1.5:3000/add-review/', {
                  method: "POST",
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                  body: `id_sender=${date.id_receiver}&id_receiver=${date.id_sender._id}&message=${avis}&rate=${Number(rate)}`
                })
                setAvis()
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
          <ListItem.Subtitle right style={styles.rate}>Evaluer la garde</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>)
    }
  })
  // gardes à faire :
  var todoList = agendaInfo.map((date, j) => {
    if (date.status == "Validé" && new Date(date.beginning) > new Date()) {
      return (<ListItem key={j} bottomDivider style={{ backgroundColor: '#ECF0F1' }}>
        <Image source={require('../assets/avatar.png')} style={styles.avatarItem}></Image>
        <ListItem.Content>
          <ListItem.Title style={styles.h6}>
            {date.id_sender.pseudo}
          </ListItem.Title>
          <ListItem.Subtitle style={styles.text}>Du {dateFormat(date.beginning)} au {dateFormat(date.ending)}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      )
    }
  })
  // gardes en attente :
   var pendingList = agendaInfo.map((date, k) => {
        let agendaID = date._id;
        if (date.status == "En Attente" || date.status == "En attente") {
          return (
            <ListItem key={k} bottomDivider style={{ backgroundColor: '#ECF0F1' }}>
              <Image source={require('../assets/avatar.png')} style={styles.avatarItem}></Image>
              <ListItem.Content>
                <ListItem.Title style={styles.h6}>
                  {date.id_sender.pseudo}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.text}>Du {dateFormat(date.beginning)} au {dateFormat(date.ending)}</ListItem.Subtitle>
                <View style={{ flexDirection: 'row' }}>
                  <Button title="ACCEPTER"
                    onPress={async () => {
            const request = await fetch('http://192.168.1.5:3000/agenda/', {
                        method: "PUT",
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: `id=${agendaID}&status=Validé`
                      })
                      const data = await request.json()

                      if (data.result == true) {
                        var newAgenda = [...agendaInfo, data.agendaUpdate ]
                        var dateList = newAgenda.filter((date) => date._id != data.agendaUpdate._id  )
                        dateList.push(data.agendaUpdate)
                        setAgendaInfo(dateList)
                      }
                    }}
                    buttonStyle={{ backgroundColor: "#2C3E50", borderRadius: 3 }}
                    containerStyle={{ width: 100, marginRight: 25, marginVertical: 10 }}
                    titleStyle={{ fontFamily: 'AlegreyaSans_500Medium', fontSize: 20 }} />
                  <Button title="REFUSER"
                    onPress={async () => {
                      const request = await fetch('http://192.168.1.5:3000/agenda/', {
                        method: "PUT",
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: `id=${agendaID}&status=Refusé`
                      })
                      const data = await request.json()
    
                      if (data.result == true) {
                        var newAgenda = [...agendaInfo, data.agendaUpdate ]
                        var dateList = newAgenda.filter((date) => date._id != data.agendaUpdate._id  )
                        setAgendaInfo(dateList)
                      }
                    }}
                    buttonStyle={{ backgroundColor: "#2C3E50", borderRadius: 3 }}
                    containerStyle={{ width: 100, marginRight: 15, marginVertical: 10 }}
                    titleStyle={{ fontFamily: 'AlegreyaSans_500Medium', fontSize: 20 }} />
                    
                </View>
              </ListItem.Content>
            </ListItem>
            
          )
        }
      })

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

    return (
      <View style={{ flex: 1, marginTop: 50 }}>
        <Text style={styles.h1}>Agenda des gardes : </Text>
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
                  <FontAwesome name={tab.icon} size={24}
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
          {/* Tab Calendrier :           */}
          <View style={styles.tab}>
            <ScrollView>
              <Text style={styles.h6}>Gardes passées</Text>
              {agendaList}
              <Text style={styles.h6}>Gardes à venir</Text>
              {todoList}
            </ScrollView>
          </View>

          {/* Tab demandes en attente : */}
          <View style={styles.tab}>
            {pendingList}
          </View>
        </Tabs>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  tab: {
    flex: 1,
    height: 150,
    backgroundColor: '#ECF0F1',
  },
  h1: {
    color: '#2C3E50',
    fontFamily: 'AlegreyaSans_500Medium',
    fontSize: 35,
    textAlign: 'center',
    margin: 25
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
  textOverlay: {
    color: '#2C3E50',
    fontFamily: 'AlegreyaSans_500Medium',
    textAlign: 'center',
    fontSize: 20
  },
  text: {
    color: '#2C3E50',
    marginLeft: 10,
    marginRight: 10,
    fontFamily: 'AlegreyaSans_400Regular'
  },
  rate: {
    color: '#2C3E50',
    fontSize: 12,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
    fontFamily: 'AlegreyaSans_400Regular'
  },
  avatarItem: {
    width: 75,
    height: 75
  },
})
