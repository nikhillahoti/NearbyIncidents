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

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

class AddIncident extends Component {

    state = {
        description: "",
        radio_props: [
            {label: 'Crime', value: 0 },
            {label: 'Medical', value: 0 },
            {label: 'Traffic', value: 0 },
            {label: 'Utility', value: 1 }
        ]
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
                <View>
                    <RadioForm
                        radio_props={this.state.radio_props}
                        //initial={0}
                        onPress={(value) => {this.setState({value:value})}}
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