import { StyleSheet, Text, View, Button } from 'react-native';

export default function ProfilScreen(props) {
  return (
    <View style={styles.container}>
      <Text>ProfilScreen !</Text>
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
