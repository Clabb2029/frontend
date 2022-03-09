import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

//redux et reducer 
import token from './reducers/token'
import userID from './reducers/userID'
import favoritesList from './reducers/favorites';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';


// Import des composants 
import ChatScreen from './screens/ChatScreen'
import ConversationsScreen from './screens/ConversationsScreen'
import DateScreen from './screens/DateScreen'
import FavoritesScreen from './screens/FavoritesScreen'
import HistoricScreen from './screens/HistoricScreen'
import HomeScreen from './screens/HomeScreen'
import MapScreen from './screens/MapScreen'
import MoreInfoScreen from './screens/MoreInfoScreen'
import ProfilAvisScreen from './screens/ProfilAvisScreen'
import ProfilPhotoScreen from './screens/ProfilPhotoScreen'
import ProfilScreen from './screens/ProfilScreen'
import SettingsScreen from './screens/SettingsScreen'
import SignInScreen from './screens/SignInScreen'
import SignUpScreen from './screens/SignUpScreen'


const store = createStore(combineReducers({ token, userID , favoritesList}))

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navigation Stack à partir du composant MapScreen
const MapBottom = () => {
  return (
<Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="ProfilScreen" component={ProfilScreen} />
          <Stack.Screen name="ProfilPhotoScreen" component={ProfilPhotoScreen} />
          <Stack.Screen name="ProfilAvisScreen" component={ProfilAvisScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Navigator>   
  )
}

// Navigation Stack à partir du composant ConversationsScreen
const MessageBottom = () => {
  return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="ConversationsScreen" component={ConversationsScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Navigator>
  )
}

// Navigation Stack à partir du composant HistoricScreen
const AgendaBottom = () => {
  return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="HistoricScreen" component={HistoricScreen} />
          <Stack.Screen name="DateScreen" component={DateScreen} />
        </Stack.Navigator>
  )
}


// Barre de Navigation
const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name == 'Map') {
            iconName = 'search';
          } else if (route.name == 'Messages') {
            iconName = 'chatbubbles';
          } else if (route.name == 'Favoris') {
            iconName = 'md-star';
          } else if (route.name == 'Agenda') {
            iconName = 'calendar';
          } else if (route.name == 'Profil') {
            iconName = 'person';
          }
  
          return <Ionicons name={iconName} size={25} color={color} />;
        },
        })}
      tabBarOptions={{
        activeTintColor: '#D35400',
        inactiveTintColor: '#ECF0F1',
        style: {
          backgroundColor: '#34495E',
        }
      }}
    >
      <Tab.Screen name="Map" component={MapBottom} />
      <Tab.Screen name="Messages" component={MessageBottom} />
      <Tab.Screen name="Favoris" component={FavoritesScreen} />
      <Tab.Screen name="Agenda" component={AgendaBottom} />
      <Tab.Screen name="Profil" component={SettingsScreen} />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="MoreInfoScreen" component={MoreInfoScreen} />
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
        </Stack.Navigator>
    </NavigationContainer>
</Provider>
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


