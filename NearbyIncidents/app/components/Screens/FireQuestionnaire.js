import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    ScrollView
} from 'react-native';

import blue from '../../styles/colors';

import {CheckBox} from 'react-native-elements';

import RadioForm, {RadioButton, RadioButtonLabel, RadioButtonInput} from 'react-native-simple-radio-button';

class FireQuestionnaire extends Component {
    state = {
        radio_props : [
            {label: "1", value: 1},
            {label: "2-5", value: 2},
            {label: "More than 5", value: 3}
        ],
        value: 1,
        additionalInfo: [
            { 
                label: 'People trapped',
                header: 'People trapped',
                checked: false
            },
            { 
                label: 'Building collapsed',
                header: 'Building collapsed',
                checked: false
            },
            { 
                label: 'Hazardous Material Releases/Spilled. Chemical if known:',
                header: 'Hazardous Material Releases/Spilled',
                checked: false
            }
        ],
        data: {},
        error: false,
        chemicals: ""
    }
    
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <Text style={styles.headerTitle}>Fire Questionnaire</Text>,
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
        if(this.state.value == 1) data.info["primaryinfo"] = "Number Of People: 1";
        else if(this.state.value == 2) data.info["primaryinfo"] = "Number Of People: 2-5";
        else data.info["primaryinfo"] = "Number Of People: More than 5";

        let additionalInfo = "";
        this.state.additionalInfo.map((elem) => {
            if(elem.checked){
                additionalInfo += elem.header + ",";
            }
        }); 

        if(additionalInfo !== ""){
            additionalInfo = additionalInfo.substring(0, additionalInfo.length - 1);
            if(this.state.chemicals !== "" && this.state.additionalInfo[2].checked){
                additionalInfo += (":" + this.state.chemicals);
            }
            data.info["secondaryinfo"] = additionalInfo;
        }

        this.props.navigation.navigate('SearchLocationPage', {data: data});
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
                    <Text style={styles.header}>{"No of buildings on fire (Any one)"}</Text>
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
                    
                    <View style={{borderBottomColor: 'grey', borderBottomWidth: 1, marginTop: 20, width: '90%'}}/>

                    <Text style={styles.header}>{"Additional information (all that apply)"}</Text>
                    <View style={styles.additionalInfoContainer}>
                        {additionalInfoList}
                    </View>
                    <TextInput 
                        placeholder="Please specify chemicals if known"
                        style={styles.textInput}
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(chemicals) => this.setState({chemicals})}
                    />

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

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        marginLeft: '5%'
    },
    header: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 15,
        marginTop: 15,
        color: blue
    },
    radio: {
        marginRight: 30
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
    additionalInfoContainer: {
        marginRight: 10,
        marginLeft: '1%',
        alignItems: 'flex-start'
    },
    textInput: {
        height: 100,
        width: 200,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: blue,
        marginLeft: '8%',
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
    }
});

export default FireQuestionnaire;