import { StyleSheet, Text, View, Button } from 'react-native';
import { useState } from 'react';
import {TabBar, Tab, ApplicationProvider, Layout} from '@ui-kitten/components'
import { mapping, light as lightTheme } from '@eva-design/eva';

import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { AlegreyaSans_500Medium } from '@expo-google-fonts/alegreya-sans';

import { default as theme } from '../custom-theme.json';



export default function HistoricScreen(props) {

  const [selectedIndex, setSelectedIndex] = useState(0);


  return (
    <View style={styles.container}>

      <ApplicationProvider
          mapping={mapping}
          theme={{ ...theme}}
      >

        <View style={styles.provider}>
          <Text style={styles.title}>Agenda des gardes</Text>


          <TabBar
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}
          style={styles.provider}>

            <Tab 
            title='Calendrier'
            color= 'black'
            icon={<FontAwesome name='history' size={25} color='black' />}
            style= {styles.tab}
            />


            <Tab 
            title='Demandes'
            icon={<FontAwesome name='hourglass-2' size={25} color='black' />}
            style= {styles.tab}
            />

          </TabBar>
        </View>
      </ApplicationProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0F1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  provider: {
    marginTop: 40,
    backgroundColor: '#ECF0F1',

  },

  title: {
    fontSize: 30,
    
  }, 

  tab: {
    flex: 1
  }
});
