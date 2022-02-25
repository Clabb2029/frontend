import { StyleSheet, Text, View, Button } from 'react-native';

export default function SignInScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Sign In Page !</Text>
      <Button title="Go Map Page !" onPress={() => props.navigation.navigate('BottomNavigator')}/>
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
