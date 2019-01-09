import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import blue from '../../styles/colors';

class SubscribeLocation extends Component {
    
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <Text style={styles.headerTitle}>Subscribe To Address</Text>,
        }
    }

    handleSubscribe = () =>{
        // Add the user to the subscribers list
        this.props.navigation.state.params.navigation.navigate("TabNavigatorPage");
    }
    
    render(){
        let data = this.props.navigation.state.params.screenProps;
        console.log(data);
        return (
            <View style={styles.holder}>
                <Text style={styles.title}>Location</Text>
                <Text style={styles.description}>{data.formatted_address}</Text>
                <TouchableOpacity
                    style={styles.btnSubscribe}
                    onPress={this.handleSubscribe}
                >
                    <Text style={styles.txtSubscribe}>Subscribe</Text>
                </TouchableOpacity>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    holder: {
        justifyContent: 'center',
        marginTop: 60,
        flexDirection: 'column'
    },
    headerTitle: {
        fontSize: 17,
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginRight: 15
    },
    title: {
        fontSize: 20,
        color: blue,
        textAlign: 'center'
    },
    description: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center'
    },
    btnSubscribe: {
        backgroundColor: blue,
        width: 80,
        height: 40,
        alignSelf: 'center',
        marginTop: 20,
        paddingTop: 10,
        borderRadius: 5
    },
    txtSubscribe: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14
    }
});

export default SubscribeLocation;