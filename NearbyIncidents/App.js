'use strict';

import React, {Component} from 'react';
import { StackNavigator } from 'react-navigation'
import {ToastAndroid} from 'react-native';

import Routes from './app/routes';

import firebase from './app/helper/FirebaseConnection';

var PushNotification = require('react-native-push-notification');

PushNotification.configure({

  onRegister: function(token){
    const root_ref_db = firebase.database().ref();
    let users = root_ref_db.child('users').child('1');

    users.set({
      deviceId: token,
      name: "Nikhil"
    }).then((data) => {
      console.warn(token);
    }).catch((error) => {
      console.warn(error);
    });
  },

  onNotification: function(notification){
    setTimeout(() => {
        if(!notification['foreground']){
          ToastAndroid.show("You've clicked!", ToastAndroid.SHORT)
        }
    }, 1);
    PushNotification.localNotificationSchedule({
      title: 'Nearby Incidents',
      message: notification['name'],
      date: new Date(Date.now())
    });
    
  },

  senderID: "957321769280"
});

const App = () => {
  return (
    <AppStackNavigator />
  );
}

const AppStackNavigator = StackNavigator({
  Landing: {
    screen: Routes, 
    navigationOptions: {
      header: null
    }
  }
},{
  navigationOptions: {
    gesturesEnabled: false
  }
})

export default App;