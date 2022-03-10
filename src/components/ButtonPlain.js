import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { color } from '../Utility/Color';
import TextBold from './atoms/TextBold';

const ButtonPlain = ({  title, onPress, loader,color ,   textColor,borderColor }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={onPress}
            disabled={loader ? true : false}
            style={[styles.buttonStyle, {
                 backgroundColor:color || '#fff',
                 color:textColor , 
                 borderColor: borderColor || '#F0F0F0' }]}>
 
            <TextBold style={{ textAlign: "center",  fontSize: 14,  color: textColor }}>{title}</TextBold>
            {loader ?
                <ActivityIndicator size="small" color={color.lightBlue} />
                : null}


        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#fff',
        
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        borderRadius: 35,
        borderColor: '#F0F0F0',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12
    },
    buttonTitleStyle: {
        textAlign: "center",
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 16,
        color: '#000000',
    },
    tinyLogo: {
        width: 27,
        height: 27,
        // marginRight: '12%'

    },
})

export default ButtonPlain;