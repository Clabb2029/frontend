import { StyleSheet, Text, View, Button } from 'react-native';

export default function ChatScreen(props) {
  return (
    <View style={styles.container}>
      <Text>ChatScreen !</Text>
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
