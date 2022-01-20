import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container:{
        marginLeft:16,
        marginRight:16,
        flex:1,
        flexDirection:'column',
        flexGrow:1,
    },
    content:{
        flex:1,
    },
    titleTxt:{
        fontSize:26,
        fontWeight:'bold',
        marginTop:36  
    },
    stepsIndicator: {
        marginTop: 16
    },
    desc:{
       fontSize:16,
       textAlign:'center',
       marginTop:26
    },
    accountVerImg:{
        width:343,
        height:343,
        marginTop:16
    },
    btnSubmit:{
        marginBottom: 24,
        marginTop:40
    }
})