import React, {Component} from 'react';
import { 
    DrawerNavigator,
    StackNavigator
} from 'react-navigation';

import Chat from './Components/DrawerComponents/Chat';
import SOS from './Components/DrawerComponents/SOS';

import HomeScreenTabNavigator from './Components/HomeScreenTabNavigator';
import AddIncident from './Components/Screens/AddIncident';

// This Stack Navigator contains the whole flow for following features:
// Displaying the Tab Navigator with the Incident and the Nearby Map View
// Displaying the flow for reporting the incidents
const IncidentsStackNavigator = StackNavigator({
    TabNavigator: {
        screen: HomeScreenTabNavigator
    },
    AddIncidentPage: {
        screen: AddIncident
    }
});

// This Stack Navigator contains the flow for the Chat Screen
const ChatStackNavigator = StackNavigator({
    ScreenChat: {
        screen: Chat
    }
});

// This Stack Navigator contains the flow for the SOS Screen
const SOSStackNavigator = StackNavigator({
    ScreenSOS: {
        screen: SOS
    }
});

const AppDrawerNavigator = DrawerNavigator({
        Incidents: {
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