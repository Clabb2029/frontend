import { StyleSheet, Text, View, Button } from 'react-native';

export default function ConversationsScreen(props) {
  return (
    <View style={styles.container}>
      <Text>ConversationsScreen !</Text>
      <Button title="Go To ChatScreen !" onPress={() => props.navigation.navigate('ChatScreen')}/>
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
