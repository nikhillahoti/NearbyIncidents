import React, {Component} from 'react';

import { 
    DrawerNavigator,
    StackNavigator
} from 'react-navigation';
import LandingHome from './Components/LandingHome';
import Chat from './Components/TabNavigator/Chat';

import HomeScreenTabNavigator from './Components/HomeScreenTabNavigator';

const InnerStackNavigator = new StackNavigator({
    TabNavigator: {
        screen: HomeScreenTabNavigator
    }
});

const ChatStackNavigator = new StackNavigator({
    Chat: {
        screen: Chat
    }
});

const AppDrawerNavigator = new DrawerNavigator({
    Home: {
        screen: InnerStackNavigator
    },
    Chat: {
        screen: ChatStackNavigator
    }
});

export default AppDrawerNavigator;