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

import FireQuestionnaire from './components/Screens/FireQuestionnaire';
import FireQuestionnaire_Step2 from './components/Screens/FireQuestionnaire_Step2';

import PoliceQuestionnaire from './components/Screens/PoliceQuestionnaire';

import TrafficQuestionnaire from './components/Screens/TrafficQuestionnaire';

import Drawer from './components/Drawer';

const TrappedMedicalIncidentFlow = StackNavigator({
    MedicalAndTrappedQuestionnaire: {
        screen: MedicalAndTrappedQuestionnaire
    },
    InjuryQuestionnaire: {
        screen: InjuryQuestionnaire
    }   
},{
    headerMode: 'none'
});

const FireIncidentFlow = StackNavigator({
    FireQuestionnaire: {
        screen: FireQuestionnaire
    },
    FireQuestionnaire_Step2: {
        screen: FireQuestionnaire_Step2
    }   
},{
    headerMode: 'none'
});

const PoliceFlow = StackNavigator({
    PoliceQuestionnaire: {
        screen: PoliceQuestionnaire
    }
},{
    headerMode: 'none'
});

const TrafficFlow = StackNavigator({
    TrafficQuestionnaire: {
        screen: TrafficQuestionnaire
    }
},{
    headerMode: 'none'
});

const AddIncidentNavigator = StackNavigator({
    AddIncident: {
        screen: AddIncident
    },
    TrappedMedicalIncidentFlowPage: {
        screen: TrappedMedicalIncidentFlow
    },
    FireIncidentFlowPage: {
        screen: FireIncidentFlow
    },
    PoliceFlowPage: {
        screen: PoliceFlow
    },
    TrafficFlowPage: {
        screen: TrafficFlow
    }
},{
    headerMode: 'none'
});

const IncidentsStackNavigator = StackNavigator({
    TabNavigatorPage: {
        screen: HomeScreenTabNavigator
    },
    AddIncidentPage: {
        screen: AddIncidentNavigator
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