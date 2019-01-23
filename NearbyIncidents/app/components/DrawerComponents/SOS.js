import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import blue from './../../styles/colors';

import eventsObj from './../../helper/Firebase_Events';

class SOS extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <Text style={styles.headerTitle}>SOS</Text>,
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

    state = {
        delay: 5000
    }

    startPress = null;

    onStart = () => {
        this.startPress = Date.now();
    }

    onEnd =() => {
        const now = Date.now();
        if(this.startPress && now - this.startPress > this.state.delay){
            this.handlePress();
        }
        this.startPress = null;
    }

    handlePress = () => {
        const data = {};
        data["Type"] = "Emergency";
        data["Number of People"] = "1-5";
        data["Additional Information"] = "User is Trapped";

        eventsObj.post(data)
            .then(() => {
                Alert.alert('SOS', 'Authorities have been notified!');
            });
    }

    render(){ 
        return (
            <View
                style={styles.container}
            >
                <TouchableOpacity 
                    style={styles.btnContainer}
                    onPressIn={this.onStart}
                    onPressOut={this.onEnd}
                >
                </TouchableOpacity>
                <Text style={styles.txtInfo}>{"Long Press the button"}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center'
    },
    btnContainer: {
        marginTop: 50,
        borderRadius: 120,
        backgroundColor: 'tomato',
        width: 200,
        height: 200
    },
    txtInfo: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: blue,
        marginTop:30
    },
    headerTitle: {
        fontSize: 17,
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginRight: 15
    },
});

export default SOS;