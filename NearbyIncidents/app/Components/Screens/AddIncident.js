import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native'


class AddIncident extends Component {
    render(){
        return (
            <View style={styles.container}>
                <Text> This is some really Nice text !!!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    }
});

export default AddIncident;