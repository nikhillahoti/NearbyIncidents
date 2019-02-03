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

import Subscribe from './components/DrawerComponents/Subscribe';
import SubscribeLocation from './components/DrawerComponents/SubscribeLocation';

import MedicalAndTrappedQuestionnaire from './components/Screens/PatientCountQuestionnaire';

import FireQuestionnaire from './components/Screens/FireQuestionnaire';

import PoliceQuestionnaire from './components/Screens/PoliceQuestionnaire';

import TrafficQuestionnaire from './components/Screens/TrafficQuestionnaire';
import UtilitiesQuestionnaire from './components/Screens/UtilitiesQuestionnaire';

import Drawer from './components/Drawer';
import IncidentReview from './components/Screens/IncidentReview';

const TrappedMedicalIncidentFlow = StackNavigator({
    MedicalAndTrappedQuestionnaire: {
        screen: MedicalAndTrappedQuestionnaire
    }   
},{
    headerMode: 'none'
});

const FireIncidentFlow = StackNavigator({
    FireQuestionnaire: {
        screen: FireQuestionnaire
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

const UtilitiesFlow = StackNavigator({
    UtilitiesQuestionnaire: {
        screen: UtilitiesQuestionnaire
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
    },
    UtilitiesFlowPage: {
        screen: UtilitiesFlow
    },
    SearchLocationPage: {
        screen: SearchLocation
    },
    IncidentReviewPage: {
        screen: IncidentReview
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
    WebViewPage: {
        screen: WebViewComponent
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
},{
    navigationOptions: {
        headerStyle: {
            backgroundColor: blue,
            elevation: 0
        },
        headerTintColor: 'white'
    }
});

// This Stack Navigator contains the flow for the SOS Screen
const SOSStackNavigator = StackNavigator({
    ScreenSOS: {
        screen: SOS
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

const SubscribeNavigator = StackNavigator({
    Subscribe: {
        screen: Subscribe
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

const AppDrawerNavigator = DrawerNavigator({
    Incidents: {
        screen: IncidentsStackNavigator
    },
    Chat: {
        screen: ChatStackNavigator
    },
    SOS: {
        screen: SOSStackNavigator
    },
    Subscribe: {
        screen: SubscribeNavigator
    }
},
{
    contentComponent: Drawer,
    drawerPosition: 'left'
}
);

export default AppDrawerNavigator;