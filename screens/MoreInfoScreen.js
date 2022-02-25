import { StyleSheet, Text, View, Button } from 'react-native';

export default function MoreInfoScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Sign Up Page (More Details) !</Text>
      <Button title="Go Map Page !" onPress={() => props.navigation.navigate('Map')}/>
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
