import * as React from 'react';
import { TextInput, StyleSheet, Platform, View } from 'react-native';

const Input = ({ placeholder, value, onChangeText, secureTextEntry}) => {
    return (
            <TextInput 
                placeholder={placeholder}
                placeholderTextColor = "#656F85"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                multiline
                numberOfLines={5}
                style={styles.input}
            
            />
    );
}

export default Input;

const styles = StyleSheet.create({
    input: {
        backgroundColor:'#F6F9FF',
        padding:16,
        // minHeight: 50,
        // width: '100%',
        // borderColor: '#00000011',
        // borderWidth: 1,
        borderRadius: 22,
        paddingTop:0,   
        // alignSelf: 'center',
        // // paddingHorizontal: 5,
        // // paddingVertical:16,
        // padding:16,
        // fontSize: 14,
        color: '#656F85'
        // fontFamily: Platform.OS =='ios' ? 'Gilroy-Regular' : 'GilroyRegular',
        // backgroundColor: '#F6F9FF',
        // paddingHorizontal: 20,
        // textAlignVertical: 'top',
        // textAlign:'left'
    }
})