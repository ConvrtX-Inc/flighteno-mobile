import * as React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from '../Utility/Color';

const Input = ({ placeholder, value, onChangeText, secureTextEntry, editable, keyboardType}) => {
    return (
        <TextInput style={styles.input}
            placeholder={placeholder}
            placeholderTextColor = "#656F85"
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            editable={editable}
            keyboardType={keyboardType ? "phone-pad" : "default"}
        />
    );
}

export default Input;

const styles = StyleSheet.create({
    input: {
        height: 50,
        width: '90%',
        borderColor: '#00000011',
        borderWidth: 1,
        borderRadius: 35,
        alignSelf: 'center',
        paddingHorizontal: 5,
        fontSize: 14,
        color: '#656F85',
        fontFamily: 'OpenSans-Regular',
        backgroundColor: color.inputBackColor,
        paddingHorizontal: 20
    }
})