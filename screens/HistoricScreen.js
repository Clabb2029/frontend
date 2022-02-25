import { StyleSheet, View, Button, ScrollView, Text, TouchableOpacity, DevSettings, Image } from 'react-native';
import { Tabs, Carousel } from '@ant-design/react-native';
import { Badge, ListItem } from 'react-native-elements';
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
            <Text style={styles.h6}>Gardes à venir</Text>
          </View>

          {/* Tab demandes en attente : */}
          <View style={styles.tab}>
    <Text>Demandes en attentes</Text>

          </View>
        </Tabs>
      </View>
  )
}};

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
  h1:{
    color: '#2C3E50',
    fontFamily: 'AlegreyaSans_500Medium',
    fontSize: 35,
    textAlign:'center',
    margin:25
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
})
