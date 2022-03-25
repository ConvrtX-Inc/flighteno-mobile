import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native'
import TextBold from './atoms/TextBold';

const ButtonVerify = ({ title, onPress, font, loader }) => {

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={onPress}
            style={styles.buttonStyle}>

            {loader == false ?
                // <Text style={{ textAlign: "center", fontFamily: font, fontSize: 16, color: "#36C5F0" }}>{title}</Text>
                <TextBold>{title}</TextBold>
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
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 35,
        borderColor: '#25A9D1',
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

export default ButtonVerify;