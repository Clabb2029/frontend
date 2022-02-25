import { StyleSheet, Text, View, Button } from 'react-native';

export default function DateScreen(props) {
  return (
    <View style={styles.container}>
      <Text>DateScreen !</Text>
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
