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
    CheckBox,
    Button
} from 'react-native-elements';

class FilterModal extends Component {

    state = {
        Category: [
            { 
                label: 'Medical',
                visible: false
            },
            { 
                label: 'Traffic',
                visible: false
            },
            { 
                label: 'Update',
                visible: false
            },
            { 
                label: 'Crime',
                visible: false
            },
            { 
                label: 'Utility',
                visible: false
            },
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
    
    checkMe = (index) => {
        let lstCategory = this.state.Category;
        lstCategory[index].visible = ! lstCategory[index].visible;

        this.setState({
            Category: lstCategory
        });
    }

    render(){
        
        // Get the Checkbox list to display 
        const checkBoxList = this.state.Category.map((option, index) => {
            return <CheckBox 
                        title={option.label}
                        checked={option.visible} 
                        key={index}
                        size={20}
                        onPress={() => this.checkMe(index)}
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
                    <Button />
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