import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';

import blue from '../../styles/colors';

import {CheckBox} from 'react-native-elements';

import eventsObj from './../../helper/Firebase_Events';

import RadioForm, {RadioButton, RadioButtonLabel, RadioButtonInput} from 'react-native-simple-radio-button';
import FireQuestionnaire from './FireQuestionnaire';

class MedicalAndTrappedQuestionnaire extends Component {
    state = {
        radio_props : [
            {label: "1", value: 1},
            {label: "5-10", value: 2},
            {label: "More than 10", value: 3}
        ],
        value: 1,
        severeInjury: [
            { 
                label: 'Breathing',
                header: 'Breathing',
                checked: false
            },
            { 
                label: 'Bleeding',
                header: 'Bleeding',
                checked: false
            },
            { 
                label: 'Conscious',
                header: 'Conscious',
                checked: false
            },
            { 
                label: 'In shock (all that apply)',
                header: 'Shock',
                checked: false
            }
        ],
        shockInjury: [
            { 
                label: 'Cold',
                checked: false
            },
            { 
                label: 'Clammy',
                checked: false
            },
            { 
                label: 'Gray Color',
                checked: false
            },
            { 
                label: 'Laboured breathing',
                checked: false
            }
        ],
        data: {},
        error: false
    }
    
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <Text style={styles.headerTitle}>{"Questionnaire"}</Text>,
        }
    }

    handleCheckSevereInjury = (index) => {
        let lstSevereInjury = this.state.severeInjury;
        lstSevereInjury[index].checked = !lstSevereInjury[index].checked;

        this.setState({
            severeInjury: lstSevereInjury,
            error: false
        });
    }

    handleCheckShockInjury = (index) => {
        let lstShockInjury = this.state.shockInjury;
        lstShockInjury[index].checked = !lstShockInjury[index].checked;

        let lstSevereInjury = this.state.severeInjury;
        lstSevereInjury[3].checked = true;

        this.setState({
            shockInjury: lstShockInjury,
            severeInjury: lstSevereInjury,
            error: false
        });
    }

    handlePress = () => {
        let data = this.props.navigation.state.params.data;
        if(this.state.value == 1) data.info["primaryinfo"] = "Number Of People: 1";
        else if(this.state.value == 2) data.info["primaryinfo"] = "Number Of People: 2-5";
        else data.info["primaryinfo"] = "More than 10";

        let majorInjuries = "";
        this.state.severeInjury.map((elem) => {
            if(elem.checked){
                majorInjuries += elem.header + ",";
            }
        });

        if(majorInjuries !== ""){
            majorInjuries = majorInjuries.substring(0, majorInjuries.length - 1);
            
            if(this.state.severeInjury[3].checked){
                let shockDetails = "";
                this.state.shockInjury.map((elem) => {
                    if(elem.checked){
                        shockDetails += elem.label + ",";
                    }
                });

                shockDetails = shockDetails.substring(0, shockDetails.length - 1);
                if(shockDetails !== ""){
                    majorInjuries += (":" + shockDetails);
                }
            }

            data.info["secondaryinfo"] = majorInjuries;
        }

        eventsObj.post(data)
            .then(() => {
                this.props.navigation.navigate('TabNavigatorPage');
            });
    }

    render(){
        const severeInjuryList = this.state.severeInjury.map((option, index) => {
            return <CheckBox 
                        title={option.label}
                        checked={option.checked} 
                        key={index}
                        size={20}
                        onPress={() => this.handleCheckSevereInjury(index)}
                        containerStyle={styles.checkboxContainer}
                        textStyle={styles.checkBox}
                    />
        });

        const shockInjuryList = this.state.shockInjury.map((option, index) => {
            return <CheckBox 
                        title={option.label}
                        checked={option.checked} 
                        key={index}
                        size={20}
                        onPress={() => this.handleCheckShockInjury(index)}
                        containerStyle={styles.checkboxContainer}
                        textStyle={styles.checkBox}
                    />
        });


        return (
            <ScrollView>
                <View style={styles.container}>
                    {this.state.error && 
                    <Text style={styles.errorHeader}>{"Please select appropriate options!"}</Text>}
                    <Text style={styles.header}>{"No of injured patient (Any one)"}</Text>
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

                    <Text style={styles.header}>{"Most severe injuries (all that apply)"}</Text>
                    <View style={styles.severeContainer}>
                        {severeInjuryList}
                    </View>
                    <View style={styles.shockContainer}>
                        {shockInjuryList}
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
        marginBottom: 20,
        marginTop: 10,
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
    severeContainer: {
        marginRight: 40,
        alignItems: 'flex-start'
    },
    shockContainer: {
        marginLeft: '10%',
        marginRight: 0,
        alignItems: 'flex-start'
    }
});

export default MedicalAndTrappedQuestionnaire;