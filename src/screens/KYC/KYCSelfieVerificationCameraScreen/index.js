import React, { useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import {RNCamera, FaceDetector} from 'react-native-camera';
import StepsIndicator from '../../../components/StepsIndicator';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { styles } from './styles';
import TextBold from '../../../components/atoms/TextBold';
import TextMedium from '../../../components/atoms/TextMedium';


export default function KYCSelfieVerificationCameraScreen({navigation}){

    const cameraRef = useRef()
    const [canDetectFaces,setCanDetectFaces] = useState(false)
    const [cameraProgress, setCameraProgress] = useState(0)

    const facesDetected = ({faces}) => {
        const rightEye = faces[0]?.rightEyeOpenProbability;
        const leftEye = faces[0]?.leftEyeOpenProbability;
        const bothEyes = (rightEye + leftEye) / 2;

        if(bothEyes <= 0.3){
            setCameraProgress(100)
         navigation.navigate('KYCSelfieVerificationCamera')
        }
      
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                <TextBold style={styles.titleTxt}>Selfie Verification</TextBold>

                <View  style={styles.stepsIndicator}>
                    <StepsIndicator currentPosition={2}/>
                </View>

                <View style={styles.scanContainer}>
                    <TextBold style={styles.scanTxt}>Scan your face</TextBold>
                    <TextMedium style={styles.blinkTxt}>Please Blink</TextMedium>

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