import { StyleSheet, Text, View, Button } from 'react-native';

export default function MapScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Map Page !</Text>
      <Button title="Go Sign In" onPress={() => props.navigation.navigate('ProfilScreen')}/>
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
