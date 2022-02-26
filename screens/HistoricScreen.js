import { StyleSheet, View, ScrollView, Text, TouchableOpacity, DevSettings, Image } from 'react-native';
import { Tabs } from '@ant-design/react-native';
import { ListItem, Button } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

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

  // Entête nav du haut
  const tabs = [
    { title: 'Calendrier', icon: "history" },
    { title: 'Demandes', icon: "hourglass-half" },
  ];

  // Listes date
  const reviews = [
    { userName: 'User A', avatar: require('../assets/avatar.png'), date: "Du 11/02/2022 au 15/02/2022" },
    { userName: 'User C', avatar: require('../assets/avatar.png'), date: "Du 11/02/2022 au 15/02/2022" },
    { userName: 'User B', avatar: require('../assets/avatar.png'), date: "Du 11/02/2022 au 15/02/2022" }
  ]
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
          {/* Tab infos :           */}
          <View style={styles.tab}>
            <Text style={styles.h6}>Gardes passées</Text>
            <ScrollView>
              {reviews.map((l, i) => (
                <ListItem key={i} bottomDivider style={{ backgroundColor: '#ECF0F1' }}>
                  <Image source={l.avatar} style={styles.avatarItem}></Image>
                  <ListItem.Content>
                    <ListItem.Title style={styles.h6}>
                      {l.userName}
                    </ListItem.Title>
                    <ListItem.Subtitle style={styles.text}>{l.date}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>))}        
            <Text style={styles.h6}>Gardes à venir</Text>
            </ScrollView>
          </View>

          {/* Tab demandes en attente : */}
          <View style={styles.tab}>
            <ListItem bottomDivider style={{ backgroundColor: '#ECF0F1' }}>
              <Image source={require('../assets/avatar.png')} style={styles.avatarItem}></Image>
              <ListItem.Content>
                <ListItem.Title style={styles.h6}>
                  User D
                </ListItem.Title>
                <ListItem.Subtitle style={styles.text}>Du 07/04/22 au 15/04/22</ListItem.Subtitle>
                <View style={{flexDirection:'row'}}>
                <Button title="Accepter" buttonStyle={{backgroundColor:"#2C3E50", borderRadius:3}} containerStyle={{width: 100, marginRight: 25, marginVertical:10}} titleStyle={{fontFamily:'AlegreyaSans_500Medium', fontSize:20}}/>
                <Button title="Refuser" buttonStyle={{backgroundColor:"#2C3E50", borderRadius:3}} containerStyle={{width: 100, marginRight: 15, marginVertical:10}} titleStyle={{fontFamily:'AlegreyaSans_500Medium', fontSize:20}}/>
                </View>
              </ListItem.Content>
            </ListItem>

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
  text: {
    color: '#2C3E50',
    marginLeft: 20,
    marginRight: 10,
    fontFamily: 'AlegreyaSans_400Regular'
  },
  avatarItem: {
    width: 75,
    height: 75
  },
})
