import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { color } from '../Utility/Color';

const InputText = ({maxLength,placeholder, value, onChangeText, secureTextEntry, editable, keyboardType, style}) => {
    return (
        <TextInput 
            style={[styles.input, style]}
            placeholder={placeholder}
            placeholderTextColor = "#656F85"
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            editable={editable}
            keyboardType={keyboardType ? "phone-pad" : "default"}
            maxLength={maxLength}
        />
    );
}

export default InputText;

const styles = StyleSheet.create({
    input: {
        height: 50,
        borderColor: '#00000011',
        borderWidth: 1,
        borderRadius: 35,
        alignSelf: 'center',
        paddingHorizontal: 5,
        fontSize: 14,
        color: '#656F85',
        fontFamily: 'Gilroy-Regular',
        backgroundColor: color.inputBackColor,
        paddingHorizontal: 20,
        width:'100%'
    }
})