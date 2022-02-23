import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import Constants from './Constants';

export function generateUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function formatAmount(amount){
    return '$' + parseFloat(amount).toFixed(2)
}


export function imgToBase64 (imgPath){
    return RNFetchBlob.fs.readFile(imgPath,'base64')
}

export const getPathForFirebaseStorage = async(uri) => {
    if (Platform.OS === 'ios')
    {
        return uri
    } 
    const stat = await RNFetchBlob.fs.stat(uri)
    return stat.path
}


/**
 * 
 * @param {Array} imageData 
 * @returns String
 * @see https://firebasestorage.googleapis.com/v0/b/flighteno-e0abd.appspot.com/o/rn_image_picker_lib_temp_3cd781c7-2f27-4a18-8a52-4115e0aede73.jpg?alt=media
 */
export const generateImagePublicURLFirebase = (filename) => {    
    return `${Constants.firebaseGoogleAPIsURL}${Constants.storageUrl}${Constants.storageUrlExt}${filename}?alt=media`;

}