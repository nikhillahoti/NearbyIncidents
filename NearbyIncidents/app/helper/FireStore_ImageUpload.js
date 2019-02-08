import firebaseConn from './FirebaseConnection';

import {Platform} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob'

import {ToastAndroid} from 'react-native';

const uploadImage = (uri, mime = 'application/octet-stream') => {
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        const sessionId = new Date().getTime();

        const Blob = RNFetchBlob.polyfill.Blob
        const fs = RNFetchBlob.fs
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
        window.Blob = Blob

        let uploadBlob = null;
        const imageRef = firebaseConn.storage().ref('attachments').child(`${sessionId}`);

        return fs.readFile(uploadUri, 'base64')
            .then((data) => {
                return Blob.build(data, { type:`${mime};BASE64`});
            })
            .then((blob) => {
                uploadBlob = blob;
                return imageRef.put(blob, {contentType: mime});
            })
            .then(() => {
                uploadBlob.close();
                return imageRef.getDownloadURL();
            })
            .catch((error) => {
                return error;
            })
}

export {
    uploadImage
}