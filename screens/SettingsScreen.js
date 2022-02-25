import { StyleSheet, Text, View, Button } from 'react-native';

export default function SettingsScreen(props) {
  return (
    <View style={styles.container}>
      <Text>SettingsScreen !</Text>
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
