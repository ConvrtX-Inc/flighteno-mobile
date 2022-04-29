import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import TextBold from './atoms/TextBold';
import TextRegular from './atoms/TextRegular';
import ButtonLarge from './ButtonLarge';

export const DeleteCardModal = ({isModalClose, onCancelTap}) => {

    const {t} = useTranslation()

    return (
        <Modal animationType='slide' visible={isModalClose} transparent={true}>
            <View style={styles.modelView}>
                <View style={[styles.innerView, { paddingLeft:18, paddingRight:18 }]}>
                    <TextBold style={{fontSize:18, textAlign:'center', marginTop:16}}>{t('common.removeAccount')}</TextBold>
                    <TextRegular style={{textAlign:'center', marginTop:8}}>{t('common.areYouSureRemove')}?</TextRegular>

                    <View style={{flexDirection:'row', marginTop:16}} >
                        <View style={{flex:1}}>
                            <TextRegular>Ending in 1234</TextRegular>
                            <TextRegular>01/23</TextRegular>
                        </View>
                        <View style={{flex:1, alignItems:'flex-end'}}>
                            <Image source={{uri:'https://picsum.photos/200'}} style={{width:56, height: 56}} />
                        </View>
                    </View>

                    {/* <ButtonPlain/> */}
                    <View style={{marginTop:16}}>
                        <ButtonLarge title="Confirm" />
                    </View>

                    <View style={{marginTop:16, marginBottom:16 }}>
                        <TouchableOpacity onPress={onCancelTap}>
                            <TextRegular style={{textAlign:'center'}}>{t('kyc.cancel')}</TextRegular>
                        </TouchableOpacity>
                    </View> 

                </View>
            </View>
        </Modal>
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
})