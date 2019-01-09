import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native'

import {NavigationActions} from 'react-navigation';

class Drawer extends Component {
    
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render(){
        return (
            <View style={styles.container}>
                <ScrollView style={styles.mainContainer}>
                    <View style={styles.labelWrapper}>
                        <TouchableOpacity
                            onPress={this.navigateToScreen('Incidents')}
                        >
                            <Text style={styles.label}>Incidents</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.labelWrapper}>
                        <TouchableOpacity
                            onPress={this.navigateToScreen('Chat')}
                        >
                            <Text style={styles.label}>Chat</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.labelWrapper}>
                        <TouchableOpacity
                            onPress={this.navigateToScreen('SOS')}
                        >
                            <Text style={styles.label}>SOS</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 40
    },
    container: {
        alignItems: 'flex-start',
        backgroundColor: '#36454f',
        width: '100%',
        height: '100%',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    labelWrapper: {
        paddingTop: 20,
        paddingBottom: 20,
        marginLeft: 20,
        width: 250,
        borderBottomWidth: 1,
        borderBottomColor: '#fff'
    },
    label: {
        color: '#fff',
        fontSize: 18
    }
});

export default Drawer;