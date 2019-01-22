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

class PoliceQuestionnaire extends Component {

    state = {
        additionalInfo: [
            { 
                label: 'Looting',
                checked: false
            },
            { 
                label: 'Shots fired',
                checked: false
            },
            { 
                label: 'Vandalism',
                checked: false
            },
            { 
                label: 'Assault',
                checked: false
            },
            { 
                label: 'Gang Violence',
                checked: false
            }
        ],
        data: {}
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <Text style={styles.headerTitle}>Step 1</Text>,
        }
    }

    handleCheckAdditionalInfo = (index) => {
        let lstadditionalInfo = this.state.additionalInfo;
        lstadditionalInfo[index].checked = !lstadditionalInfo[index].checked;

        this.setState({
            additionalInfo: lstadditionalInfo
        });
    }

    handlePress = () => {
        let data = "";
        if(this.state.value == 1) data = "Looting";
        if(this.state.value == 2) data = "Shots Fired";
        if(this.state.value == 3) data = "Vandalism";
        if(this.state.value == 4) data = "Assault";
        if(this.state.value == 5) data = "Gang Violence";

        this.props.navigation.navigate('InjuryQuestionnaire', {data: {NumberOfPeople: data}});
    }

    render(){
        //this.props.navigation.state.params.data
        console.log("Select appropriate option (all that apply)");

        const additionalInfoList = this.state.additionalInfo.map((option, index) => {
            return <CheckBox 
                        title={option.label}
                        checked={option.checked} 
                        key={index}
                        size={20}
                        onPress={() => this.handleCheckAdditionalInfo(index)}
                        containerStyle={styles.checkboxContainer}
                        textStyle={styles.checkBox}
                    />
        });

        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.header}>{"Additional information (all that apply)"}</Text>
                    <View style={styles.additionalInfoContainer}>
                        {additionalInfoList}
                    </View>
                    <TouchableOpacity
                        style={styles.btnContainer}      
                        onPress={this.handlePress}    
                    >
                        <Text style={styles.btnNext}>{"Next"}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles= StyleSheet.create({
    container: {
        alignItems: 'center',
        margin: 20
    },
    header: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 30,
        marginTop: 30
    },
    btnContainer: {
        backgroundColor: blue,
        width: 100,
        height: 30,
        paddingTop: 5,
        marginTop: 20,
        textAlign: 'center'
    },
    btnNext: {
        color: '#fff',
        textAlign: 'center'
    },
    headerTitle: {
        fontSize: 17,
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginRight: 15
    },
    checkboxContainer: {
        height: 40,
        backgroundColor:'rgba(0,0,0, 0)',
        borderWidth: 0,
        margin: 0,
        padding: 0
    },
    checkBox: {
        fontSize: 12,
        color: '#000'
    },
    additionalInfoContainer: {
        marginRight: 10,
        marginLeft: 10,
        alignItems: 'flex-start'
    },
    textInput: {
        height: 100,
        width: 200,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: blue
    }
})

export default PoliceQuestionnaire;