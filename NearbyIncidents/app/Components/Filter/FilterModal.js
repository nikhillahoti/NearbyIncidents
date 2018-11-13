import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity
} from 'react-native';

class FilterModal extends Component {
    render(){
        return (
            <Modal
                visible={this.props.modalVisible}
            >
                <View style={styles.myStyle}>
                    <TouchableOpacity
                        onPress={() => this.props.ToggleModal()}
                        style={styles.modalStyle}
                    >
                        <Text style={[styles.textStyle, styles.btnClose]}>X</Text>
                    </TouchableOpacity>
                </View> 
            </Modal>
            
        );
    }
}

const styles = StyleSheet.create({
    myStyle: {
        width: '90%',
        height: '90%',
        backgroundColor: 'rgba(0,0,0, 0.65)',
        alignSelf: 'center',
        margin: 20
    },
    textStyle: {
        color: 'red',
        padding: 10
    },
    btnClose: {
        fontSize: 24,
        textAlign: 'right',
        justifyContent: 'flex-end'
    },
    modalStyle: {
        alignSelf:'flex-end',
        padding: 10
    },
    btnclosecontainer: {
        alignSelf: 'flex-start',
        backgroundColor:'rgba(0,0,0, 0.65)',    
    }
});

export default FilterModal;