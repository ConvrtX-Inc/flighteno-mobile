import * as React from 'react';
import { TextInput, StyleSheet, Platform } from 'react-native';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from '../Utility/Color';

const Input = ({ placeholder, value, onChangeText, secureTextEntry, editable, keyboardType, numLines, onChange, onEndEditing}) => {
    return (
        <TextInput style={styles.input}
            placeholder={placeholder}
            // placeholderTextColor = {editable ? "#656F85" : '#CDCDCD'}
            placeholderTextColor = {"#656F85"}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            editable={editable}
            keyboardType={keyboardType ? "phone-pad" : "default"}
            numberOfLines={numLines}
            onChange={onChange}
            onEndEditing={onEndEditing}
        />
    );
}

export default Input;

const styles = StyleSheet.create({
    input: {
        // height: 50,
        width: '100%',
        borderColor: '#00000011',
        borderWidth: 1,
        borderRadius: 35,
        alignSelf: 'center',
        padding:18,
        paddingHorizontal: 5,
        fontSize: 14,
        color: '#656F85',
        fontFamily: Platform.OS == 'ios' ? 'Gilroy-Medium': 'GilroyMedium',
        backgroundColor: color.inputBackColor,
        paddingHorizontal: 20,
        textAlign:'left',
        overflow:'hidden'
    }
})