import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import blue from './../../styles/colors';

class ImagePicker extends Component {

    handleRemove = () => {
        this.props.handleRemove(this.props.index);
    }

    handleRemove = () => {
        this.props.handleRemove(this.props.index);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.imagepicker}
                    source={this.state.attachment}
                />
                <View>
                    <FontAwesome 
                        name="remove"
                        size={18}
                        onPress={this.handleRemove}
                    />
                    <FontAwesome
                        name="exchange"
                        size={18}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: blue,
        fontSize: 16
    },  
    imagepicker: {
        width: 200,
        height: 200
    }
});

export default ImagePicker;