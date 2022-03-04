import React, {useState, useCallback, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'

import socketIOClient from 'socket.io-client'

var socket = socketIOClient("http://localhost:3000")

export default function ChatScreen(props) {

  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Salut ! Tu voudrais pas promener mon chien par hasard ? Il est très sympa mais je suis occupée cet après-midi :/ ',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])
 
  
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    console.warn(messages)
    
  }, [])

  return (

    <GiftedChat
    messages={messages}
    showAvatarForEveryMessage={true}
    onSend={messages => onSend(messages)}
    user={{
      _id: 1,
    }}
  />

  );
}

const styles = StyleSheet.create({
  
  // container: {
  //   marginTop: 50,
  //   backgroundColor: '#3777f0',
  //   padding: 10,
  //   margin: 10,
  //   borderRadius: 10,
  //   maxWidth: '75%',
  // },

  // text: {
  //   color: 'white'
  // },

  // leftContainer: {
  //   backgroundColor: blue,
  //   marginLeft: 10,
  //   marginRight: 'auto'
  // },

  // rightContainer: {
  //   backgroundColor: grey,
  //   marginLeft: 'auto',
  //   marginRight: 10
  // },

  // sendArea: {
  //   padding: 10
  // },

  // inputContainer: {
  //   backgroundColor: "#f2f2f2",
  //   flex: 1,
  //   marginRight: 10,
  //   borderRadius: 25,
  //   borderWidth: 1,
  //   borderColor: "#dedede",
  //   alignItems: "center",
  //   flexDirection: "row",
  //   padding: 5,
  // },

  // icon: {
  //   marginHorizontal: 5,
  // },

  // buttonContainer: {
  //   width: 40,
  //   height: 40,
  //   backgroundColor: "#3777f0",
  //   borderRadius: 25,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // buttonText: {
  //   color: "white",
  //   fontSize: 35,
  // },
  
});
