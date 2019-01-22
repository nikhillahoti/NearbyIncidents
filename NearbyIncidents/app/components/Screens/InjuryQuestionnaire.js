import React, {Component} from 'react';
import {
    View, 
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import {CheckBox} from 'react-native-elements';

import eventsObj from './../../helper/Firebase_Events';

import blue from './../../styles/colors';

class InjuryQuestionnaire extends Component {

    state = {
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
            headerTitle: <Text style={styles.headerTitle}>Step 2</Text>,
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

        let majorInjuries = [];
        this.state.severeInjury.map((elem) => {
            if(elem.checked){
                majorInjuries.push(elem.header);
            }
        });

        if(majorInjuries.length < 1){
            this.setState({error: true});
            return;
        }

        data["Major Injuries"] = majorInjuries;

        if(this.state.severeInjury[3].checked){
            let shockDetails = [];
            this.state.shockInjury.map((elem) => {
                if(elem.checked){
                    shockDetails.push(elem.label);
                }
            });

            if(shockDetails.length < 1){
                this.setState({error: true});
                return;
            }
            data["Shock Details"] = shockDetails;
        }

        eventsObj.post(data)
            .then(() => {
                this.props.navigation.navigate('TabNavigatorPage');
            });
    }

    render(){
        //this.props.navigation.state.params.data

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
            <View style={styles.container}>
                {this.state.error && 
                <Text style={styles.errorHeader}>{"Please select appropriate options!"}</Text>}
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
    errorHeader: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        color: 'red'
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
        marginLeft: 15,
        marginRight: 0,
        alignItems: 'flex-start'
    }
})

export default InjuryQuestionnaire;