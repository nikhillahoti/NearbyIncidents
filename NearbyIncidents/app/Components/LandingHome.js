import React, {Component } from 'react';
import {
    View,
    Text
} from 'react-native';

class LandingHome extends Component {

    static navigationOptions = {
        header: null
    }

    render(){
        const sample = "SOS";
        return (
            <View>
                <Text>{sample}</Text>
                <Text>{"Chat"}</Text>
            </View>
        );
    }
}

export default LandingHome;
