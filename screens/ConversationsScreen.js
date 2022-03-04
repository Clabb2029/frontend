import * as React from 'react'
import { StyleSheet, Text, View, Image, FlatList, Button } from 'react-native';
import chatRoomsData from '../assets/chatrooms'


export default function ConversationsScreen(props) { 

  return (
      <View style={styles.container}>

         <View style={styles.titleContainer}>
          <Text style={styles.title}>Conversations</Text>
        </View>

        <FlatList
          style={styles.flatlist}
          data = {chatRoomsData}
          renderItem= {({item}) =>       
          <View style={styles.message} >    
            <Image source={{uri: item.users[1].imageUri}} style={styles.image}/>

            {item.newMessages ? <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{item.newMessages}</Text>
            </View> : null}

            <View style={styles.rightContainer}>

              <View style={styles.row}>
                <Text style={styles.name}>{item.users[1].name}</Text>
                <Text style={styles.text}>{item.lastMessage.createdAt}</Text>
              </View>

              <Text style={styles.text} numberOfLines={2}>{item.lastMessage.content}</Text>

            </View>
            <Button title='go chat' onPress={() => props.navigation.navigate('ChatScreen')}/>
          </View>
        }
        />
      </View>
  );
}


const styles = StyleSheet.create({
  
  container: {
    width: '100%',
    height: '100%',
    marginTop: 50
  },

  titleContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
 
  title: {
    fontSize: 30,
  },

  flatlist: {
    marginBottom: 50
  },

  message: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#ffffff',
    marginTop: 1
  },

  image: {
    height: 50,
    width: 50,
    borderRadius: 30,
    marginRight: 10
  },

  badgeContainer: {
    backgroundColor: '#D35400',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 45,
    top: 10
  },

  badgeText: {
    color: 'white',
    fontSize: 12
  },

  rightContainer: {
    flex: 1,
    justifyContent: 'center'
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',    
  },

  name: {
    fontWeight: 'bold',
    fontSize: 16
  },

  text: {
    color:'grey'
  }

})