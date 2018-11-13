import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal
} from 'react-native'

import { TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import SOS from './TabNavigator/SOS';
import Chat from './TabNavigator/Chat';
import FilterModal from './Filter/FilterModal';

class AppTabNavigator extends Component {
    
    // The data for the events goes here and yet to be added
    // This state is responsible for handling the showing of the modal as the filter button is on this screen
    state = {
        modalVisible: false
    }

    // navigationOptions are responsible for displaying the top right corner filter icon,
    // top left corner icon for drawer and the header text 
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <Text style={styles.headerTitle}>Nearby Incidents</Text>,
            headerLeft: (
                <View style={{padding: 10}}>
                    <Ionicons name="md-menu" 
                        size={24}
                        color='#5c5cd6'
                        onPress={() => navigation.navigate('DrawerOpen')}
                    />
                </View>
            ),
            headerRight: <FontAwesome5 name="filter" 
                            size={18}
                            onPress={() => {navigation.state.params.handleFilter()}}
                            color='#5c5cd6'
                            style={{padding: 10}}
                        />
        }
    }

    ToggleModal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    }

    componentDidMount(){
        this.props.navigation.setParams({handleFilter: this.ToggleModal})
    }
    
    render(){
        return(
            <View style={styles.container}>
                <HomeScreenTabNavigator screenProps={{ navigation: this.props.navigation }} />
                <FilterModal ToggleModal={this.ToggleModal} modalVisible={this.state.modalVisible}/>
            </View>
        );
    }
}
// Children of HomeScreenTabNavigator will not have access to the navigation prop. 
// So we pass a ScreenProps giving the reference to the navigation object 
// and access it using ScreenProps


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

const styles = StyleSheet.create({
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#5c5cd6'
    },
    container: {
        height: '100%',
        width: '100%'
    }
});

export default AppTabNavigator;
