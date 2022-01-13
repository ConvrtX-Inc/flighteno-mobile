import { StyleSheet } from "react-native";
import { colors } from "react-native-elements";
import { color } from "../../../Utility/Color";


export const styles = StyleSheet.create(
    {
    container:{
        marginLeft:16,
        marginRight:16
    },
    titleTxt:{
        fontSize:26,
        fontWeight:'bold'
    },
    idPicture: {
        width:212,
        height:175
    },
    idContainer:{
        flex:1,
        backgroundColor:color.lightGrayColor,
        alignItems:'center',
        padding:16,
        borderRadius:16,
        borderWidth:1,
        borderColor:color.inputBorderColor,
        marginTop:8
    },
    inputLabel:{
        fontSize:14,
        fontWeight:'bold'
    },
    frontPicTxt: {
        
    },
    backPicTxt: {
        marginTop:32
    }
})