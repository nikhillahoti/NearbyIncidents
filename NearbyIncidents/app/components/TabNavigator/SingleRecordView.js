import React, {Component} from 'react';
import {Text,
    View,
    StyleSheet,
    Image
} from 'react-native';

//import {Card} from 'react-native-elements';
import blue from './../../styles/colors';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

class SingleRecordView extends Component {

    deg2rad = (degrees) => {
      var pi = Math.PI;
      return degrees * (pi/180);
    }
    
    getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
        let R = 6371; // Radius of the earth in km
        let dLat = this.deg2rad(lat2-lat1);  // deg2rad below
        let dLon = this.deg2rad(lon2-lon1); 
        let a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        let d = R * c; // Distance in km
        return parseFloat(Math.round(d).toFixed(2));
    }

    formatDate = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
      }

    render(){
        console.log("Inside of SingleView");
        console.log(this.props.record);
        console.log(this.props.latitude);
        console.log(this.props.longitude);
        
        this.props.record.datetime = this.formatDate(new Date());

        if(this.props.locationAvailable){
            let incidentLocation = this.props.record.info.location;
            this.props.record.distance = this.getDistanceFromLatLonInKm(incidentLocation.latitude, incidentLocation.longitude, this.props.latitude, this.props.longitude);
        }
        
        return (
            <View style={styles.mainContainer}>
                <View style={styles.imageContainer}>
                    <FontAwesome 
                        size={48}
                        name="rss"
                        color={blue}
                    />
                </View>
                <View style={styles.mainContentContainer}>
                    <View style={styles.containerHeader}>
                        <Text style={styles.sourceName}>{this.props.record.type}</Text>
                        <View>
                            <Text style={styles.distance}>{this.props.record.distance + " kms"}</Text>
                        </View>
                    </View>
                    <Text style={styles.Content}>{this.props.record.info.primaryinfo}</Text>
                    <Text style={styles.Content}>{this.props.record.info.secondaryinfo}</Text>
                    <Text style={styles.DateTime}>{this.props.record.datetime}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: '2%',
        height: 85
    },
    mainContentContainer: {
        flex: 5,
        flexDirection: 'column'
    },
    imageContainer: {
        flex: 1,
        textAlign: 'right',
        marginRight: '5%',
        marginLeft: '5%',
        marginTop: '5%',
        borderRadius: 150
    },
    sourceName: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
        flex: 1
    },
    Content: {
        fontSize: 14,
        color: 'slategrey',
    },
    DateTime:{
        fontSize: 14,
        color: 'slategrey',
        marginBottom: '1%'
    },
    distance: {
        fontSize: 14,
        color: blue,
        textAlign: 'right',
        flex: 1,
        marginRight: '15%',
        fontWeight: 'bold'
    },
    containerHeader: {
        flexDirection: 'row',
        margin: 0,
        marginBottom: 5
    },
    cardWrapper: {
        borderRadius: 15,
        margin: 10
    }
});

export default SingleRecordView;