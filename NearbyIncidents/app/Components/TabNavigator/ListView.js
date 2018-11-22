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

import {
    NavigationActions,
    withNavigation
} from 'react-navigation'

class ListView extends Component {
    render(){
        // Have to add code to call the details View
        let RecordListt = this.props.screenProps.events.map((rec, i) => {
            return (<View key={i}>
                        <TouchableOpacity onPress={() => this.props.screenProps.navigation.navigate('IncidentDetailPage', {record: rec})}>
                            <SingleRecord record={rec} />
                        </TouchableOpacity>
                        <View style={styles.recView} />
                    </View>)
        });
        return (
            <View style={styles.containerMain}>
                <ScrollView style={styles.containerScrollView}>
                    {RecordListt}
                </ScrollView>
                <TouchableOpacity 
                    onPress={() => this.props.screenProps.navigation.navigate('AddIncidentPage', {screenProps: this.props.screenProps})}>
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
    containerMain: {
        height: '100%',
        width: '100%'
    },
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

export default withNavigation(ListView);