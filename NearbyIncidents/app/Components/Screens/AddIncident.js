import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

import {
    FormLabel,
    FormInput
} from 'react-native-elements';

import RadioButton from 'react-native-radio-button'

import firebase from './../../helper/FirebaseConnection';

class AddIncident extends Component {

    state = {
        description: "",
        radio_props: [
            'Crime',
            'Medical',
            'Traffic',
            'Utility'
        ],
        index : 0
    }

    static navigationOptions  = ({navigation}) => {
        return {
            headerTitle: <Text style={styles.headerTitle}>NEARBY INCIDENTS</Text>,
            headerStyle: styles.headerStyle
        }
    }

    textChanged = (newDescription) => {
        this.setState({
            description: newDescription
        })
    }

    handleSubmit = () => {
        const root_ref_db = firebase.database().ref();
        let events = root_ref_db.child('events');
        

        let incident = {
            "type": this.state.radio_props[this.state.index],
            "description": this.state.description,
            "datetime": Date.now(),
            "distance": "1 mile"
        }
        
        events.push(incident)
        .then(() => {
            this.props.navigation.state.params.screenProps.navigation.navigate("TabNavigatorPage");
        })
        .catch((err) => {
            console.log(err);
            this.props.navigation.state.params.screenProps.navigation.navigate("TabNavigatorPage");
        });
    }

    handleRadioClick = (index) => {
        this.setState({index: index});
    }

    render(){
        let radioList = this.state.radio_props.map((label, indd) => {
            let selected = this.state.index === indd ? true : false;
            return (
                <View
                    key={indd}
                    style={styles.vwRadio}
                >
                    <RadioButton
                        animation={'bounceIn'}
                        isSelected={selected}
                        onPress={() => this.handleRadioClick(indd)}
                    />
                    <Text style={styles.radioTxt}>{label}</Text>
                </View>
            );
        })

        return (
            <View style={styles.container}>
                <View style={styles.radioContainer}>
                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>Type</Text>
                    {radioList}
                </View>
                <View style={styles.viewSeparator} />
                <View style={styles.descContainer}>
                    <FormLabel labelStyle={styles.descriptionTitle}>Description</FormLabel>
                    <FormInput 
                        onChangeText={(newText) => this.textChanged(newText)} 
                        value={this.state.description}
                        multiline
                        inputStyle={styles.inputArea}
                    />
                </View>
                <View style={styles.viewSeparator} />
                <TouchableOpacity
                    onPress={this.handleSubmit}
                    style={styles.btnSubmit}
                >
                    <Text style={styles.txtSubmit}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        marginTop: 40
    },
    descriptionTitle: {
        fontWeight: 'bold',
        color: 'black'
    },
    descContainer: {
        width: '90%',
        alignSelf: 'center'
    },
    btnSubmit: {
        backgroundColor: '#0F2CBD',
        width: 80,
        height: 40,
        alignSelf: 'center',
        marginTop: 20,
        paddingTop: 10,
        borderRadius: 5
    },
    txtSubmit: {
        color: 'white',
        textAlign: 'center'
    },
    vwRadio: {
        flexDirection: 'row',
        marginTop: 10
    },
    radioContainer:{
        justifyContent: 'center',
        alignSelf: 'center',
        width: '90%',
        padding: 10
    },
    headerTitle: {
        fontSize: 14,
        color: 'white'
    },
    headerStyle: {
        backgroundColor: '#0F2CBD'
    },
    radioTxt: {
        marginLeft: 10,
        fontSize: 14,
        paddingTop: 5
    },
    viewSeparator: {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        marginTop: 20,
        marginBottom: 10,
        width: '90%',
        alignSelf: 'center'
    },
    inputArea: {
        width: '90%',
        alignSelf: 'center'
    }
});

export default AddIncident;