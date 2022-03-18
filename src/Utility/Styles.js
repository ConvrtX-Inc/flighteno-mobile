
import { StyleSheet, Dimensions } from 'react-native';
import { color } from '../Utility/Color';


var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({

    //General Screen
    ScreenCss: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: color.backgroundColor,
    },

    /////////////////////////////////////Splash Screen Css//////////////////////////////////
    monoBarSplash: {
        flexDirection: 'row',
        marginTop: (windowWidth * 10) / 100,
        marginLeft: '5%',
        alignItems: 'center'
    },
    monoImg: {
        height: (windowWidth * 9.5) / 100,
        width: (windowWidth * 36) / 100,
    },
    splashText: {
        color: color.splashTextColor,
        fontSize: (windowWidth * 8.5) / 100,
        textAlign:'left'
    },
    splashTxtContainer: {
        marginLeft: '5%',
        marginTop: '4.5%',
    },
    skipText: {
        color: color.skipTextColor,
        fontSize: (windowWidth * 4) / 100,
        marginLeft: 'auto',
        marginRight: '5%',
    },
    nextImgContainer: {
        marginTop: '4%',
        width: (windowWidth * 28) / 100
    },
    nextImg: {
        height: (windowWidth * 28) / 100,
        width: (windowWidth * 28) / 100,
    },
    manImg: {
        height: (windowWidth * 90) / 100,
        width: (windowWidth * 85) / 100,
        marginTop: -(windowWidth * 15) / 100,
        alignSelf: 'center'
    },


    ///////////////////////////////////////Term and Condition Screen Css///////////////////////////////
    HeadingText: {
        color: color.splashTextColor,
        fontSize: (windowWidth * 7) / 100,
       
    },
    termContainer: {
        width: '100%',
        paddingHorizontal: '5%',
        marginTop: (windowWidth * 4) / 100
    },
    termText: {
        color: color.termTextColor,
        fontSize: (windowWidth * 3.8) / 100,
        opacity: 0.4,
        lineHeight: 22,
    },
    agreeTermContainer: {
        flexDirection: 'row'
    },
    termAgreeText: {
        color: color.splashTextColor,
        fontSize: 15
    },


    ////////////////////////////////////////Login Screen Css//////////////////////////////////////////////
    fbBtnContainer: {
        marginTop: (windowWidth * 10) / 100,
    },
    GmailBtnContainer: {
        marginTop: (windowWidth * 5) / 100,
    },
    loginInputHeading: {
        color: color.loginTextHeadingColor,
        fontSize: 15, 
    },
    textLarge: {
        color: color.loginTextHeadingColor,
        fontSize: 18,
    },
    bottomTxt: {
        flexDirection: 'row',
        marginTop: (windowWidth * 8) / 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20

    },

    ////////////////////////////////////////Register Screen Css//////////////////////////////////////////////
    backImg: {
        height: 20,
        width: 15,
        marginTop: (windowWidth * 8) / 100,
        // marginLeft: '5%',
    },
    //country number style
    phoneContainer: {
        height: 55,
        alignSelf: 'center',
        // width: '90%',
        borderColor: '#00000011',
        borderWidth: 1,
        // marginTop: 15,
        borderRadius: 35,
        // borderRadius: 16,
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

    ////////////////////////////////////////verify Phone Screen Css//////////////////////////////////////////////

    verifyPhonTxt: {

        color: color.verifyPhoneTextColor,
        fontSize: 15,
        marginLeft: "5%",


    },
    resentPassTxt: {
        color: '#000',
        textDecorationLine: 'underline',
        fontSize: 17,
      
        alignSelf: 'center'
    },
    otpInputSyle: {
        width: '80%',
        height: 50,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10
    },
    underlineStyleBase: {
        width: 45,
        height: 45,
        // borderRadius: 12,
        // borderWidth: 1,
        // borderColor: '#fff',
        borderWidth: 0,
        borderBottomWidth: 2.5,
        borderBottomColor: color.otpInputBottomBorderColor,
        backgroundColor: 'transparent',
        color: color.otpInputBottomBorderColor,
        fontFamily: 'Gilroy-Regular',
        fontSize: 20,
    },
    underlineStyleHighLighted: {
        borderColor: '#FFF',
    },


    ////////////////////////////////////////Select Profile Screen Css//////////////////////////////////////////////

    selectProfileHeader: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: '5%',
        marginTop: (windowWidth * 8) / 100,
    },
    SelectProfileHeaderFirst: {
        width: "70%",
        // paddingVertical: 10
    },
    SelectProfileHeaderSecond: {
        width: "30%",
        // paddingVertical: 10
    },
    selectProfileByImg: {

        height: 20,
        width: 15,

    },
    goodMorningTxt: {
        color: '#717171',
    },
    selectProfileH: {
        color: color.termTextColor,
        fontSize: (windowWidth * 5.5) / 100,
       
    },
    selectProfileImg: {

        height: 40,
        width: 40,
        marginLeft: 'auto',
        marginTop: -5,
        borderRadius: 30
    },
    buyerBGImg: {
        width: (windowWidth * 80) / 100,
        height: (windowWidth * 80) / 100,
        alignSelf: 'center',
        borderRadius: (windowWidth * 9) / 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        // backgroundColor: 'red',
        // elevation: 24,
        alignItems: 'center',

    },
    buyerTxtTop: {
        fontSize: 29,
        color: color.buyerTxtTopColor,
        marginTop: (windowWidth * 11) / 100,
    },
    buyerTxtBottom: {
        fontSize: 15.5,
        color: color.buyerTxtBottomColor,

    },
    bagImgBig: {
        height: (windowWidth * 52) / 100,
        width: (windowWidth * 46) / 100,
        marginLeft: -(windowWidth * 13) / 100,
        marginTop: (windowWidth * 5.5) / 100,
    },
    bagImgSmall: {
        height: (windowWidth * 35) / 100,
        width: (windowWidth * 28) / 100,
        marginTop: (windowWidth * 19) / 100,
    },
    treeImg: {
        height: (windowWidth * 60) / 100,
        width: (windowWidth * 60) / 100,
    },

    ////////////////////////////////////////Home Screen buyer Css//////////////////////////////////////////////
    menueImg: {
        height: (windowWidth * 9) / 100,
        width: (windowWidth * 7) / 100,

    },
    homeProfileImg: {

        height: 50,
        width: 50,
        marginLeft: 'auto',
        borderRadius: 25
    },
    locationImg: {
        height: (windowWidth * 4.5) / 100,
        width: (windowWidth * 3.3) / 100,
        marginTop: 2
    },
    dubaiTxt: {
        fontSize: 16
    },
    trendingListimg: {
        height: (windowWidth * 30) / 100,
        width: (windowWidth * 28) / 100,
        borderRadius: 12,
    },
    flagimg: {
        height: 20,
        width: 20,
    },
    countryName: {
        color: color.countrtTextColor,
        fontSize: 13
    },
    countryFlag: {
        color: color.countrtTextColor,
        fontSize: 15
    },


    ///////////////////////////////////////////////Product Manual Information//////////////////////////////////

    //////////////////////////Picker Creation start///////////////////////
    pickerVIew: {
        // height: 40,
        width: '100%',
        borderColor: '#00000011',
        borderWidth: 1,
        borderRadius: 35,
        alignSelf: 'center',
        // paddingHorizontal: 5,
        fontSize: 14,
        color: '#656F85',
        fontFamily: 'OpenSans-Regular',
        backgroundColor: '#F6F9FF',
        // paddingHorizontal: 20,
        flexDirection: 'row',
        overflow:'hidden'
    },
        pickerAndroidView: {
        // height: 40,
        // width: '100%',
        borderColor: '#00000011',
        borderWidth: 1,
        borderRadius: 35,
        // alignSelf: 'center',
        // paddingHorizontal: 5,
        // fontSize: 14,
        // color: '#656F85',
        // fontFamily: 'OpenSans-Regular',
        backgroundColor: '#F6F9FF'
        // // paddingHorizontal: 20,
        // flexDirection: 'row',
        // overflow:'hidden'
    },
    pickerLeftView: {
        width: '92%',
        // backgroundColor: 'pink', 
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

    //////////////////////////Picker Creation end///////////////////////
    fasterItemTxt: {
        fontSize: 16,
        color: '#555555'
    },
    sliderImg: {
        height: 25,
        width: 25,
    },
    sliderStyle: {
        // width: '90%',
        width:'100%',
        alignSelf: 'center',
        marginTop: 15,
        padding: 20
    },
    sliderTrackStyle: {
        height: 10,
        borderRadius: 30,
        backgroundColor: '#E76F51',

    },
    sliderThumbStyle: {
        height: 25,
        width: 25,
        backgroundColor: '#E76F51'
    },
    sliderTxtContainer: {
        width: "90%",
        height: 20,
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: -5,
    },
    sliderTxtContainerFirst: {
        width: '30%',
        height: 20,

    },
    sliderTxtContainerOther: {
        width: '28%',
        height: 20,

        justifyContent: 'center',
        alignItems: 'flex-end',

    },
    sliderTxtContainerSecond: {
        width: '14%',
        height: 20,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    sliderTxt: {
        color: '#656F85',
    },
    imgPickView: {
        height: 100,
        width: 100,
        backgroundColor: '#F6F9FF',
        // marginLeft: '5%',
        borderRadius: 25,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#B2B2B2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraImgStyle: {
        height: 35,
        width: 35,
    },
    imgPickShowStyle: {
        height: 100,
        width: 100,
        // backgroundColor: '#F6F9FF',
        borderRadius: 25,

    },
    datePickerIcon: {
        height: 18,
        width: 18
    },
    timePickerVIew: {
        height: 50,
        width: '40%',
        borderColor: '#00000011',
        borderWidth: 1,
        borderRadius: 35,
        fontSize: 14,
        color: '#656F85',
        fontFamily: 'Gilroy-Regular',
        backgroundColor: '#F6F9FF',
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityContainer: {
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row'
    },
    leftQuantityStyle: {
        width: "50%",
    },
    rightQuantityStyle: {
        width: "50%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityChange: {
        height: 42,
        width: 42,
        borderRadius: 30,
        backgroundColor: '#F6F9FF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    ////////////////////////////////////////////////////OrderDetail Screen///////////////////////////////////
    productImg: {
        height: (windowWidth * 58) / 100,
        width: (windowWidth * 90) / 100,
        alignSelf: 'center',
        borderRadius: (windowWidth * 3) / 100,
        marginTop: 28,
        marginBottom: 20,
    },
    subHeading: {
        fontSize: 17,
        width: (windowWidth * 90) / 100,
        marginHorizontal: '5%',
    },
    productDesc: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
    },
    productDescInerFirst: {

    },
    productDescInerSecond: {
        paddingHorizontal: 10
    },
    productAtrributeHead: {
        // fontWeight: 'bold'
    },
    productAtrribute: {
        color: color.countrtTextColor,
    },

    ////////////////////////////////////////////Select Country Screen//////////////////////////////////////////
    countryDropImg: {
        height: 6,
        width: 12,
        tintColor: '#656F85',
        marginRight: 10
    },
    vertyicalLine: {
        height: 27,
        width: 1,
        backgroundColor: '#656F8599',
        marginLeft: 10
    },
    countryNameCSS: {
        color: color.countrtTextColor
    },
    countryNameCSSContainer: {
        // backgroundColor: 'pink',
        width: '65%',
        marginLeft: '3%'

    },
    citySelect: {
        flexDirection: 'row',
        alignItems: 'center'
    },


    ////////////////////////////////////Genral Modal ////////////////////////////////////////
    centeredView: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        // marginTop: 22
    },
    modalView: {
        // margin: 20,
        backgroundColor: "white",
        // borderRadius: 20,
        padding: 30,
        // alignItems: "center",
        shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 5,
        height: '100%'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalCitySearchContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginTop: -10,
    },
    cityModalClose: {
        height: 20,
        width: 20
    },
    inputCityModal: {
        width: '80%',
        marginLeft: 10,
        fontSize: 16,
        color:'#111'
    },
    textSelectedCity: {
        fontSize: 16,
        color: '#000',
    },
    ordernumberStyle: {
        flexDirection: 'row',
        width: '100%',
        // backgroundColor: 'pink',
        // height: 20,
        paddingBottom: 10,
        borderBottomColor: "#00000088",
        borderBottomWidth: 1,
    },
    orderNumberIst: {
        width: '54%',
        marginLeft: '5%',
        // backgroundColor: 'pink',
        marginTop: (windowWidth * 6) / 100,

    },
    orderNumberSecond: {
        width: '36%',
        marginRight: '5%',
        // backgroundColor: 'grey',
        marginTop: (windowWidth * 6) / 100,
    },
    orderBillStyle: {
        flexDirection: 'row',
        width: '100%',
        // backgroundColor: 'pink',
        // height: 20,
        paddingBottom: 10,

    },
    billLeft: {
        width: '54%',
        marginLeft: '5%',
        // backgroundColor: 'pink',
        marginTop: (windowWidth * 4) / 100,
    },
    billRight: {
        width: '38%',
        marginRight: '5%',
        // backgroundColor: 'grey',
        marginTop: (windowWidth * 4) / 100,
    },

    //////////////////////////////////////////////////My Trips/////////////////////////////////////////////////////
    travelDateContainer: {
        flexDirection: 'row',
        width: '100%',
        // paddingHorizontal: '5%',
        marginTop: 30,
    },
    travelDateInner: {
        width: '50%',

        marginBottom: 20
    },
    travelClandericon: {
        height: 17,
        width: 17,
        marginRight: 5
    },
    travelDateText: {
        fontWeight: 'bold'
    },
    travelDateTitle: {
        marginBottom: 5,
        // fontWeight: 'bold'
    },
    travelList: {
        width: '100%',
        alignSelf: 'center',
        borderRadius: 12,
        borderColor: color.travelerListBorderColor,
        borderWidth: 1.5,
        marginBottom: 15
    },
    travelerListInnerView: {
        paddingTop: 15,
        paddingBottom: 20,
        paddingLeft: '8%',
        paddingRight: '5%',
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
    },
    travelListTitle: {
        fontSize: 15,
        color: color.travelerListTitle,
    },
    travelListValue: {
        fontSize: 17,
        // fontWeight: 'bold',
        color: color.backgroundColor
    },
    orderDestinationHeader: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 30,
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    filterButton: {
        height: 40,
        width: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        backgroundColor: color.filterButtoBackCOlor,
        borderRadius: 20
    },
    filterImage: {
        height: 20,
        width: 30,
        resizeMode: 'contain'
    },
    inboxChatScreen: { height: 70, width: 70, borderRadius: 70 / 2 },
    menuIcon: {
        height: 27,
        width: 27
    },
    menuItem: {
        height: 40,
        width: '90%',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    menuItemText: {
        fontSize: 16,
        color: color.splashTextColor,
        marginLeft: '5%',
    },
    profileImage: {
        height: 80,
        width: 80,
        borderRadius: 40
    },
    ratingText: {
        fontSize: 15,
        marginLeft: '1%',
        marginRight: '5%'
    },
    emptyListText: {
        fontSize: 18,
        marginTop: 30,
        textAlign: 'center'
    }
})