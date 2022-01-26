import React, {useRef, useState} from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';
import TextBold from '../../../components/atoms/TextBold';
import TextMedium from '../../../components/atoms/TextMedium';
import { color } from '../../../Utility/Color';
import { styles } from './styles';

export default function KYCSelectIDCameraScreen ({navigation,route}){

    const cameraRef = useRef()

    const cameraImg = require('../../../images/switchCamera.png')
    const sendImg = require('../../../images/sendWhite.png')
    const cameraPressImg = require('../../../images/cameraPress.png')
    const cameraFrameImg = require('../../../images/cameraFrame.png')

    const isFrontID = route.params.isFront

    const [photo,setPhoto] = useState('')
    const [isRetake, setRetake] = useState(true)

    const [type,setType] = useState('back')
    

    const onSwitchTap = () => {
        if(type === 'front'){
            setType('back')
        }
        if(type === 'back'){
            setType('front')
        }
    }

    const takePicture = async () => {
        if(cameraRef.current){
            const options = { quality: 0.5, base64: true, skipProcessing: true };
            const data = await cameraRef.current.takePictureAsync(options)
            const source = data?.uri

            setPhoto(source)
        }

        setRetake(false)
    }

    const onRetakeTap = () => {
        setRetake(true)
        setPhoto('')
    }

    const onSendTap = () => {

        if(isFrontID){
            navigation.navigate('KYCSelectID', {frontImg:  photo})
        }else{
            navigation.navigate('KYCSelectID', {backImg: photo})
        }
       
    }

    return (
        <View style={styles.body}>

            <View style={styles.btnContainer}>
                {isRetake ?
                   <TouchableOpacity onPress={onSwitchTap} style={[styles.btnWrapper, {alignItems:'flex-start',marginLeft:18}]}>
                        <Image source={cameraImg} style={styles.cameraImg} />
                   </TouchableOpacity>:null
                }
              
                <TouchableOpacity style={[styles.btnWrapper, {alignItems:'flex-end', marginRight:18}]} onPress={onSendTap}>
                   <Image source={sendImg} style={styles.sendImg} />
                </TouchableOpacity>
            </View>
            

            <View style={styles.content}>
                {isRetake ?
                    <RNCamera 
                        ref={cameraRef}
                        style={{...StyleSheet.absoluteFill}} 
                        captureAudio={false}
                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        type={type}
                
            >
                <View style={{...StyleSheet.absoluteFill}}>
                    <View style={styles.container}>
                        <Image source={cameraFrameImg} style={styles.cameraFrame} />
                    </View>

                    <View style={{paddingBottom:32,paddingTop:24, backgroundColor:'rgba(67,67,67,0.8)'}}>
                        <TextBold style={styles.txtCameraTitle}>Permanent Resident Card {isFrontID ? "(Front)" : "(Back)"} </TextBold>
                        <TextMedium style={styles.txtCameraDesc}>-Place your ID within the frame</TextMedium>
                        <TextMedium style={styles.txtCameraDesc}>-Please make sure it is clear and has no glare</TextMedium>
                    </View>
                </View>
            </RNCamera>
                :
                <Image source={{uri: photo}} style={{flex:1}}/>
                }
                
            </View>
            
            {isRetake ?
            <TouchableOpacity onPress={takePicture}>
                <View style={{alignItems:'center', marginTop:40}}>
                    <Image source={cameraPressImg} style={{width: 84, height:84}} />
                </View>
            </TouchableOpacity>
            :
            <TouchableOpacity style={{marginTop:40}} onPress={onRetakeTap}>
                <Text style={{color:color.backgroundColor, textAlign:'center', fontSize:18}}>Retake</Text>
            </TouchableOpacity> 
            }
           
          

        </View>
    )
}