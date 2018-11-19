import React, {Component} from 'react';
import {
    ScrollView,
    Text,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SingleRecord from './SingleRecordView';

class ListView extends Component {
    render(){
        // Have to add code to call the details View
        let RecordListt = this.props.screenProps.events.map((rec, i) => {
            return (<View key={i}>
                        <TouchableOpacity onPress={() => console.log("Here")}>
                            <SingleRecord record={rec} />
                        </TouchableOpacity>
                        <View style={styles.recView} />
                    </View>)
        });
        return (
            <View>
                <ScrollView style={styles.containerScrollView}>
                    {RecordListt}
                </ScrollView>
                <TouchableOpacity 
                    onPress={() => console.log("Here")}>
                    <MaterialIcons 
                        name="add-circle"
                        size={60}
                        color='#3368FF'
                        style={styles.btnAdd}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    recView: {
        borderBottomColor: 'darkgrey',
        borderBottomWidth: 1,
        margin: 10,
        justifyContent: 'center'
    },
    containerScrollView: {
        marginTop: 5
    },
    btnAdd: {
        position: 'absolute',
        bottom: 10,
        right: 20,
        opacity: 1
    }
});

export default ListView;