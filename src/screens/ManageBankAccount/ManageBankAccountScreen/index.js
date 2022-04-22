import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, Image, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextBold from '../../../components/atoms/TextBold';
import TextMedium from '../../../components/atoms/TextMedium';
import ButtonPlain from '../../../components/ButtonPlain';
import { color } from '../../../Utility/Color';


const DeleteCardModal = () => {
    return (
        <Modal animationType='slide' visible={true} transparent={true}>
            <View style={styles.modelView}>
                <View style={styles.innerView}>
                    <TextBold>Remove Account</TextBold>
                    <TextRegular>Are you sure you want to remove the account?</TextRegular>

                    <View>
                        <View>
                            <TextRegular>Ending in 1234</TextRegular>
                            <TextRegular>01/23</TextRegular>
                        </View>
                        <View>
                            
                        </View>
                    </View>

                </View>
            </View>
        </Modal>
    )
}

export default function ManageBankAccountScreen({navigation}) {

    const cardsList = [
        {cardHolder:'Margarette Smith', isDefault:true, cardNum:'**** **** **** 3456 Visa'},
        {cardHolder:'Margarette Smith', isDefault:true, cardNum:'**** **** **** 3456 Visa'}
    ]

    const onEditTap = () => {
        navigation.navigate('BankAddNewCard')
    }


    const renderItem = ({item}) => (
        <View style={styles.card}>

            <View style={{flexDirection:'row'}}>
                <View>
                    <TextBold style={styles.cardTitle}>{item.cardHolder}</TextBold>
                </View>
                <View style={{alignItems:'flex-end',flex:1}}>
                    <View style={{backgroundColor:color.lightBlue, padding:8, borderRadius:100}}>
                        <TextBold style={{color:'#fff'}} >Default</TextBold>
                    </View>
                </View>
            </View>
          
            <TextMedium style={styles.cardNum}>{item.cardNum}</TextMedium>


            
            <View style={{display:'flex',flexDirection:'row', marginTop:8}}>
                <View style={{alignItems:'flex-start', justifyContent:'center'}}>
                    <TouchableOpacity 
                        style={{backgroundColor:'#36C5F0', padding:8, paddingLeft:32, paddingRight:32, borderRadius:80}}
                        onPress={onEditTap}
                        >
                        <TextBold style={{color:'#fff'}}>Edit</TextBold>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems:'flex-start', justifyContent:'center', paddingLeft:16}}>
                    <TouchableOpacity>
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
         <TextBold style={styles.title}>Manage Bank Account</TextBold>
        </>
    )

    const renderFooter = () => (
        <TouchableOpacity>
           <View style={styles.addNewAccount}>
               <View style={{alignItems:'center'}}>
                   <Image source={require('../../../images/plusBlue.png')} style={{width:17, height:17}} />
               </View>
               <View style={{justifyContent:'center', paddingLeft:8}}>
                    <TextBold style={{fontSize:18}}>Add New Account</TextBold>
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
            <DeleteCardModal/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    innerView: {
        width: '90%',
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