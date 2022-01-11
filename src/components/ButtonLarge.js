import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native'

const ButtonLarge = ({ title, onPress, font, loader, color = '#25A9D1' }) => {

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={onPress}
            disabled={loader ? true : false}
            style={[styles.buttonStyle, {backgroundColor: color}]}>

            {loader == false ?
                <Text style={{ textAlign: "center", fontFamily: font, fontSize: 16, color: "#fff" }}>{title}</Text>
                :
                <ActivityIndicator size="small" color="#fff" />
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: "#25A9D1",
        height: 55,
        width: '89%',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 35,
        elevation: 10
    },
    buttonTitleStyle: {
        textAlign: "center",
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 16,
        color: "#fff"
    },
})

export default ButtonLarge;