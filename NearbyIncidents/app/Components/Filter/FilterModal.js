import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import {
    CheckBox
} from 'react-native-elements';

class FilterModal extends Component {

    state = {
        Category: [
                    'Medical',
                    'Fire',
                    'Police',
                    'Traffic',
                    'Utility'
                ],
        Distance: [
                    'Current Location',
                    'Specific Location'
                ],
        RSSFeeds: [
                    'Weather Alerts',
                    'Crime',
                    'Missing Person'
                ]
    }

    render(){
        
        // Get the Checkbox list to display 
        const checkBoxList = this.state.Category.map((title, index) => {
            return <CheckBox 
                        title={title} 
                        key={index}
                        size={20}
                        containerStyle={styles.checkboxContainer}
                    />
        });

        return (
            <Modal
                visible={this.props.modalVisible}
            >
                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={() => this.props.ToggleModal()}
                        style={styles.modalStyle}
                    >
                        <Text style={[styles.textStyle, styles.btnClose]}>X</Text>
                    </TouchableOpacity>
                    <Text style={styles.textStyle}>Choose Filter</Text>
                    <View style={styles.viewCategory}>
                        <Text style={styles.txtCategory}>By Category</Text>
                        <View>
                            {checkBoxList}
                        </View>
                    </View>
                </View> 
            </Modal>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: '90%',
        backgroundColor: 'rgba(255, 255, 255, 0.10)',
        alignSelf: 'center',
        marginTop: 10
    },
    textStyle: {
        color: 'black',
        padding: 5,
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 17,
        color: '#5c5cd6'
    },
    btnClose: {
        fontSize: 24,
        marginTop: 5
    },
    modalStyle: {
        alignSelf:'flex-end'
    },
    viewCategory: {
        borderColor: 'darkgrey',
        borderWidth: 1,
        margin: 5,
        padding: 5
    },
    checkboxContainer: {
        height: 40,
        backgroundColor:'rgba(0,0,0, 0)',
        borderWidth: 0
    },
    txtCategory: {
        color: 'darkgrey',
        fontWeight: 'bold'
    }
});

export default FilterModal;