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

class TrafficQuestionnaire extends Component {

    state = {
        radio_props : [
            {label: "1", value: 1},
            {label: "2-5", value: 2},
            {label: "More than 5", value: 3}
        ],
        injuries: {
            label: "Injuries",
            checked: false
        },
        additionalInfo: [
            { 
                label: 'Road damage',
                checked: false
            },
            { 
                label: 'Road Impassable',
                checked: false
            }
        ],
        value: 1,
        data: {},
        error: false
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

    handleInjuryCheck = () => {
        let injuries = this.state.injuries;
        injuries.checked = !injuries.checked;
        this.setState({injuries: injuries});
    }

    handlePress = () => {
        let data = this.props.navigation.state.params.data;
        let selected = false;

        if(this.state.injuries.checked){    
            if(this.state.value === 1) data.info["primaryinfo"] = "Injuries: Number Of People: 1";
            else if(this.state.value === 2) data.info["primaryinfo"] = "Injuries: Number Of People: 2-5";
            else data.info["primaryinfo"] = "Injuries: Number Of People: More than 5";
            selected = true;
        }

        let lstadditionalInfo = "";
        this.state.additionalInfo.map((elem) => {
            if(elem.checked){
                lstadditionalInfo += elem.label + ",";
                selected = true;
            }
        });

        if(selected === false){
            this.setState({error: true});
            return
        }

        lstadditionalInfo = lstadditionalInfo.substring(0,lstadditionalInfo.length - 1);
        data.info["secondaryinfo"] = lstadditionalInfo;

        eventsObj.post(data)
            .then(() => {
                this.props.navigation.navigate('TabNavigatorPage');
            });
    }

    render(){
        //this.props.navigation.state.params.data
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

        const radioList = <RadioForm 
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

        const injuriesCheckBox = <CheckBox
                                    title={this.state.injuries.label}
                                    checked={this.state.injuries.checked}
                                    size={20}
                                    onPress={() => this.handleInjuryCheck()}
                                    containerStyle={styles.checkboxContainer}
                                    textStyle={styles.checkBox}
                                />;

        return (
            <ScrollView>
                <View style={styles.container}>
                    {this.state.error && 
                    <Text style={styles.errorHeader}>{"Please select appropriate options!"}</Text>}
                    <Text style={styles.header}>{"Traffic options (all that apply)"}</Text>
                    <View style={styles.injuriesCheckBoxVW}>
                        {injuriesCheckBox}
                    </View>
                    <View style={styles.radioVW}>
                        {radioList}
                    </View>
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

const styles = StyleSheet.create({
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
    radio: {
        marginRight: 10
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
        marginRight: 20,
        //marginLeft: 10,
        alignItems: 'flex-start'
    },
    textInput: {
        height: 100,
        width: 200,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: blue
    },
    radioVW: {
        marginBottom: 10,
        marginLeft: 25
    },
    injuriesCheckBoxVW:{
        marginRight: 60,
        alignItems: 'flex-start'
    }
})

export default TrafficQuestionnaire;