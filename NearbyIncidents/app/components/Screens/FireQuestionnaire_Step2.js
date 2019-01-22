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

class FireQuestionnaire_Step2 extends Component {

    state = {
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
            headerTitle: <Text style={styles.headerTitle}>Step 2</Text>,
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
        let additionalInfo = [];
        this.state.additionalInfo.map((elem) => {
            if(elem.checked){
                additionalInfo.push(elem.header);
            }
        });

        if(additionalInfo.length < 1){
            this.setState({error: true});
            return;
        }

        data["Additional Info"] = additionalInfo;
        if(this.state.chemicals !== null){
            data["Chemicals"] = this.state.chemicals;
        }
        
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

export default FireQuestionnaire_Step2;