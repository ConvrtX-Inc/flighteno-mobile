import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';

export default UploadProgressBar = ({uploadedCount, images, videos, containerStyle, textStyle, transferred, progressBarWidth}) => {
    const imgLen = images != undefined ? images.length : 0;
    const vidLen = videos != undefined ? videos.length : 0;
    const totalLen = imgLen + vidLen;
    return (
        <View style={containerStyle}>
            <Text style={textStyle}>
                Uploading {uploadedCount}/{totalLen}
            </Text>                        
            <Progress.Bar progress={transferred} width={progressBarWidth} />
        </View>
    );
}