import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet, 
    TouchableOpacity,
    TextInput
} from 'react-native';

import RadioForm, {RadioButton, RadioButtonLabel, RadioButtonInput} from 'react-native-simple-radio-button';

class AddIncident extends Component {
    
    state = {
        radio_props : [
            {label: "I am trapped", value: 1},
            {label: "Medical", value: 2},
            {label: "Fire", value: 3},
            {label: "Police", value: 4},
            {label: "Traffic", value: 5},
            {label: "Utility", value: 6},
            {label: "Others (Please Specify)", value: 7}
        ],
        value: 1
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <Text style={styles.headerTitle}>Add Incident</Text>,
        }
    }
    
    handlePress = () => {
        switch(this.state.value){
            case 1: // Trapped & Medical 
            case 2: // have the same Questionnaire
                this.props.navigation.navigate('MedicalAndTrappedQuestionnaire');
                break;

            case 3: 
                this.props.navigation.navigate('FireQuestionnaire');
                break;

            case 4: 
                this.props.navigation.navigate('PoliceQuestionnaire');
                break;

            case 5: 
                this.props.navigation.navigate('TrafficQuestionnaire');
                break;

            case 6: 
                this.props.navigation.navigate('UtilityQuestionnaire');
                break;

            case 7: 
                this.props.navigation.navigate('OtherQuestionnaire');
                break;
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <RadioForm 
                    style={styles.radio}
                    radio_props={this.state.radio_props}
                    initial={0}
                    borderWidth={1}
                    buttonSize={14}
                    animation={true}
                    onPress={(value) => {this.setState({value: value})}}
                />
                <TextInput 
                    placeholder="Please specify"
                    style={styles.textInput}
                    multiline={true}
                    numberOfLines={4}
                />
                <TouchableOpacity
                    style={styles.btnContainer}      
                    onPress={this.handlePress}    
                >
                    <Text style={styles.btnNext}>{"Next"}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 30
    },
    btnNext: {
        color: '#fff',
        textAlign: 'center'
    },
    radio: {
        marginRight: 30
    },
    btnContainer: {
        backgroundColor: blue,
        width: 100,
        height: 30,
        paddingTop: 5,
        marginTop: 20,
        textAlign: 'center'
    },
    headerTitle: {
        fontSize: 17,
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginRight: 15
    },
    textInput: {
        height: 100,
        width: 200,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: blue,
        marginLeft: 20
    }
});

export default AddIncident;