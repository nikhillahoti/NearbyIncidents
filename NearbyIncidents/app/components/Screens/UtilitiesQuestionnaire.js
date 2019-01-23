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
import style from '../UI_Components/style';

class UtilitiesQuestionnaire extends Component {

    state = {
        error: false,
        PowerOutInfo: [
            { 
                label: 'Power line down',
                checked: false
            },
            { 
                label: 'Power out',
                checked: false
            }
        ],
        PowerOut_radio_props : [
            {label: "1", value: 1},
            {label: "2-5", value: 2},
            {label: "More than 5", value: 3}
        ],
        PowerBlockValue: -1,
        WaterInfo: [
            { 
                label: 'Water main break',
                checked: false
            }
        ],
        Water_radio_props : [
            {label: "1", value: 1},
            {label: "2-5", value: 2},
            {label: "More than 5", value: 3}
        ],
        WaterBlockValue: -1,
        GasInfo: [
            { 
                label: 'Gas line on fire',
                checked: false
            },
            { 
                label: 'Gas main break',
                checked: false
            }
        ],
        Gas_radio_props : [
            {label: "1", value: 1},
            {label: "2-5", value: 2},
            {label: "More than 5", value: 3}
        ],
        GasBlockValue: -1,
        LandlineInfo: [
            { 
                label: 'Landline Outage',
                checked: false
            }
        ],
        Landline_radio_props : [
            {label: "1", value: 1},
            {label: "2-5", value: 2},
            {label: "More than 5", value: 3}
        ],
        LandlineBlockValue: -1,
        CellphoneInfo: [
            { 
                label: 'Cellphone Outage',
                checked: false
            }
        ],
        Cellphone_radio_props : [
            {label: "1", value: 1},
            {label: "2-5", value: 2},
            {label: "More than 5", value: 3}
        ],
        CellphoneBlockValue: -1
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <Text style={styles.headerTitle}>Step 1</Text>,
        }
    }

    handleCheckPowerOutInfo = (index) => {
        let lstPowerOut = this.state.PowerOutInfo;
        lstPowerOut[index].checked = !lstPowerOut[index].checked;

        this.setState({
            PowerOutInfo: lstPowerOut
        });
    }

    handleCheckWaterInfo = (index) => {
        let lstWater = this.state.WaterInfo;
        lstWater[index].checked = !lstWater[index].checked;

        this.setState({
            WaterInfo: lstWater
        });
    }

    handleCheckGasInfo = (index) => {
        let lstGas = this.state.GasInfo;
        lstGas[index].checked = !lstGas[index].checked;

        this.setState({
            GasInfo: lstGas
        });
    }

    handleCheckLandlineInfo = (index) => {
        let lstLandline = this.state.LandlineInfo;
        lstLandline[index].checked = !lstLandline[index].checked;

        this.setState({
            LandlineInfo: lstLandline
        });
    }

    handleCheckCellphoneInfo = (index) => {
        let lstCellphone = this.state.CellphoneInfo;
        lstCellphone[index].checked = !lstCellphone[index].checked;

        this.setState({
            CellphoneInfo: lstCellphone
        });
    }

    render(){

        const PowerOutInfo = this.state.PowerOutInfo.map((option, index) => {
            return <CheckBox 
                        title={option.label}
                        checked={option.checked} 
                        key={index}
                        size={20}
                        onPress={() => this.handleCheckPowerOutInfo(index)}
                        containerStyle={styles.checkboxContainer}
                        textStyle={styles.checkBox}
                    />
        });

        const PowerOutBlockLst = <RadioForm 
            style={styles.radio}
            radio_props={this.state.PowerOut_radio_props}
            initial={0}
            borderWidth={1}
            buttonSize={14}
            animation={true}
            buttonColor={blue}
            selectedButtonColor={blue}
            onPress={(value) => {this.setState({PowerBlockValue: value})}}
        />

        const WaterInfo = this.state.WaterInfo.map((option, index) => {
            return <CheckBox 
                        title={option.label}
                        checked={option.checked} 
                        key={index}
                        size={20}
                        onPress={() => this.handleCheckWaterInfo(index)}
                        containerStyle={styles.checkboxContainer}
                        textStyle={styles.checkBox}
                    />
        });

        const WaterBlockLst = <RadioForm 
            style={styles.radio}
            radio_props={this.state.Water_radio_props}
            initial={0}
            borderWidth={1}
            buttonSize={14}
            animation={true}
            buttonColor={blue}
            selectedButtonColor={blue}
            onPress={(value) => {this.setState({WaterBlockValue: value})}}
        />

        const GasInfo = this.state.GasInfo.map((option, index) => {
            return <CheckBox 
                        title={option.label}
                        checked={option.checked} 
                        key={index}
                        size={20}
                        onPress={() => this.handleCheckGasInfo(index)}
                        containerStyle={styles.checkboxContainer}
                        textStyle={styles.checkBox}
                    />
        });

        const GasBlockLst = <RadioForm 
            style={styles.radio}
            radio_props={this.state.Gas_radio_props}
            initial={0}
            borderWidth={1}
            buttonSize={14}
            animation={true}
            buttonColor={blue}
            selectedButtonColor={blue}
            onPress={(value) => {this.setState({GasBlockValue: value})}}
        />

        const LandlineInfo = this.state.LandlineInfo.map((option, index) => {
            return <CheckBox 
                        title={option.label}
                        checked={option.checked} 
                        key={index}
                        size={20}
                        onPress={() => this.handleCheckLandlineInfo(index)}
                        containerStyle={styles.checkboxContainer}
                        textStyle={styles.checkBox}
                    />
        });

        const LandlineBlockLst = <RadioForm 
            style={styles.radio}
            radio_props={this.state.Landline_radio_props}
            initial={0}
            borderWidth={1}
            buttonSize={14}
            animation={true}
            buttonColor={blue}
            selectedButtonColor={blue}
            onPress={(value) => {this.setState({LandlineBlockValue: value})}}
        />


        const CellPhoneInfo = this.state.CellphoneInfo.map((option, index) => {
            return <CheckBox 
                        title={option.label}
                        checked={option.checked} 
                        key={index}
                        size={20}
                        onPress={() => this.handleCheckCellphoneInfo(index)}
                        containerStyle={styles.checkboxContainer}
                        textStyle={styles.checkBox}
                    />
        });

        const CellphoneBlockLst = <RadioForm 
            style={styles.radio}
            radio_props={this.state.Cellphone_radio_props}
            initial={0}
            borderWidth={1}
            buttonSize={14}
            animation={true}
            buttonColor={blue}
            selectedButtonColor={blue}
            onPress={(value) => {this.setState({CellphoneBlockValue: value})}}
        />

        return (
            <ScrollView>
                {this.state.error && 
                    <Text style={styles.errorHeader}>{"Please select appropriate options!"}</Text>}
                <View style={styles.container}>
                    <Text style={styles.header}>{"Utility options"}</Text>
                    <View style={styles.SubContainer}>
                        <Text style={styles.subHeader}>{"1. Power (all that apply)"}</Text>
                        {PowerOutInfo}
                        <Text style={styles.subsubHeader}>{"Number of blocks (any one)"}</Text>
                        <View style={styles.radioContainer}>
                            {PowerOutBlockLst}
                        </View>                        
                    </View>

                    <View style={styles.SubContainer}>
                        <Text style={styles.subHeader}>{"2. Water (all that apply)"}</Text>
                        {WaterInfo}
                        <Text style={styles.subsubHeader}>{"Number of blocks (any one)"}</Text>
                        <View style={styles.radioContainer}>
                            {WaterBlockLst}
                        </View>                        
                    </View>

                    <View style={styles.SubContainer}>
                        <Text style={styles.subHeader}>{"3. Gas (all that apply)"}</Text>
                        {GasInfo}
                        <Text style={styles.subsubHeader}>{"Number of houses affected (any one)"}</Text>
                        <View style={styles.radioContainer}>
                            {GasBlockLst}
                        </View>                        
                    </View>

                    <View style={styles.SubContainer}>
                        <Text style={styles.subHeader}>{"4. Telephone (all that apply)"}</Text>
                        {LandlineInfo}
                        <Text style={styles.subsubHeader}>{"Number of houses affected (any one)"}</Text>
                        <View style={styles.radioContainer}>
                            {LandlineBlockLst}
                        </View>  
                        <View style={{marginTop: 10}}/>                      
                        {CellPhoneInfo}
                        <Text style={styles.subsubHeader}>{"Number of blocks affected (any one)"}</Text>
                        <View style={styles.radioContainer}>
                            {CellphoneBlockLst}
                        </View>                        
                    </View>

                    <View style={styles.btnNextContainer}>
                        <TouchableOpacity
                            style={styles.btnContainer}      
                            onPress={this.handlePress}    
                        >
                            <Text style={styles.btnNext}>{"Next"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 20
    },
    header: {
        fontSize: 18,
        marginTop: 10,
        textAlign: 'center',
        color: blue
    },
    subHeader: {
        fontSize: 16,
        marginBottom: 12
    },
    errorHeader: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        color: 'red'
    },
    SubContainer: {
        marginTop: 15,
    },
    checkboxContainer: {
        height: 40,
        backgroundColor:'rgba(0,0,0, 0)',
        borderWidth: 0,
        margin: 0,
        padding: 0
    },
    checkBox: {
        fontSize: 14,
        fontWeight: 'normal'
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
    btnNextContainer: {
        alignItems: 'center'
    },
    radioContainer: {
        marginLeft: 30
    },
    subsubHeader: {
        fontSize: 14,
        marginBottom: 12,
        marginLeft: 30
    },
    headerTitle: {
        fontSize: 17,
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginRight: 15
    }
});

export default UtilitiesQuestionnaire;