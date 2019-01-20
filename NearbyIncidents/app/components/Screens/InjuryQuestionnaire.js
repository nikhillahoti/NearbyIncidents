import React, {Component} from 'react';
import {
    View, 
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import {CheckBox} from 'react-native-elements';

import blue from './../../styles/colors';

class InjuryQuestionnaire extends Component {

    state = {
        severeInjury: [
            { 
                label: 'Breathing',
                checked: false
            },
            { 
                label: 'Bleeding',
                checked: false
            },
            { 
                label: 'Conscious',
                checked: false
            },
            { 
                label: 'In shock (all that apply)',
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
        data: {}
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
            severeInjury: lstSevereInjury
        });
    }

    handleCheckShockInjury = (index) => {
        let lstShockInjury = this.state.shockInjury;
        lstShockInjury[index].checked = !lstShockInjury[index].checked;

        this.setState({
            shockInjury: lstShockInjury
        });
    }

    render(){
        //this.props.navigation.state.params.data
        console.log(this.props.navigation.state.params.data);

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

        handlePress = () => {
            let data = "";
            if(this.state.value == 1) data = "1";
            if(this.state.value == 2) data = "5-10";
            if(this.state.value == 3) data = "More than 10";
    
            this.props.navigation.navigate('InjuryQuestionnaire', {data: {NumberOfPeople: data}});
        }

        return (
            <View style={styles.container}>
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