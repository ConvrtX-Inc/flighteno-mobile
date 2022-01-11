import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { color } from '../Utility/Color';

const ButtonVerifyT = ({ title, onPress, font, loader }) => {

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={onPress}
            style={styles.buttonStyle}>

            {loader == false ?
                <Text style={{ textAlign: "center", fontFamily: font, fontSize: 16, color: color.travelerButtonColor }}>{title}</Text>
                :
                <ActivityIndicator size="small" color="#fff" />
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: "#FFF",
        height: 55,
        width: '89%',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 35,
        borderColor: color.travelerButtonColor,
        borderWidth: 1,
        // elevation: 10
    },
    buttonTitleStyle: {
        textAlign: "center",
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 16,
        color: "#36C5F0"
    },
})

export default ButtonVerifyT;