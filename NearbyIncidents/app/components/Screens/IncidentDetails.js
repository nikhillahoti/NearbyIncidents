import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

import blue from './../../styles/colors';

import eventsObj from './../../helper/Firebase_Events';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

class IncidentDetails extends Component {
    
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <Text style={styles.headerTitle}>Confirm</Text>,
        }
    }

    getImage = (type) => {
        switch(type){
            case "Medical":
                return <MaterialIcons 
                            size={70}
                            name="local-hospital"
                            color={'red'}
                        />

            case "Traffic":
                return <EntypoIcons 
                            size={70}
                            name="traffic-cone"
                            color={'orange'}
                        />
            
            case "Fire":
                return <SimpleLineIcons 
                            size={70}
                            name="fire"
                            color={'orange'}
                        />

            case "Police":
                return <Image 
                            style={styles.imageStyle}
                            source={require('./../../assets/images/PoliceIcon.png')}
                        />

            case "Utility":
                return <Image 
                            style={styles.imageStyle}
                            source={require('./../../assets/images/UtilityIcon.png')}
                        />

            default:
                return <FontAwesome 
                            size={70}
                            name="rss"
                            color={'yellow'}
                        />
        }
    }

    render() {
        let value = this.props.navigation.state.params.record;
        const icon = this.getImage(value.type);

        return (
            <View style={styles.container}>
                <View style={{ marginTop: 40 }}/>
                {icon}
                <Text style={styles.type}>{value.type}</Text>

                <View style={{borderBottomColor: 'grey', borderBottomWidth: 1, marginTop: 10, marginBottom: 10, width: '90%'}}/>

                <Text style={styles.lbl}>{"Details"}</Text>
                <Text style={styles.details}>{value.info.primaryinfo}</Text>
                {value.info.secondaryinfo !== "" && <Text style={styles.details}>{value.info.secondaryinfo}</Text>}

                <View style={{borderBottomColor: 'grey', borderBottomWidth: 1, marginTop: 20, marginBottom: 10, width: '90%'}}/>

                <Text style={styles.lbl}>{"Location"}</Text>
                <Text style={styles.details}>{value.info.location.detailed.formatted_address}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        fontSize: 17,
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginRight: 15
    },
    imageStyle: {
        width: 80,
        height: 60,
        resizeMode: 'stretch'
    },
    type: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        margin: 10
    },
    details:{
        fontSize: 15,
        color: '#606060',
        margin: 10
    },
    lbl: {
        fontWeight: 'bold',
        fontSize: 16,
        color: blue
    }
});

export default IncidentDetails;