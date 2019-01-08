import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

import Map_Key from './../../assets/apiKey';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';

class SearchLocation extends Component {
    
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <Text style={styles.headerTitle}>Search Location</Text>,
        }
    }
    
    render(){
        return (
            <View style={styles.container}>
                <GoogleAutoComplete apiKey={Map_Key}>

                </GoogleAutoComplete>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 15,
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginRight: 15
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default SearchLocation;