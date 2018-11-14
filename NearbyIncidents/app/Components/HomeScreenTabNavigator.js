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

import ListView from './TabNavigator/ListView';
import MapView from './TabNavigator/MapView';
import FilterModal from './Filter/FilterModal';

import firebase from './../helper/FirebaseConnection';
import _ from 'lodash';

class AppTabNavigator extends Component {
    
    constructor(props){
        super(props);
        // Fetch the data from Google Firebase before loading the Component
        this.getEventsFromFirebase();
    }

    // The data for the events goes here and yet to be added
    // This state is responsible for handling the showing of the modal as the filter button is on this screen
    state = {
        modalVisible: false,
        incidentItems: [],
        Category: []
    }

    // navigationOptions are responsible for displaying the top right corner filter icon,
    // top left corner icon for drawer and the header text 
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <Text style={styles.headerTitle}>NEARBY INCIDENTS</Text>,
            headerLeft: (
                <View style={{padding: 10}}>
                    <Ionicons name="md-menu" 
                        size={24}
                        color='black'
                        onPress={() => navigation.navigate('DrawerOpen')}
                    />
                </View>
            ),
            headerRight: <FontAwesome5 name="filter" 
                            size={18}
                            onPress={() => {navigation.state.params.handleFilter()}}
                            color='black'
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

    applyFilter = (newCategory) => {
        let Category = this.state.Category;
        newCategory.map((category) => {
            Category.push(category);
        });
        this.setState({Category: newCategory, modalVisible: !this.state.modalVisible});
        this.getEventsFromFirebase();
    }

    getEventsFromFirebase = () => {
        const root_ref_db = firebase.database().ref();
        let events = root_ref_db.child('events');

        this.state.Category.map((type) => {
            events = events.orderByChild('type').equalTo(type + '');
        });

        events.on('value', (snap) =>  {
            let arrIncidents = [];
            snap.forEach((child) => {
                arrIncidents.push(child.val());
            });

            this.setState({ incidentItems: arrIncidents});
        });
    }
    
    render(){
        
        return(
            <View style={styles.container}>
                <HomeScreenTabNavigator screenProps={{ navigation: this.props.navigation, events: this.state.incidentItems }} />
                <FilterModal ToggleModal={this.ToggleModal} modalVisible={this.state.modalVisible} applyFilter={this.applyFilter}/>
            </View>
        );
    }
}
// Children of HomeScreenTabNavigator will not have access to the navigation prop. 
// So we pass a ScreenProps giving the reference to the navigation object 
// and access it using ScreenProps



// This Screen is the entry point for the List View and the Map View Tabs.
// This will store the list of incidents and those will be fetched from Firebase from here
const HomeScreenTabNavigator = new TabNavigator({
    ScreenListView: {
        screen: ListView,
        navigationOptions: {
            tabBarLabel: 'Incidents',
            tabBarIcon: () => (
                <Ionicons name="ios-list" size={24} />
            )
        }
    },
    ScreenMapView: {
        screen: MapView,
        navigationOptions: {
            tabBarLabel: 'Nearby',
            tabBarIcon: () => (
                <Ionicons name="md-map" size={24} />
            )
        }
    }
})

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 14,
        color: 'black'
    },
    container: {
        height: '100%',
        width: '100%'
    }
});

export default AppTabNavigator;
