import React, {Component} from 'react';
import {
    View, 
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    ScrollView
} from 'react-native';

import {CheckBox} from 'react-native-elements';

import blue from './../../styles/colors';

import RadioForm, {RadioButton, RadioButtonLabel, RadioButtonInput} from 'react-native-simple-radio-button';

class UtilitiesQuestionnaire extends Component {

    render(){
        return (
            <View>
                <TouchableOpacity
                    style={styles.btnContainer}      
                    onPress={this.handlePress}    
                >
                    <Text style={styles.btnNext}>{"Next"}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});

export default UtilitiesQuestionnaire;