import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native'

import { GoogleAutoComplete } from 'react-native-google-autocomplete';

import {Maps_Key} from './../../assets/apiKey';
import blue from './../../styles/colors';
import SearchItem from './SearchItem';

class SearchLocation extends Component {
    
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <Text style={styles.headerTitle}>Location</Text>,
        }
    }

    handlePress = (placeDetails) => {
        console.log(placeDetails);
        let data = this.props.navigation.state.params.data;
        data.info.location.latitude = placeDetails.geometry.location.lat;
        data.info.location.longitude = placeDetails.geometry.location.lng;
        data.info.location.postalcode = placeDetails.address_components[placeDetails.address_components.length - 1].long_name;
        data.info.location["detailed"] = placeDetails;

        this.props.navigation.navigate('IncidentReviewPage', {data: data});
    }
    
    render(){
        console.log("Inside of Location --->");
        console.log(this.props.navigation.state.params.data);
        return (
            <View>
                <View style={styles.locationContainer}>
                    <GoogleAutoComplete apiKey={Maps_Key} 
                        debounce={1000}
                        minLength={4}
                    >
                        {({ handleTextChange, locationResults, fetchDetails }) => (
                            <React.Fragment>
                                <View style={styles.inputWrapper}> 
                                    <TextInput 
                                        placeholder="Search Location"
                                        style={styles.textInput}
                                        onChangeText={handleTextChange}
                                    />
                                </View>
                                <ScrollView>
                                    {locationResults.map(e1 => (
                                        <SearchItem
                                            key={e1.id}  
                                            {...e1}
                                            fetchDetails={fetchDetails}
                                            handlePress={this.handlePress}
                                        />
                                    ))}
                                </ScrollView>                                                        
                            </React.Fragment>
                        )}
                    </GoogleAutoComplete>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    locationContainer: {
        width: '100%',
        padding: 20,
        justifyContent: 'center'
    },
    inputWrapper: {
        marginTop: 10
    },
    headerTitle: {
        fontSize: 17,
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginRight: 25
    },
    txtLocation: {
        width: '90%',
        textAlign: 'center'
    },
    textInput: {
        height: 40,
        width: 300,
        borderWidth: 1,
        paddingHorizontal: 16,
        borderRadius: 15,
        borderColor: blue
    },
});

export default SearchLocation;