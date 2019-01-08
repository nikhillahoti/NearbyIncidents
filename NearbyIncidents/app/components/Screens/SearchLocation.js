import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

class SearchLocation extends Component {
    
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <Text style={styles.headerTitle}>Search Location</Text>,
        }
    }
    
    render(){
        return (
            <View>
                <Text> Hello There</Text>
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
    }
});

export default SearchLocation;