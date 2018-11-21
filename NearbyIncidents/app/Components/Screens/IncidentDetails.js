import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';


class IncidentDetails extends Component {
    render(){
        
        let record = this.props.navigation.state.params.record;
        // A temporary hack to show the default image as we are unsure if the image is going to get displayed on the screen
        record.urlToImage = "https://www.fool.com.au/wp-content/uploads/2018/06/boxing-1430483_1280.jpg";
        let imageProps = (record.urlToImage === null) ? {uri: require('./../../assets/images/default-image.jpg')} : {uri: record.urlToImage};
    
        return (
            <View style={styles.container}>
                <Text style={styles.txttitle}>{record.type}</Text>
                <Image 
                        source={imageProps}
                        style={styles.titleImage}
                />
                <View style={styles.contentContainer}>
                    <Text style={styles.txtcontents}>{record.description}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.tchVisit}
                        onPress={() => this.props.navigation.navigate('WebViewPage', {
                            URL: "URL IS YET TO BE PASSED HERE"
                        })}
                    >
                            <Text style={styles.btnVisit}>Visit the page</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        display: 'flex'
    },
    txttitle: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold',
        color: '#0F2CBD',
        margin: 5
    },
    txtcontents: {
        textAlign: 'left',
        fontSize: 15,
        margin: 20
    },
    btnVisit: {
        color: 'white',
        textAlign: 'center',
        paddingTop: 8
    },
    buttonContainer: {
        alignItems: 'center',
        margin: 20
    },
    tchVisit: {
        backgroundColor: '#0F2CBD',
        width: '40%',
        height: 40
    },
    titleImage: {
        height: 250,
        width: 250,
        alignSelf: 'center',
        margin: 20
    }
});

export default IncidentDetails;