import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native'
import TextBold from './atoms/TextBold';

const ButtonLarge = ({ title, onPress, font, loader=false, color = '#25A9D1' , height = 55 }) => {

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={onPress}
            disabled={loader ? true : false}
            style={[styles.buttonStyle, {backgroundColor: color,height: height}]}>

            {loader == false ?
                <TextBold style={{ textAlign: "center", fontSize: 16, color: "#fff" }}>{title}</TextBold>
                :
                <ActivityIndicator size="small" color="#fff" />
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: "#25A9D1",
      
        width: '89%',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 35,
        elevation: 10
    },
    buttonTitleStyle: {
        textAlign: "center",
     
        fontSize: 16,
        color: "#fff"
    },
})

export default ButtonLarge;