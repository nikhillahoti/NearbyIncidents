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
        const sample = "Sample Text";
        return (
            <View>
                <Text>{sample}</Text>
            </View>
        );
    }
}

export default LandingHome;
