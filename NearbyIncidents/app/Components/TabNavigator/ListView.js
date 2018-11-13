import React, {Component} from 'react';
import {
    ScrollView,
    Text,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';

import SingleRecord from './../Records/SingleRecord';

class ListView extends Component {
    render(){
        let RecordListt = this.props.screenProps.events.map((rec, i) => {
            return (<View key={i}>
                        <TouchableOpacity onPress={() => console.log("Here" + key)}>
                            <SingleRecord record={rec} />
                        </TouchableOpacity>
                        <View style={styles.recView} />
                    </View>)
        });
        return (
            <ScrollView>
                {RecordListt}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    recView: {
        borderBottomColor: 'darkgrey',
        borderBottomWidth: 1,
        margin: 10,
        marginTop: 30,
        justifyContent: 'center'
    }
});

export default ListView;