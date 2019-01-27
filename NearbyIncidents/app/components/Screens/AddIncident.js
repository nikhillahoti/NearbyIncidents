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
import Geolocation from 'react-native-geolocation-service';

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
        value: 1,
        latitude: null,
        longitude: null,
        locationAvailable: false
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <Text style={styles.headerTitle}>Add Incident</Text>,
        }
    }

    componentDidUpdate(){
        if(!this.state.locationAvailable){
            Geolocation.getCurrentPosition((position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,   
                    locationAvailable: true
                })
            }, (error) => {
                this.setState({
                    latitude: null,
                    longitude: null,
                    locationAvailable: false
                })
            }, {enableHighAccuracy: false, timeout: 10000, maximumAge: 360000})
        }
    }
    
    handlePress = () => {
        let data = {};
        data.info = {};
        data.info.location = {};
        data.info.location["latitude"] = this.state.latitude;
        data.info.location["longitude"] = this.state.longitude;
        data.info.location["postalcode"] = "95126";
        data.datetime = (new Date()) + ""
        ;
        switch(this.state.value){
            case 1: 
                data.type = "Trapped";
                this.props.navigation.navigate('TrappedMedicalIncidentFlowPage', {data: data});
                break;

            case 2: 
                data.type = "Medical";
                this.props.navigation.navigate('TrappedMedicalIncidentFlowPage', {data: data});
                break;

            case 3: 
                data.type = "Fire";
                this.props.navigation.navigate('FireIncidentFlowPage', {data: data});
                break;

            case 4: 
                data.type = "Police";
                this.props.navigation.navigate('PoliceFlowPage', {data: data});
                break;

            case 5: 
                data.type = "Traffice";
                this.props.navigation.navigate('TrafficFlowPage', {data: data});
                break;

            case 6: 
                data.type = "Utility";
                this.props.navigation.navigate('UtilitiesFlowPage', {data: data});
                break;

            case 7: 
                data.type = "Other";
                this.props.navigation.navigate('OtherQuestionnaire', {data: data});
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
                        buttonColor={blue}
                        selectedButtonColor={blue}
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