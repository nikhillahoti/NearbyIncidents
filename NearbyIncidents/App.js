'use strict';

import React, {Component} from 'react';
import { StackNavigator } from 'react-navigation'

import Landing from './app/Landing';

import * as firebase from 'firebase';

export default class App extends Component {
  render() {
    return (
      <AppStackNavigator />
    );
  }
}

const AppStackNavigator = new StackNavigator({
  Landing: {
    screen: Landing, 
    navigationOptions: {
      header: null
    }
  }
},{
  navigationOptions: {
    gesturesEnabled: false
  }
})