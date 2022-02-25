import { StyleSheet, Text, View, Button } from 'react-native';
import {useFonts, AlegreyaSans_100Thin,  AlegreyaSans_500Medium} from '@expo-google-fonts/alegreya-sans'
import AppLoading from 'expo-app-loading';



export default function HomeScreen(props) {

  let [fontsLoaded] = useFonts({
    AlegreyaSans_100Thin, AlegreyaSans_500Medium})

  return (
    <View style={styles.container}>
      <Text>Sign In / Sign Up Page ! (HomeScreen)</Text>
      <Button title="Go Sign In !" onPress={() => props.navigation.navigate('SignInScreen')}/>
      <Button title="Go Sign Up !" onPress={() => props.navigation.navigate('SignUpScreen')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
