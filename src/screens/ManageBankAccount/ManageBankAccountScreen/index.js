import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, TouchableOpacity, View, Image, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextBold from '../../../components/atoms/TextBold';
import TextMedium from '../../../components/atoms/TextMedium';
import ButtonLarge from '../../../components/ButtonLarge';
import ButtonPlain from '../../../components/ButtonPlain';
import ButtonVerify from '../../../components/ButtonVerify';
import { DeleteCardModal } from '../../../components/DeleteCardModal';
import { color } from '../../../Utility/Color';


// const DeleteCardModal = ({isModalClose, onCancelTap}) => {
//     return (
//         <Modal animationType='slide' visible={isModalClose} transparent={true}>
//             <View style={styles.modelView}>
//                 <View style={[styles.innerView, { paddingLeft:18, paddingRight:18 }]}>
//                     <TextBold style={{fontSize:18, textAlign:'center', marginTop:16}}>Remove Account</TextBold>
//                     <TextRegular style={{textAlign:'center', marginTop:8}}>Are you sure you want to remove the account?</TextRegular>

//                     <View style={{flexDirection:'row', marginTop:16}} >
//                         <View style={{flex:1}}>
//                             <TextRegular>Ending in 1234</TextRegular>
//                             <TextRegular>01/23</TextRegular>
//                         </View>
//                         <View style={{flex:1, alignItems:'flex-end'}}>
//                             <Image source={{uri:'https://picsum.photos/200'}} style={{width:56, height: 56}} />
//                         </View>
//                     </View>

//                     {/* <ButtonPlain/> */}
//                     <View style={{marginTop:16}}>
//                         <ButtonLarge title="Confirm" />
//                     </View>

//                     <View style={{marginTop:16, marginBottom:16 }}>
//                         <TouchableOpacity onPress={onCancelTap}>
//                             <TextRegular style={{textAlign:'center'}}>Cancel</TextRegular>
//                         </TouchableOpacity>
//                     </View> 


//                 </View>
//             </View>
//         </Modal>
//     )
// }

export default function ManageBankAccountScreen({navigation}) {

    const [isModalClose, setModalClose] = useState(false)
    const {t} = useTranslation()

    const cardsList = [
        {cardHolder:'Margarette Smith', isDefault:true, cardNum:'**** **** **** 3456 Visa'},
        {cardHolder:'Margarette Smith', isDefault:false, cardNum:'**** **** **** 3456 Visa'}
    ]

    const onEditTap = () => {
        navigation.navigate('BankAddNewCard')
    }

    const onDeleteTap = () => {
        setModalClose(true)
    }

    const onAddTap = () => {
        navigation.navigate('BankAddNewCard')
    }


    const renderItem = ({item}) => (
        <View style={styles.card}>

            <View style={{flexDirection:'row'}}>
                <View>
                    <TextBold style={styles.cardTitle}>{item.cardHolder}</TextBold>
                </View>

                {item?.isDefault ?
            (
                <View style={{alignItems:'flex-end',flex:1}}>
                    <View style={{backgroundColor:color.lightBlue, padding:8, borderRadius:100}}>
                        <TextBold style={{color:'#fff'}} >{t('common.default')}</TextBold>
                    </View>
                </View>
            )   :
            (
                <View style={{alignItems:'flex-end',flex:1}}>
                    <View style={{ padding:8, borderRadius:100, borderWidth:1, borderColor: color.lightBlue}}>
                        <TextBold style={{color:color.lightBlue}} >{t('common.setDefault')}</TextBold>
                    </View>
                </View>
            ) 
            }

            </View>
          
            <TextMedium style={styles.cardNum}>{item.cardNum}</TextMedium>
                

            
            <View style={{display:'flex',flexDirection:'row', marginTop:8}}>
                <View style={{alignItems:'flex-start', justifyContent:'center'}}>
                    <TouchableOpacity 
                        style={{backgroundColor:'#36C5F0', padding:8, paddingLeft:32, paddingRight:32, borderRadius:80}}
                        onPress={onEditTap}
                        >
                        <TextBold style={{color:'#fff'}}>{t('common.edit')}</TextBold>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems:'flex-start', justifyContent:'center', paddingLeft:16}}>
                    <TouchableOpacity onPress={() => {
                        onDeleteTap()
                    }}>
                        <View style={{backgroundColor:'#E51F4A', padding:8, borderRadius:80}}>
                            <Image source={require('../../../images/trashWhite.png')} style={styles.trashImage} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        
        </View>
    )

    const renderHeader = () => (
        <>
         <TextBold style={[styles.title, {textAlign:'left'}]}>{t('common.manageBankAccount')}</TextBold>
        </>
    )

    const renderFooter = () => (
        <TouchableOpacity onPress={onAddTap}>
           <View style={styles.addNewAccount}>
               <View style={{alignItems:'center'}}>
                   <Image source={require('../../../images/plusBlue.png')} style={{width:17, height:17}} />
               </View>
               <View style={{justifyContent:'center', paddingLeft:8}}>
                    <TextBold style={{fontSize:18, color:'#36C5F0' }}>{t('common.addNewAccount')}</TextBold>
               </View>
           </View>
        </TouchableOpacity> 
    )

    return (
        <SafeAreaView style={{marginLeft:18, marginRight:18}}>
            <FlatList 
                data={cardsList} 
                keyExtractor={(item,index) => item+index}
                ListHeaderComponent={renderHeader}
                renderItem={renderItem}
                ListFooterComponent={renderFooter}
            />
            <DeleteCardModal isModalClose={isModalClose} onCancelTap={() => { setModalClose(false) }} />
            {/* <DeleteCardModal isModalClose={isModalClose} onCancelTap={() => { setModalClose(false) }} /> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    innerView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10
    },
    modelView: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        fontSize:26
    },
    card:{
        borderWidth:1,
        padding:16,
        borderRadius:16,
        borderColor:'#EEEEEE',
        marginTop:24,
        shadowColor:'#171717',
        shadowOffset: {width: -2, height:4},
        shadowOpacity: 0.2,
        shadowRadius:3,
        elevation: 14,
        backgroundColor:'#fff',
        margin:8
    },
    cardTitle:{
        fontSize:16
    },
    cardNum: {
        color:'#434343',
        marginTop:8
    },
    addNewAccount:{
        borderWidth:1,
        padding:16,
        flexDirection:'row',
        borderRadius:16,
        justifyContent:'center',
        borderStyle:'dashed',
        marginTop:24
    },
    trashImage:{
        width:20,
        height:20
    }
})