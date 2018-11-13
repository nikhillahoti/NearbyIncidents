import React, {Component} from 'react';

import { 
    DrawerNavigator,
    StackNavigator
} from 'react-navigation';
import LandingHome from './Components/LandingHome';
import Chat from './Components/DrawerComponents/Chat';
import SOS from './Components/DrawerComponents/SOS';

import HomeScreenTabNavigator from './Components/HomeScreenTabNavigator';

const InnerStackNavigator = new StackNavigator({
    TabNavigator: {
        screen: HomeScreenTabNavigator
    }
});

const ChatStackNavigator = new StackNavigator({
    ScreenChat: {
        screen: Chat
    }
});

const SOSStackNavigator = new StackNavigator({
    ScreenSOS: {
        screen: SOS
    }
})

const AppDrawerNavigator = new DrawerNavigator({
    Home: {
        screen: InnerStackNavigator
    },
    Chat: {
        screen: ChatStackNavigator
    },
    SOS: {
        screen: SOSStackNavigator
    }
});

export default AppDrawerNavigator;