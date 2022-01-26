import { StyleSheet } from "react-native";
import { color } from "../../../Utility/Color";


export const styles = StyleSheet.create(
    {
    container:{
        marginLeft:16,
        marginRight:16,
        flex:1,
    },
    titleTxt:{
        fontSize:26,
        marginTop:36  
    },
    idTypeTxt:{
        marginTop:16
    },
    idPicture: {
        width:212,
        height:175
    },
    stepIndicator:{
        marginTop:16
    },
    idContainer:{
        flex:1,
        backgroundColor:color.lightGrayColor,
        alignItems:'center',
        padding:16,
        borderRadius:16,
        borderWidth:1,
        borderColor:color.lightGrayColor,
        marginTop:8
    },
    
    inputLabel:{
        fontSize:14,
    },
    idNoField:{
        marginTop:32
    },
    inputIdNo:{
        marginTop:8
    },
    frontPicTxt: {
        marginTop:50
    },
    backPicTxt: {
        marginTop:32
    },
    dropDown:{
        borderColor:color.lightGrayColor,
        borderRadius:100,
        marginTop:8,
        backgroundColor:color.lightGrayColor,
       
    },
    dropDownContainer: {
        borderColor:'transparent',  
       
    },
    btnNext: {
        marginTop:24,
        marginBottom:24
    }
})