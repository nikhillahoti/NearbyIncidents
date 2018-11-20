import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

import {
    FormLabel,
    FormInput
} from 'react-native-elements';

class AddIncident extends Component {

    state = {
        description: ""
    }

    textChanged = (newDescription) => {
        this.setState({
            description: newDescription
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.descContainer}>
                    <FormLabel labelStyle={styles.descriptionTitle}>Description</FormLabel>
                    <FormInput 
                        onChangeText={() => this.textChanged()} 
                        value={this.state.description}
                        multiline
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    },
    descriptionTitle: {
        fontWeight: 'bold',
        color: 'black'
    },
    descContainer: {
        width: '90%',
        alignSelf: 'center'
    }
});

export default AddIncident;