import React, {Component} from 'react';
import {Text,
    View,
    StyleSheet,
    Image
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class SingleRecordView extends Component {

    render(){
        return (
            <View style={styles.mainContainer}>
                <View style={styles.imageContainer}>
                    <FontAwesome 
                        size={48}
                        name="rss"
                        color='#5c5cd6'
                    />
                </View>
                <View style={styles.mainContentContainer}>
                    <Text style={styles.sourceName}>{this.props.record.type}</Text>
                    <Text style={styles.Content}>{this.props.record.description}</Text>
                    <Text style={styles.timeFont}>{this.props.record.datetime}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    mainContentContainer: {
        flex: 7,
        flexDirection: 'column',
        margin: 10
    },
    imageContainer: {
        flex: 1,
        textAlign: 'right',
        margin: 20
    },
    sourceName: {
        fontSize: 12,
        color: 'grey'
    },
    Content: {
        fontSize: 14,
        color: 'black',
        marginTop: 3 
    },
    timeFont: {
        fontSize: 10,
        marginTop: 20,
        color: 'grey'
    }
});

export default SingleRecordView;