import * as React from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { color } from '../Utility/Color';

const Input = ({ placeholder, value, onChangeText, secureTextEntry, onPress, loader }) => {
    return (
        <View>
            <View style={styles.mainView}>
                <TextInput style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor="#656F85"
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                />

            </View>
            <TouchableOpacity disabled={loader ? true : false} onPress={onPress}
                style={{
                    marginLeft: 'auto',
                    marginRight: '4%',
                    marginTop: -45,
                }}>
                {loader ?
                    <ActivityIndicator style={{ marginRight: '5%', marginTop: -18, height: 75 }} size="small" color={color.blueColor} />
                    :
                    <Image
                        style={styles.urlNavigateImg}
                        resizeMode='stretch'
                        source={require('../images/nextLevel.png')}
                    />
                }
            </TouchableOpacity>
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    mainView: {
        width: '90%',
        borderColor: '#00000011',
        borderWidth: 1,
        borderRadius: 35,
        alignSelf: 'center',
        backgroundColor: '#F6F9FF',
        flexDirection: 'row',

    },
    input: {
        height: 50,
        width: '82%',
        borderColor: '#00000011',
        // borderWidth: 1,
        borderRadius: 35,
        paddingHorizontal: 5,
        fontSize: 14,
        color: '#656F85',
        fontFamily: 'GilroyMedium',
        backgroundColor: '#F6F9FF',
        paddingHorizontal: 20,
        textAlign:'left'
    },
    urlNavigateImg: {
        height: 57,
        width: 57,

    }
})