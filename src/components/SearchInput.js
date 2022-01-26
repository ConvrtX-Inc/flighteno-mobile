import * as React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from '../Utility/Color';
import Icon1 from 'react-native-vector-icons/Feather'

const SearchInput = ({ placeholder, value, onChangeText }) => {
    return (
        <View style={{ alignSelf: 'center', width: '90%', flexDirection: 'row', marginVertical: 20 }}>
            <TextInput
                style={Styles.searchInput}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
            />
            <View style={Styles.searchIcon}>
                <Icon1 name="search" size={26} color={color.skipTextColor} />
            </View>
        </View>
    );
}

export default SearchInput;

const Styles = StyleSheet.create({
    searchInput: {
        height: 50,
        width: '85%',
        borderColor: '#00000011',
        borderWidth: 1,
        borderTopLeftRadius: 35,
        borderBottomLeftRadius: 35,
        paddingLeft: 20,
        fontSize: 14,
        color: '#656F85',
        fontFamily: 'GilroyRegular',
        backgroundColor: color.inputBackColor,
        borderRightWidth: 0
    },
    searchIcon: {
        height: 50,
        width: '15%',
        borderTopRightRadius: 35,
        borderBottomRightRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.inputBackColor,
        borderColor: '#00000011',
        borderWidth: 1,
        borderLeftWidth: 0
    },
})