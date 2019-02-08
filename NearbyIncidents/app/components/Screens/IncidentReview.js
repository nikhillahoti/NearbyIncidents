import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator,
    ToastAndroid
} from 'react-native';

import blue from './../../styles/colors';

import eventsObj from './../../helper/Firebase_Events';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {uploadImage} from './../../helper/FireStore_ImageUpload';

import ImagePicker from 'react-native-image-picker';

class IncidentReview extends Component {
    
    state = {
        attachments: [],
        imageOptions: {
            title: 'Please select the attachment',
            takePhotoButtonTitle: 'Camera',
            chooseFromLibraryButtonTitle: 'Gallery'
        },
        showActivityIndicator: false
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <Text style={styles.headerTitle}>Confirm</Text>,
        }
    }

    getImage = (type) => {
        switch(type){
            case "Medical":
                return <MaterialIcons 
                            size={70}
                            name="local-hospital"
                            color={'red'}
                        />

            case "Traffic":
                return <EntypoIcons 
                            size={70}
                            name="traffic-cone"
                            color={'orange'}
                        />
            
            case "Fire":
                return <SimpleLineIcons 
                            size={70}
                            name="fire"
                            color={'orange'}
                        />

            case "Police":
                return <Image 
                            style={styles.imageStyle}
                            source={require('./../../assets/images/PoliceIcon.png')}
                        />

            case "Utility":
                return <Image 
                            style={styles.imageStyle}
                            source={require('./../../assets/images/UtilityIcon.png')}
                        />

            default:
                return <FontAwesome 
                            size={70}
                            name="rss"
                            color={'yellow'}
                        />
        }
    }

    handlePress = async () => {
        this.setState({showActivityIndicator: true})
        let data = this.props.navigation.state.params.data;

        if (!(this.state.attachments === undefined || this.state.attachments.length == 0)){
            let attachmentsURL = []
            const lstAttachments = this.state.attachments;
            
            let lstUrl = [];
            for(let i = 0 ; i < lstAttachments.length ; i++){
                lstUrl.push(await uploadImage(lstAttachments[i].uri));
                ToastAndroid.show("finished uploading file " + i, ToastAndroid.SHORT);
            }
            
            data["Attachments"] = {};
            for(let i = 0 ; i < lstUrl.length ; i++){
                data.Attachments["" + i] = lstUrl[i];
            }
        }

        eventsObj.post(data)
            .then(() => {
                this.setState({showActivityIndicator: false})
                this.props.navigation.navigate('TabNavigatorPage');
            });
    }

    AttachImageHandler = () => {
        ImagePicker.showImagePicker(this.state.imageOptions, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
              const source = { uri: response.uri };
          
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              this.setState({
                attachments: [...this.state.attachments, source],
                randomImage: source
              });
            }
        });
    }

    render() {
        let value = this.props.navigation.state.params.data;

        let attachments = this.state.attachments.map((elem) => {
            return (<View>
                        <Image 
                            source={elem}
                            style={{height: 60, width: 80, marginLeft: 10, marginRight: 10}}
                        />
                   </View>);

        })

        const icon = this.getImage(value.type);
        return (
            <ScrollView pointerEvents={this.state.showActivityIndicator ? 'none' : 'auto'}>
            <View style={styles.container}>
                <View style={{ marginTop: 40 }}/>
                {icon}
                <Text style={styles.type}>{value.type}</Text>

                <View style={{borderBottomColor: 'grey', borderBottomWidth: 1, marginTop: 10, marginBottom: 10, width: '90%'}}/>

                <Text style={styles.lbl}>{"Details"}</Text>
                <Text style={styles.details}>{value.info.primaryinfo}</Text>
                {value.info.secondaryinfo !== "" && <Text style={styles.details}>{value.info.secondaryinfo}</Text>}

                <View style={{borderBottomColor: 'grey', borderBottomWidth: 1, marginTop: 20, marginBottom: 10, width: '90%'}}/>

                <Text style={styles.lbl}>{"Location"}</Text>
                <Text style={styles.details}>{value.info.location.detailed.formatted_address}</Text>

                <View style={{borderBottomColor: 'grey', borderBottomWidth: 1, marginTop: 20, marginBottom: 10, width: '90%'}}/>

                <Text style={styles.lbl}>{"Attachments"}</Text>
                <View style={styles.imageContainer}>
                    <TouchableOpacity 
                        style={styles.btnAdd}
                        onPress={() => 
                            this.AttachImageHandler()
                            }>
                        <MaterialIcons 
                            name="add-circle"
                            size={44}
                            color={blue} 
                        />
                    </TouchableOpacity>
                    <ScrollView 
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {attachments}
                    </ScrollView>
                </View>

                <View style={{borderBottomColor: 'grey', borderBottomWidth: 1, marginTop: 20, marginBottom: 10, width: '90%'}}/>

                {this.state.showActivityIndicator && <ActivityIndicator 
                    size="large"
                    color={blue}
                />}
                <TouchableOpacity
                    style={styles.btnContainer}      
                    onPress={this.handlePress}    
                >
                    <Text style={styles.btnSubmit}>{"Submit"}</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        fontSize: 17,
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginRight: 15
    },
    imageStyle: {
        width: 80,
        height: 60,
        resizeMode: 'stretch'
    },
    type: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        margin: 10
    },
    details:{
        fontSize: 15,
        color: '#606060',
        margin: 10
    },
    btnContainer: {
        backgroundColor: blue,
        width: 100,
        height: 30,
        paddingTop: 5,
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
        alignSelf: 'center'
    },
    btnSubmit: {
        color: '#fff',
        textAlign: 'center'
    },
    lbl: {
        fontWeight: 'bold',
        fontSize: 16,
        color: blue
    },
    imageContainer:{
        flexDirection: 'row',
        marginTop: 20
    },
    btnAdd: {
        opacity: 1
    }
});

export default IncidentReview;