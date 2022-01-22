import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { color } from '../Utility/Color';
import TextBold from './atoms/TextBold';

const ButtonWithImage = ({ img, title, onPress, loader }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={onPress}
            disabled={loader ? true : false}
            style={styles.buttonStyle}>

            <Image
                style={styles.tinyLogo}
                source={img}
            />
            <TextBold style={{ textAlign: "center",  fontSize: 14,  color: color.splashTextColor }}>{title}</TextBold>
            {loader ?
                <ActivityIndicator size="small" color={color.lightBlue} />
                : null}


        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#fff',
        height: 55,
        width: '89%',
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        borderRadius: 35,
        borderColor: '#F0F0F0',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
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

export default ButtonWithImage;