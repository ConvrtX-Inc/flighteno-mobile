import { Dimensions, StyleSheet } from "react-native";
import { color } from "../../../Utility/Color";

const windowWidth = Dimensions.get('window').width

export const styles = StyleSheet.create({
    body:{
        ...StyleSheet.absoluteFill,
        backgroundColor:color.blackColor,
        // flex:1,
        justifyContent:'center'
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
        flex:1
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
        marginBottom:32,
        marginTop:-80
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