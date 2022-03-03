import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import { useState } from 'react';
import { Input, CheckBox } from 'react-native-elements';
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

export default function SettingsScreen(props) {
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

  // Elements checkbox : 
  const [chien, setChien] = useState(false);
  const [chat, setChat] = useState(false);
  const [cheval, setCheval] = useState(false);
  const [lapin, setLapin] = useState(false);
  const [autres, setAutres] = useState(false);
  const [logement, setLogement] = useState("")
  const [ponctuelle, setPonctuelle] = useState(false);
  const [reguliere, setReguliere] = useState(false);

  const [description, setDescription] = useState("")

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.h1}>Modifier mes informations personnelles</Text>
          <Text style={styles.h6}>Où je vis : </Text>
          <View style={{ flexDirection: "row", marginHorizontal: 30 }}>
            <Input
              placeholder='Code Postal'
              containerStyle={{ width: 150 }}
            />
            <Input
              placeholder='Ville'
              containerStyle={{ width: 150 }}
            />
          </View>
          <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
          <CheckBox
              center
              title="Maison"
              textStyle={styles.textCheckbox}
              checked={logement}
              checkedColor={'#D35400'}
              onPress={() => setLogement("maison")}
            />
            <CheckBox
              center
              title="Appartement"
              textStyle={styles.textCheckbox}
              checked={logement}
              checkedColor={'#D35400'}
              onPress={() => setLogement("appartement")}
            />
          </View>
          
          <Text style={styles.h6}>Espèces que je souhaites garder : </Text>
          <View style={{ flexDirection: "row" }}>
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
          </View>
          <View style={{ flexDirection: "row" }}>
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
          </View>
          <Text style={styles.h6}>Je recherche des gardes : </Text>
          <Text style={styles.h6}>Description : </Text>
          <TextInput
            placeholder='Décrivez-vous et vos attentes'
                multiline
                style={{fontFamily:'AlegreyaSans_400Regular', color:"#2C3E50"}}
                onChangeText={(value) => setDescription(value)}
                value={description} />
          <Text style={styles.h6}>Disponibilités souhaitées : </Text>
          <Input
          containerStyle={{ width: 150}}
          />
          <Text style={styles.h6}>Modifier mon mot de passe : </Text>
          <Input 
          placeholder='Ancien mot de passe'
          containerStyle={{ width: 250 }}
          />
          <Input 
          placeholder='Nouveau mot de passe'
          containerStyle={{ width: 250 }}
          />
          <Text style={styles.h6}>Changer mon avatar : </Text>
          
        </ScrollView>
      </View>
    );
  }
}

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
    marginTop: 35
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
});
