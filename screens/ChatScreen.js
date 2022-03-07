// // import React, {useState, useCallback, useEffect} from 'react'
// // import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native';
// // import { GiftedChat } from 'react-native-gifted-chat'

// import React, {useState, useEffect} from 'react';
// import {View, ScrollView, KeyboardAvoidingView } from 'react-native'
// import {Button, ListItem, Input} from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';

// import socketIOClient from 'socket.io-client'

// // NE PAS OUBLIER DE CHANGER SON ADRESSE IP ICI 
// var socket = socketIOClient("http://192.168.67.114:3000")

// import chatRoomsData from '../assets/chatrooms'


// export default function ChatScreen(props) {

//   const [currentMessage, setCurrentMessage] = useState('')
//   const [listMessage, setListMessage] = useState([])

//   useEffect(() => {
//     socket.on('sendMessagetoAll', (newMessageData) => {
//       setListMessage([...listMessage, newMessageData])
//     })
//   }, [listMessage])

//   var listMessageItem = listMessage.map((messageData, i) => {
//     return (
//       <ListItem key={i}>
//         <ListItem.Content>
//           <ListItem.Title>{messageData}</ListItem.Title>

//         </ListItem.Content>
//       </ListItem>
//     )
//   })


//   // const [messages, setMessages] = useState([]);
  
//   // useEffect(() => {
//   //   setMessages([
//   //     {
//   //       _id: 1,
//   //       text: "Coucou ! Ca te dirait de garder mon chien ! Il est très gentil ! Je dois partir ce week-end...",
//   //       createdAt: new Date(),
//   //       user: {
//   //         _id: 2,
//   //         name: 'Keo',
//   //         avatar: require('../assets/avatar.png'),
//   //       },
//   //     },
//   //   ])
//   // }, [])
   
//   // const onSend = useCallback((messages = []) => {
//   //   setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
//   //   console.warn(messages)
//   //   socket.emit('sendMessage', {message: currentMessage})
    
//   // }, [])




//   return (

//     <View style={{flex: 1}}>
//       <ScrollView style={{flex: 1, marginTop: 50}}>
//         {listMessageItem}
//       </ScrollView>

//       <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : "height"}>
//         <Input
//           containerStyle={{marginBottom: 5}}
//           placeholder= 'Type your message ...'
//           onChangeText= {(msg)=> setCurrentMessage(msg)}
//           value={currentMessage}
//         />

//         <Button
//           icon={<Icon name= 'send' size={20} color= '#ffffff'/>}
//           title=' Send'
//           buttonStyle={{backgroundColor: '#eb4d4b'}}
//           type='solid'
//           onPress={() => {
//             socket.emit('sendMessage', {message: currentMessage})
//             setCurrentMessage('')
//           }}
//         />
//       </KeyboardAvoidingView>
//     </View>






//   //   <GiftedChat
//   //   messages={messages}
//   //   showAvatarForEveryMessage={true}
//   //   onSend={messages => onSend(messages)}
//   //   user={{
//   //     _id: 1,
//   //   }}
//   // />





//   );
// }

// // const styles = StyleSheet.create({
  
//   // container: {
//   //   marginTop: 50,
//   //   backgroundColor: '#3777f0',
//   //   padding: 10,
//   //   margin: 10,
//   //   borderRadius: 10,
//   //   maxWidth: '75%',
//   // },

//   // text: {
//   //   color: 'white'
//   // },

//   // leftContainer: {
//   //   backgroundColor: blue,
//   //   marginLeft: 10,
//   //   marginRight: 'auto'
//   // },

//   // rightContainer: {
//   //   backgroundColor: grey,
//   //   marginLeft: 'auto',
//   //   marginRight: 10
//   // },

//   // sendArea: {
//   //   padding: 10
//   // },

//   // inputContainer: {
//   //   backgroundColor: "#f2f2f2",
//   //   flex: 1,
//   //   marginRight: 10,
//   //   borderRadius: 25,
//   //   borderWidth: 1,
//   //   borderColor: "#dedede",
//   //   alignItems: "center",
//   //   flexDirection: "row",
//   //   padding: 5,
//   // },

//   // icon: {
//   //   marginHorizontal: 5,
//   // },

//   // buttonContainer: {
//   //   width: 40,
//   //   height: 40,
//   //   backgroundColor: "#3777f0",
//   //   borderRadius: 25,
//   //   justifyContent: "center",
//   //   alignItems: "center",
//   // },
//   // buttonText: {
//   //   color: "white",
//   //   fontSize: 35,
//   // },
  
// // });










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

    var msg = msg.replace(/[a-z]*fuck[a-z]*/gi, '\u2022\u2022\u2022');

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


