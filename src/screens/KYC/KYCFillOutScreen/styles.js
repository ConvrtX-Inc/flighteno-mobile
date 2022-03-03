
import {
    Platform,
    StyleSheet
} from "react-native";

export const styles = StyleSheet.create({
    titleTxt: {
        fontSize: 26,
        marginTop: 36
    },
    container: {
        marginLeft: 16,
        marginRight: 16,
    },
    textField: {
        marginTop: 32
    },
    stepsIndicator: {
        marginTop: 16
    },
    inputLabel: {
        fontSize: 14
    },
    inputTxt: {
        marginTop: 8,
        fontFamily:Platform.OS == 'ios' ? 'Gilroy-Medium' : 'GilroyMedium'
    },
    btnSubmit: {
        marginTop: 24,
        marginBottom: 24
    },
    //country number style
    phoneContainer: {
        height: 55,
        borderColor: '#00000011',
        borderWidth: 1,
        width: '100%',
        borderRadius: 35,
        backgroundColor: "#F6F9FF"
    },
    phoneInput: {
        height: 40,
        borderRadius: 16,
        backgroundColor: "#F6F9FF",
        color: '#707070',
        fontFamily: 'Gilroy-Regular',
        fontSize: 16,
        borderBottomColor: '#E6E6E6',
        borderBottomWidth: 1,
    },
    phoneTextContainer: {
        backgroundColor: "#F6F9FF",
        borderRadius: 35
    },
    phoneCodeText: {
        height: 25,
        backgroundColor: "#F6F9FF",
        color: '#707070'
    },
    //////////////////////////Picker Creation start///////////////////////
    pickerVIew: {
        height: 50,
        borderColor: '#00000011',
        borderWidth: 1,
        borderRadius: 35,
        alignSelf: 'center',
        paddingHorizontal: 5,
        fontSize: 14,
        color: '#656F85',
        fontFamily: 'OpenSans-Regular',
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