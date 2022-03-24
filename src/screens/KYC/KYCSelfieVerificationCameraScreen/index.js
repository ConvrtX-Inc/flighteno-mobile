import React, { useRef, useState } from 'react';
import { Platform, ScrollView, Text, View } from 'react-native';
import {RNCamera, FaceDetector} from 'react-native-camera';
import StepsIndicator from '../../../components/StepsIndicator';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { styles } from './styles';
import TextBold from '../../../components/atoms/TextBold';
import TextMedium from '../../../components/atoms/TextMedium';
import { generateImagePublicURLFirebase, generateUID, imgToBase64 } from '../../../Utility/Utils';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RNS3 } from 'react-native-aws3';
import storage from '@react-native-firebase/storage';

export default function KYCSelfieVerificationCameraScreen({navigation, route}){

    const cameraRef = useRef()
    const [canDetectFaces,setCanDetectFaces] = useState(false)
    const [cameraProgress, setCameraProgress] = useState(0)
    const [transferred, setTransferred] = useState('')
    const [uploadedCount, setUploadedCount] = useState('')
    const [userImage, setUserImage] = useState('')
    const { kyc } = route.params
    const {t} = useTranslation()

    const facesDetected = ({faces}) => {
        const rightEye = faces[0]?.rightEyeOpenProbability;
        const leftEye = faces[0]?.leftEyeOpenProbability;
        const bothEyes = (rightEye + leftEye) / 2;

        if(bothEyes <= 0.3){
            setCameraProgress(100)
            takePicture()
        }

      
    }

    const takePicture = async() => {
        if(cameraRef.current){
            const options = { quality: 0.5, base64: true, skipProcessing: true };
            const data = await cameraRef.current.takePictureAsync(options);
            const source = data.uri;

            if (source) {

                await cameraRef.current.pausePreview();

                uploadImgToFirebase(source)

                // navigation.navigate('KYCFillOut',{ kyc:kyc })
               
            }
        }
    }

    const uploadImgToFirebase = async (uri) => {
       
        let ctr = 0
        const filename = uri.substring(uri.lastIndexOf('/') + 1)
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://','') : uri
        const task = storage()
                .ref(`${filename}`)
                .putFile(`${uploadUri}`
                )

        task.on('state_changed', snapshot => {

            const percentUploaded = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) *100)
            
            setTransferred(percentUploaded)
            // setTransferred(Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 1000)
           
        })

    
        try {
            const resImg = await task
           
            const userImage = generateImagePublicURLFirebase(resImg.metadata.name)

            kyc.profile_image = userImage
            navigation.navigate('KYCFillOut',{ kyc:kyc })


            ctr++

        }catch(e){
            console.log('errooooorrrrr', e);
        }

    }

    return (
        <SafeAreaView style={{flex:1}}>
            
     
        <ScrollView style={styles.container}>
            <View>
                <TextBold style={[styles.titleTxt, {textAlign:'left'}]}>{t('kyc.selfieVer')}</TextBold>

                <View  style={styles.stepsIndicator}>
                    <StepsIndicator currentPosition={2}/>
                </View>

                <View style={styles.scanContainer}>
                    <TextBold style={[styles.scanTxt, {textAlign:'center'}]}>{t('kyc.scanFace')}</TextBold>
                    <TextMedium style={[styles.blinkTxt,  {textAlign:'center'}]}>{t('kyc.pleaseBlink')}</TextMedium>

                    <View style={styles.cameraView}>
                        <AnimatedCircularProgress
                            size={313}
                            width={6}
                            fill={transferred}
                            tintColor="#F2BA39"
                            backgroundColor="#CDCDCD"
                            >
                            {
                                (fill) => (       
                                    <RNCamera 
                                        ref={cameraRef}
                                        style={styles.camera} 
                                        captureAudio={false}
                                        androidCameraPermissionOptions={{
                                            title: 'Permission to use camera',
                                            message: 'We need your permission to use your camera',
                                            buttonPositive: 'Ok',
                                            buttonNegative: 'Cancel',
                                        }}
                                        type='front'
                                        faceDetectionClassifications={
                                            RNCamera.Constants.FaceDetection.Classifications.all
                                            ? RNCamera.Constants.FaceDetection.Classifications.all
                                            : undefined
                                        }
                                        onCameraReady={() => {
                                            console.log('camera ready')
                                            setCameraProgress(50)
                                            setCanDetectFaces(true)
                                        }}
                                        onPictureTaken={() => {
                                            // navigation.navigate('KYCFillOut', {kyc:kyc })
                                        }}
                                        // onFacesDetected={canDetectFaces ? facesDetected : null}
                                        onFacesDetected={canDetectFaces? facesDetected : null}
                                        onFaceDetectionError={error => console.log('FDError', error)}
                                    />
                                )
                            }
                        </AnimatedCircularProgress> 
                    </View>
                   
                   
                </View>
               
            </View>

        </ScrollView>
           </SafeAreaView>
    )
}