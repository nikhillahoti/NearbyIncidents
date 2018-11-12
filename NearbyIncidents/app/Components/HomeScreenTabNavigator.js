import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native'


import { TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SOS from './TabNavigator/SOS';
import Chat from './TabNavigator/Chat';

class AppTabNavigator extends Component {
    
    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: (
                <View style={{padding: 10}}>
                    <Ionicons name="md-menu" 
                        size={24}
                        onPress={() => navigation.navigate('DrawerOpen')}
                    />
                </View>
            )
        }
    }
    
    render(){
        return(
            <HomeScreenTabNavigator screenProps={{ navigation: this.props.navigation }} />
        );
    }
}

// Children of HomeScreenTabNavigator will not have access to the navigation prop. So we access it using ScreenProps

const HomeScreenTabNavigator = new TabNavigator({
    ScreenSOS: {
        screen: SOS,
        navigationOptions: {
            tabBarLabel: 'List View',
            tabBarIcon: () => (
                <Ionicons name="ios-list" size={24} />
            )
        }
    },
    ScreenChat: {
        screen: Chat,
        navigationOptions: {
            tabBarLabel: 'Map View',
            tabBarIcon: () => (
                <Ionicons name="md-map" size={24} />
            )
        }
    }
})

export default AppTabNavigator;
