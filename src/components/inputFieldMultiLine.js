import * as React from 'react';
import { TextInput, StyleSheet, Platform } from 'react-native';
import { BackgroundImage } from 'react-native-elements/dist/config';

const Input = ({ placeholder, value, onChangeText, secureTextEntry}) => {
    return (
        <TextInput style={styles.input}
            placeholder={placeholder}
            placeholderTextColor = "#656F85"
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            multiline
            numberOfLines={5}

        />
    );
}

export default Input;

const styles = StyleSheet.create({
    input: {
        // height: 50,
        width: '90%',
        borderColor: '#00000011',
        borderWidth: 1,
        borderRadius: 22,
        alignSelf: 'center',
        paddingHorizontal: 5,
        fontSize: 14,
        color: '#656F85',
        fontFamily: Platform.OS =='ios' ? 'Gilroy-Regular' : 'GilroyRegular',
        backgroundColor: '#F6F9FF',
        paddingHorizontal: 20,
        textAlignVertical: 'top',
        textAlign:'left'
    }
})