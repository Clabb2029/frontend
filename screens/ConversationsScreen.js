import * as React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native';
import chatRoomsData from '../assets/chatrooms'


let dateFormat = function (date) {
  var dates = new Date(date);
  return dates.toLocaleDateString("fr")
  }

export default function ConversationsScreen(props) { 

  return (
      <View style={styles.container}>

         <View style={styles.titleContainer}>
          <Text style={styles.title}>Conversations</Text>
        </View>

        <FlatList
          data = {chatRoomsData}
          renderItem= {({item}) =>       
          <View style={styles.message}>    
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

  message: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#ffffff',
    marginTop: 1
  },

  image: {
    height: 50,
  },

})