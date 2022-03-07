import React, {useState, useEffect} from 'react';
import {View, ScrollView, KeyboardAvoidingView } from 'react-native';
import {Button, ListItem, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import socketIOClient from "socket.io-client";

// Pensez à changer l'adresse ci-dessous avec votre IP locale !
var socket = socketIOClient("http://192.168.43.122:3000");

export default function ChatScreen(props) {
  
  const [currentMessage, setCurrentMessage] = useState();
  const [listMessage, setListMessage] = useState([]);

  useEffect(() => { 
    socket.on('sendMessageToAll', (newMessageData)=> {
      setListMessage([...listMessage, newMessageData]);
    });
  }, [listMessage]);

  var listMessageItem = listMessage.map((messageData, i)=>{
    
    var msg = messageData.message.replace(/:\)/g, '\u263A');
    msg = msg.replace(/:\(/g, '\u2639');
    msg = msg.replace(/:p/g, '\uD83D\uDE1B');

    return (
      <ListItem key={i}>
        <ListItem.Content>
          <ListItem.Title>{msg}</ListItem.Title>
          {/* <ListItem.Subtitle>{messageData.pseudo}</ListItem.Subtitle> */}
        </ListItem.Content>
      </ListItem>
    );
  });

  return (
    <View style={{flex:1}}>
       
        <ScrollView style={{flex:1, marginTop: 50}}>
          
          {listMessageItem}

        </ScrollView >

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <Input
                containerStyle = {{marginBottom: 5}}
                placeholder='Your message'
                onChangeText={(msg)=>setCurrentMessage(msg)}
                value={currentMessage}
            />
            <Button
                icon={
                    <Icon
                    name="send"
                    size={20}
                    color="#ffffff"
                    />
                } 
                title=" Send"
                buttonStyle={{backgroundColor: "#eb4d4b"}}
                type="solid"
                onPress={()=> {
                  socket.emit("sendMessage", {message: currentMessage} ); 
                  setCurrentMessage('');
                 }
                }
            />
        </KeyboardAvoidingView>
        
    </View>
  );
}


