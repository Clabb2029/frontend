import { StyleSheet, Text, Image, View, Button, Pressable } from 'react-native';
import {useFonts, AlegreyaSans_100Thin,  AlegreyaSans_500Medium} from '@expo-google-fonts/alegreya-sans'
import AppLoading from 'expo-app-loading';


function CustomButton({onPress, text, type ="PRIMARY", bgColor, fgColor }) {

  return (
     <Pressable onPress={onPress} 
     style={[styles.containerButton, styles[`container_${type}`],
     bgColor ? {backgroundColor: bgColor} : {}
     ]}>
         <Text 
         style={[styles.text, styles[`text_${type}`],
         fgColor ? {color: fgColor} :{}
         ]}>{text}</Text>
     </Pressable>
  );
}

export default function HomeScreen(props) {

  const onRegisterPressed = () => {
    console.warn("Sign In")
};

  let [fontsLoaded] = useFonts({
    AlegreyaSans_100Thin, AlegreyaSans_500Medium})

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/petfriends-logo.png')} resizeMode={'contain'}/>
      <CustomButton text="SE CONNECTER"  onPress={() => props.navigation.navigate('SignInScreen')} />
      <CustomButton text="S'INSCRIRE" onPress={() => props.navigation.navigate('SignUpScreen')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  containerButton: {
    width: "100%",
    padding: 10,
    marginVertical: 1,
    alignItems: 'center',
    borderRadius: 10,
},

container_PRIMARY: {
    backgroundColor: "#D35400",
},
text: {
  fontWeight: 'bold',
  color: '#fff'
},
container_TERTIARY: {

},
image: {
  borderRadius: 15,
  backgroundColor: "#FFF",
  marginBottom: 50,
  overflow: 'hidden',
  width: "100%",
  height: 400,
},

title: {
  padding: 2,
  alignSelf: 'center',
  fontSize: 24,
  fontWeight: 'bold',
  color: '#051C60',
  margin: 10
},
});
