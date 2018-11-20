import React, {Component} from 'react';

import { 
    DrawerNavigator,
    StackNavigator
} from 'react-navigation';
import LandingHome from './Components/LandingHome';
import Chat from './Components/DrawerComponents/Chat';
import SOS from './Components/DrawerComponents/SOS';

import HomeScreenTabNavigator from './Components/HomeScreenTabNavigator';
import AddIncident from './Components/Screens/AddIncident';


const IncidentsStackNavigator = StackNavigator({
    TabNavigator: {
        screen: HomeScreenTabNavigator
    },
    AddIncidentPage: {
        screen: AddIncident
    }
});

const ChatStackNavigator = StackNavigator({
    ScreenChat: {
        screen: Chat
    }
});

const SOSStackNavigator = StackNavigator({
    ScreenSOS: {
        screen: SOS
    }
})

const AppDrawerNavigator = DrawerNavigator({
        Home: {
            screen: IncidentsStackNavigator
        },
        Chat: {
            screen: ChatStackNavigator
        },
        SOS: {
            screen: SOSStackNavigator
        }
    },
    {
        drawerPosition: 'left'
    }
);

export default AppDrawerNavigator;