import { StyleSheet, Text, View, Button } from 'react-native';

export default function SignUpScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Sign Up Page !</Text>
      <Button title="Go Sign Up (More Details) !" onPress={() => props.navigation.navigate('SingUp_More')}/>
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
