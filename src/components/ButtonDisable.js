import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import TextBold from './atoms/TextBold';

const ButtonDisable = ({ title, onPress, font, loader }) => {

    return (
        <View
            activeOpacity={0.5}
            onPress={onPress}
            style={styles.buttonStyle}>

            {loader == false ?
                <TextBold style={{ textAlign: "center",  fontSize: 16, color: "#fff" }}>{title}</TextBold>
                :
                <ActivityIndicator size="small" color="#fff" />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: "#D4D4D4",
        height: 55,
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 35,
        // elevation: 10
    },
    buttonTitleStyle: {
        textAlign: "center",
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 16,
        color: "#fff"
    },
})

export default ButtonDisable;