import React from 'react';
import { View, StyleSheet, Image, } from 'react-native';

// Custom Imports
import TextBold from './atoms/TextBold';
import TextMedium from './atoms/TextMedium';
import TextRegular from './atoms/TextMedium';
import { commonStyles } from '../Utility/CommonStyles';
import Constants from '../Utility/Constants';

export default function PaymentCard ({card}) {
    return (
        <View
            key={card.card_no}
            style={
                [
                    commonStyles.flex1,
                    commonStyles.paddingHorizontal20,
                    commonStyles.paddingVertical20,
                    commonStyles.marginRight10,
                    commonStyles.borerRadius10,
                    styles.card,
                    {
                        backgroundColor: card.background_color,                                                                    
                    }
                ]                                                            
            }>
                <View>                                                                
                    <View style={[
                            commonStyles.flexDirectionRow,
                            commonStyles.justifyContentSpaceBetween,
                            commonStyles.alignItemsCenter
                        ]}>
                        <Image 
                            resizeMode='contain'
                            source={{uri: card.card_logo}}
                            style={styles.tinyLogo} />
                        <TextMedium style={[commonStyles.cWhite]}>{card.expiration}</TextMedium> 
                    </View>
                </View>
                <View style={[commonStyles.flex1]}>
                    <TextBold style={[commonStyles.cWhite]}>{card.card_no}</TextBold> 
                </View>
                <View>
                    <View style={[commonStyles.flexDirectionRow, commonStyles.justifyContentSpaceBetween]}>
                        <TextBold style={[commonStyles.cWhite]}>{card.cardholder_name}</TextBold> 
                        <TextMedium style={[commonStyles.cWhite]}>{card.type}</TextMedium> 
                    </View>
                </View>                                                        
        </View>
    )
}


const styles = StyleSheet.create({
    card: {
        width: 278,
        height: 179,
    },
    tinyLogo: {
        width: 50,
        height: 50,
    }    
});