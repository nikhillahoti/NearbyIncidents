import React, {Component} from 'react';

import { 
    DrawerNavigator,
    StackNavigator
} from 'react-navigation';
import LandingHome from './Components/LandingHome';

import HomeScreenTabNavigator from './Components/HomeScreenTabNavigator';

const InnerStackNavigator = new StackNavigator({
    TabNavigator: {
        screen: HomeScreenTabNavigator
    }
});

const AppDrawerNavigator = new DrawerNavigator({
    LandingHome: {
        screen: InnerStackNavigator
    }
});

export default AppDrawerNavigator;