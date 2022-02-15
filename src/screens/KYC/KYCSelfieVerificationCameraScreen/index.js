import React, { useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import {RNCamera, FaceDetector} from 'react-native-camera';
import StepsIndicator from '../../../components/StepsIndicator';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { styles } from './styles';
import TextBold from '../../../components/atoms/TextBold';
import TextMedium from '../../../components/atoms/TextMedium';
import { imgToBase64 } from '../../../Utility/Utils';
import { useTranslation } from 'react-i18next';


export default function KYCSelfieVerificationCameraScreen({navigation, route}){

    const cameraRef = useRef()
    const [canDetectFaces,setCanDetectFaces] = useState(false)
    const [cameraProgress, setCameraProgress] = useState(0)
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

                imgToBase64(source).then((data) => {
                    kyc.profile_image = data
                })
                
                navigation.navigate('KYCFillOut',{ kyc:kyc })
               
            }
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                <TextBold style={styles.titleTxt}>{t('kyc.selfieVer')}</TextBold>

                <View  style={styles.stepsIndicator}>
                    <StepsIndicator currentPosition={2}/>
                </View>

                <View style={styles.scanContainer}>
                    <TextBold style={styles.scanTxt}>{t('kyc.scanFace')}</TextBold>
                    <TextMedium style={styles.blinkTxt}>{t('kyc.pleaseBlink')}</TextMedium>

                    <View style={styles.cameraView}>
                        <AnimatedCircularProgress
                            size={313}
                            width={6}
                            fill={cameraProgress}
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
                                            navigation.navigate('KYCFillOut', {kyc:kyc })
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
    )
}