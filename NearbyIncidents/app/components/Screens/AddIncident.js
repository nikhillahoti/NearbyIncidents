import React, {Component} from 'react';
import {
    View,
    ScrollView,
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
            case 1: 
                this.props.navigation.navigate('TrappedMedicalIncidentFlowPage', {data: {type: "Trapped"}});
                break;

            case 2: 
                this.props.navigation.navigate('TrappedMedicalIncidentFlowPage', {data: {type: "Medical"}});
                break;

            case 3: 
                this.props.navigation.navigate('FireIncidentFlowPage', {data: {type: "Fire"}});
                break;

            case 4: 
                this.props.navigation.navigate('PoliceFlowPage', {data: {type: "Police"}});
                break;

            case 5: 
                this.props.navigation.navigate('TrafficFlowPage', {data: {type: "Traffic"}});
                break;

            case 6: 
                this.props.navigation.navigate('UtilityQuestionnaire', {data: {type: "Utility"}});
                break;

            case 7: 
                this.props.navigation.navigate('OtherQuestionnaire', {data: {type: "Other"}});
                break;
        }
    }

    render(){
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.header}>{"Select the type of incident you want to report"}</Text>
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
            </ScrollView>
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
    header: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 30,
        marginTop: 30
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
        marginLeft: 20,
        marginTop: 5
    }
});

export default AddIncident;