import RNFetchBlob from "rn-fetch-blob";

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