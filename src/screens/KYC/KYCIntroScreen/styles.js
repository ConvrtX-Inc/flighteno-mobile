import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width

export const styles = StyleSheet.create({
    container:{
        marginLeft:16,
        marginRight:16,
        alignItems:'center', 
    },
    logoTxt:{
        width:162,
        height:38,
        marginTop:40
    },
    kycImage: {
        width:404,
        height:308,
        marginTop:36
    },
    title:{
        fontSize:26,
        fontWeight:'bold',
        textAlign:'center',
        marginTop:24,
    },
    desc:{
        fontSize:16,
        textAlign:'center',
        marginTop:16
    },
    btnGetStarted: {
        marginTop:72,
        width:windowWidth
    }
})