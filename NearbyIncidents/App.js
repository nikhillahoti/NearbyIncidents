'use strict';

import React, {Component} from 'react';
import { StackNavigator } from 'react-navigation'

import Routes from './app/routes';



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