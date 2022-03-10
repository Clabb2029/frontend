import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, KeyboardAvoidingView } from 'react-native';
import {Button, ListItem, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import {GiftedChat} from 'react-native-gifted-chat'

import ipAdress from '../ip.js'
// import socketIOClient from "socket.io-client";

// Pensez à changer l'adresse ci-dessous avec votre IP locale !
// var socket = socketIOClient("https://petfriendsback.herokuapp.com/");

export default function ChatScreen(props) {
  
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Coucou ! Ca te dirait de garder mon chien ? Il est très gentil ! Mais je dois partir ce week-end aller voir mes parents...',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Fonzy',
          avatar: 'https://imgur.com/gdxyfkF.jpg',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])



  useEffect(() => { 
    socket.on('sendMessageToAll', (newMessageData)=> {
      setListMessage([...listMessage, newMessageData]);
        });
  }, [listMessage]);


  // const [currentMessage, setCurrentMessage] = useState();
  // const [listMessage, setListMessage] = useState([]);

  // useEffect(() => { 
  //   socket.on('sendMessageToAll', (newMessageData)=> {
  //     setListMessage([...listMessage, newMessageData]);
  //   });
  // }, [listMessage]);

  // var listMessageItem = listMessage.map((messageData, i)=>{
    
  //   var msg = messageData.message.replace(/:\)/g, '\u263A');
  //   msg = msg.replace(/:\(/g, '\u2639');
  //   msg = msg.replace(/:p/g, '\uD83D\uDE1B');

  //   return (
  //     <ListItem key={i}>
  //       <ListItem.Content>
  //         <ListItem.Title>{msg}</ListItem.Title>
  //         {/* <ListItem.Subtitle>{messageData.pseudo}</ListItem.Subtitle> */}
  //       </ListItem.Content>
  //     </ListItem>
  //   );
  // });

  return (

    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
       _id: 1,
      }}
    />


    


    // <View style={{flex:1}}>
       
    //     <ScrollView style={{flex:1, marginTop: 50}}>
          
    //       {listMessageItem}

    //     </ScrollView >

    //     <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
    //         <Input
    //             containerStyle = {{marginBottom: 5}}
    //             placeholder='Your message'
    //             onChangeText={(msg)=>setCurrentMessage(msg)}
    //             value={currentMessage}
    //         />
    //         <Button
    //             icon={
    //                 <Icon
    //                 name="send"
    //                 size={20}
    //                 color="#ffffff"
    //                 />
    //             } 
    //             title=" Send"
    //             buttonStyle={{backgroundColor: "#eb4d4b"}}
    //             type="solid"
    //             onPress={()=> {
    //               socket.emit("sendMessage", {message: currentMessage} ); 
    //               setCurrentMessage('');
    //              }
    //             }
    //         />
    //     </KeyboardAvoidingView>
        
    // </View>
  );
}


