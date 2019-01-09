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
                <ScrollView>
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
    container: {
        alignItems: 'flex-start',
        backgroundColor: '#36454f',
        width: 300,
        height: '100%',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    labelWrapper: {
        marginTop: 40,
        marginLeft: 20,
    },
    label: {
        color: '#fff',
        fontSize: 18
    }
});

export default Drawer;