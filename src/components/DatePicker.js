import * as React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import TextMedium from './atoms/TextMedium';

const DatePickerField = ({onPress, date}) => {
    return (
        <>        
        <Pressable onPress={onPress}>
            <View style={styles.pickerVIew}>
                <View style={styles.pickerLeftView}>
                    <TextMedium style={styles.textSelected}>{date}</TextMedium>
                </View>
            <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    style={styles.datePickerIcon}
                    resizeMode='stretch'
                    source={require('../images/calendar.png')}
                />
            </View>
            </View>
        </Pressable>
        
      </>
    )
}

export default DatePickerField;

const styles = StyleSheet.create({
    pickerVIew: {
        height: 50,
        borderColor: '#00000011',
        borderWidth: 1,
        borderRadius: 35,
        alignSelf: 'center',
        paddingHorizontal: 5,
        fontSize: 14,
        color: '#656F85',
        fontFamily: 'Gilroy-Regular',
        backgroundColor: '#F6F9FF',
        paddingHorizontal: 20,
        flexDirection: 'row'
    },
    pickerLeftView: {
        width: '92%',
        justifyContent: 'center',
    },
    textSelected: {
        fontSize: 14,
        color: '#656F85',
    },
    pickerIcon: {
        height: 11,
        width: 17
    },
    pickerOptions: {
        // height: 120,
        maxHeight: 130,
        width: '90%',
        alignSelf: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#F6F9FF',
        borderRadius: 10,
        marginTop: 5,
    },  
})