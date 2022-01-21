import { Dimensions, StyleSheet } from "react-native";
import { color } from "../../../Utility/Color";

const windowWidth = Dimensions.get('window').width

export const styles = StyleSheet.create({
    body:{
        // ...StyleSheet.absoluteFill,
        flex:1,
        backgroundColor:color.blackColor,
        // flex:1,
        // justifyContent:'center'
    },
    content:{
      height:392,
      backgroundColor:color.backgroundColor,
      overflow:'hidden'
    },
    container:{
        marginLeft:16,
        marginRight:16,
        flexDirection:'column',
        flexGrow:1,
        justifyContent:'center',
        flex:1
    },
    cameraFrame:{
        width:windowWidth-24,
        height:251,
        resizeMode:'center',
      
    },
    txtCameraTitle:{
        fontWeight:'bold',
        fontSize:20,
        textAlign:'center',
        color:color.backgroundColor
    },
    txtCameraDesc:{
        fontSize:14,
        fontWeight:'600',
        textAlign:'center',
        color:color.backgroundColor
    },
    btnContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:16,
        marginTop:24
    },
    cameraImg: {
        width:32,
        height:32
    },
    sendImg:{
        width:21,
        height:21
    },
    btnWrapper:{
        flex:1,
    }
})