import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    titleTxt:{
        fontSize:26,
        fontWeight:'bold',
        marginTop:36  
    },
    container:{
        marginLeft:16,
        marginRight:16,
    },
    textField: {
        marginTop:32
    },
    stepsIndicator:{
        marginTop:16
    },
    inputLabel:{
        fontSize:14,
        fontWeight:'bold'
    },
    inputTxt: {
        marginTop:8
    },
    btnSubmit:{
        marginTop:24,
        marginBottom:24
    },
    //country number style
    phoneContainer: {
       height: 55,
       borderColor: '#00000011',
       borderWidth: 1,
       width:'100%',
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
})