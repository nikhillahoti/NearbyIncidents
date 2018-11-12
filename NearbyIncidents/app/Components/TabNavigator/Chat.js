import React, {Component} from 'react';
import {
    Text,
    View
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

class Chat extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: (
                <View style={{padding: 10}}>
                    <Ionicons name="md-menu" 
                        size={24}
                        onPress={() => navigation.navigate('DrawerOpen')}
                    />
                </View>
            )
        }
    }

    render(){
        return (
            <View style={{marginTop: 100}}>
                <Text> Chat Screen </Text>
            </View>
        )
    }
}

export default Chat;