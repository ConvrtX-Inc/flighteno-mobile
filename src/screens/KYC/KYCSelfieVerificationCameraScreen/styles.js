import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        marginLeft:16,
        marginRight:16,
        flex:1,
    },
    titleTxt:{
        fontSize:26,
        marginTop:36  
    },
    scanTxt:{
        fontSize:26,
        marginTop:38,
        textAlign:'center'
    },
    blinkTxt:{
        fontSize:16,
        marginTop:26,
        textAlign:'center'
    },
    scanContainer:{
        flex:1, 
        alignItems:'center'
    },
    cameraView:{
        marginTop:24,
    },
    camera:{
        width:303,
        height:303, 
    }
})