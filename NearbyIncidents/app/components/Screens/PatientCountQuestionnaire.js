import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import blue from '../../styles/colors';

import RadioForm, {RadioButton, RadioButtonLabel, RadioButtonInput} from 'react-native-simple-radio-button';

class MedicalAndTrappedQuestionnaire extends Component {
    state = {
        radio_props : [
            {label: "1", value: 1},
            {label: "5-10", value: 2},
            {label: "More than 10", value: 3}
        ],
        value: 1
    }
    
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <Text style={styles.headerTitle}>Step 1</Text>,
        }
    }

    handlePress = () => {
        let data = this.props.navigation.state.params.data;
        if(this.state.value == 1) data.NumberOfPeople = "1";
        else if(this.state.value == 2) data.NumberOfPeople = "5-10";
        else data.NumberOfPeople = "More than 10";
        this.props.navigation.navigate('InjuryQuestionnaire', {data: data});
    }

    render(){
        return (
            <View style={styles.container}>
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

const styles = StyleSheet.create({
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
    }
});

export default MedicalAndTrappedQuestionnaire;