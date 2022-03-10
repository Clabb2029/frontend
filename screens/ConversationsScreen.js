import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, FlatList, Button, TouchableWithoutFeedback } from 'react-native';
import {useSelector} from 'react-redux';

import chatRoomsData from '../assets/chatrooms'


export default function ConversationsScreen(props) { 

  const currentUserID = useSelector(state => state.userID)

  // const [listConversations, setListConversations] = useState([])

  // useEffect(() => {
  //   const loadConversations = async () => {
  //     const rawData = await fetch(`https://petfriendsback.herokuapp.com/conversations/${currentUserID}`);
  //     const data = await rawData.json();
  //     setListConversations(data)
  //   }
  //   loadConversations();
  // }, []);

  // console.log("la liste des ID des users : ", listConversations)

  // var conversationList = listConversations.map((user, i) => {
  //   return (
  //     <ListItem key={i} bottomDivider style={{ backgroundColor: '#ECF0F1' }}>
  //        <Image source={user.avatar} style={styles.avatarItem}></Image>
  //         <ListItem.Content>
            
  //           <ListItem.Title style={styles.h6}>
  //             {user}
  //           </ListItem.Title>

  //           <ListItem.Subtitle style={styles.text}>Du {dateFormat(date.beginning)} au {dateFormat(date.ending)}</ListItem.Subtitle>
  //         </ListItem.Content>

  //         <ListItem.Content right>
  //           <MaterialCommunityIcons name="comment-edit" size={30} color="#2C3E50" style={{ marginRight: 20 }} onPress={toggleOverlay} />
  //           <ListItem.Subtitle right style={styles.rate}>Evaluer la garde</ListItem.Subtitle>
  //         </ListItem.Content>
        
  //     </ListItem>
  //   )
  // })



  return (
      <View style={styles.container}>

         <View style={styles.titleContainer}>
          <Text style={styles.title}>Conversations</Text>
        </View>

        <FlatList
          data = {chatRoomsData}
          renderItem= {({item}) =>
          <TouchableWithoutFeedback onPress={ () => props.navigation.navigate('ChatScreen')}>
       
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
          </TouchableWithoutFeedback>
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