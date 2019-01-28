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

import eventsObj from './../../helper/Firebase_Events';

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
        data: {},
        error: false
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <Text style={styles.headerTitle}>Police Questionnaire</Text>,
        }
    }

    handleCheckAdditionalInfo = (index) => {
        let lstadditionalInfo = this.state.additionalInfo;
        lstadditionalInfo[index].checked = !lstadditionalInfo[index].checked;

        this.setState({
            additionalInfo: lstadditionalInfo,
            error: false
        });
    }

    handlePress = () => {
        let data = this.props.navigation.state.params.data;
        
        let lstIncidents = "";
        this.state.additionalInfo.map((elem) => {
            if(elem.checked){
                lstIncidents += elem.label + ",";
            }
        });

        if(lstIncidents === ""){
            this.setState({error: true});
            return;
        }

        lstIncidents = lstIncidents.substring(0, lstIncidents.length - 1);
        data.info["primaryinfo"] = lstIncidents;

        eventsObj.post(data)
            .then(() => {
                this.props.navigation.navigate('TabNavigatorPage');
            });
    }

    render(){

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
                    {this.state.error && 
                    <Text style={styles.errorHeader}>{"Please select appropriate options!"}</Text>}
                    <Text style={styles.header}>{"Select appropriate options (all that apply)"}</Text>
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
        alignItems: 'flex-start',
        marginLeft: '5%'
    },
    header: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 30,
        marginTop: 30,
        color: blue
    },
    errorHeader: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        color: 'red'
    },
    btnContainer: {
        backgroundColor: blue,
        width: 100,
        height: 30,
        paddingTop: 5,
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
        alignSelf: 'center'
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
        marginLeft: '5%',
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