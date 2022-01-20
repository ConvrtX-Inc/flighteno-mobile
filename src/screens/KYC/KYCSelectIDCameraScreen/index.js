import React, {useRef} from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { color } from '../../../Utility/Color';
import { styles } from './styles';

export default function KYCSelectIDCameraScreen (){

    const cameraRef = useRef()

    const cameraImg = require('../../../images/switchCamera.png')
    const sendImg = require('../../../images/sendWhite.png')
    const cameraPressImg = require('../../../images/cameraPress.png')

    return (
        <View style={styles.body}>

            <View style={styles.btnContainer}>
                <View style={[styles.btnWrapper, {alignItems:'flex-start',marginLeft:18}]}>
                   <Image source={cameraImg} style={styles.cameraImg} />
                </View>
                <View style={[styles.btnWrapper, {alignItems:'flex-end', marginRight:18}]}>
                    <Image source={sendImg} style={styles.sendImg} />
                </View>
            </View>
            
            <View style={styles.content}>
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
                    type='front'
                >

                    <View style={{...StyleSheet.absoluteFill}}>

                        <View style={styles.container}>
                            <View style={{flex:1}}>
                               {/* Place picture frame here */}
                            </View>
                        </View>

                        <View style={{paddingBottom:32,paddingTop:24, backgroundColor:'rgba(67,67,67,0.8)'}}>
                            <Text style={styles.txtCameraTitle}>Permanent Resident Card(Front)</Text>
                            <Text style={styles.txtCameraDesc}>-Place your ID within the frame</Text>
                            <Text style={styles.txtCameraDesc}>-Please make sure it is clear and has no glare</Text>
                        </View>
                    </View>
                </RNCamera>
            </View>

            <View style={{alignItems:'center', marginTop:40}}>
                <Image source={cameraPressImg} style={{width: 84, height:84}} />
            </View>

          

        </View>
    )
}