import React, { useState } from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import TextBold from '../../../components/atoms/TextBold';
import ImageEditor from "@react-native-community/image-editor";

export default function KYCTestScreen({navigation, route}){

    const windowWidth = Dimensions.get('window').width
    const [imgUrl, setImgUrl] = useState('https://picsum.photos/200')

    const onImageCrop = () => {

        const cropData = {
            offset: {x: 365, y: 0},
            size: {width: windowWidth, height: windowWidth},
        };
        
        ImageEditor.cropImage(imgUrl,cropData).then((result) => {
            setImgUrl(result)
        })

        // ImageEditor.cropImage(imgUrl,cropData).then((url) => {
        //     // setImgUrl(url)
        //     console.log(url)
        // })
        
    }
    
    return (
        <View>
            <Image source={{uri:imgUrl}} style={{width:windowWidth, height:windowWidth}} />
            <TextBold>Test</TextBold>

            <TouchableOpacity onPress={onImageCrop}>
                <TextBold>Crop </TextBold>
            </TouchableOpacity>
        </View>
    )
}