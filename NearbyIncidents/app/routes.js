import React, {Component} from 'react';
import { 
    DrawerNavigator,
    StackNavigator
} from 'react-navigation';

import Chat from './components/DrawerComponents/Chat';
import SOS from './components/DrawerComponents/SOS';

import HomeScreenTabNavigator from './components/HomeScreenTabNavigator';
import AddIncident from './components/Screens/AddIncident';
import IncidentDetails from './components/Screens/IncidentDetails';
import WebViewComponent from './components/Screens/WebViewComponent';
import SearchLocation from './components/Screens/SearchLocation';
import SubscribeLocation from './components/Screens/SubscribeLocation';

import MedicalAndTrappedQuestionnaire from './components/Screens/PatientCountQuestionnaire';
import InjuryQuestionnaire from './components/Screens/InjuryQuestionnaire';

import Drawer from './components/Drawer';

const TrappedMedicalFlow = StackNavigator({
    MedicalAndTrappedQuestionnaire: {
        screen: MedicalAndTrappedQuestionnaire
    },
    InjuryQuestionnaire: {
        screen: InjuryQuestionnaire
    }   
},{
    headerMode: 'none'
});

const IncidentsStackNavigator = StackNavigator({
    TabNavigatorPage: {
        screen: HomeScreenTabNavigator
    },
    AddIncidentPage: {
        screen: AddIncident
    },
    IncidentDetailPage: {
        screen: IncidentDetails
    },
    SearchLocationPage: {
        screen: SearchLocation
    },
    WebViewPage: {
        screen: WebViewComponent
    },
    SubscribeLocation: {
        screen: SubscribeLocation
    }
},{
    navigationOptions: {
        headerStyle: {
            backgroundColor: blue,
            elevation: 0
        },
        headerTintColor: 'white'
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
    contentComponent: Drawer,
    drawerPosition: 'left'
}
);

export default AppDrawerNavigator;