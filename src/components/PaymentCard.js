import React from 'react';
import { View, StyleSheet, Image, } from 'react-native';

// Custom Imports
import TextBold from './atoms/TextBold';
import TextMedium from './atoms/TextMedium';
import TextRegular from './atoms/TextMedium';
import { commonStyles } from '../Utility/CommonStyles';
import Constants from '../Utility/Constants';

export default function PaymentCard({ card }) {
    console.log("CARD:", card)

    function getCardLogo(brand) {
        switch (brand.toLowerCase()) {
            case "visa":
                return require("../assets/images/card_logos/visa.png")
            case "mastercard":
                return require("../assets/images/card_logos/mastercard.png")
            case "discover":
                return require("../assets/images/card_logos/discover.png")
            case "jcb":
                return require("../assets/images/card_logos/jcb.png")
            default:
                return require("../assets/images/card_logos/visa.png")
        }
    }

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
                        backgroundColor: card.metadata.color,
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
                        source={ getCardLogo(card.brand)}
                        style={styles.tinyLogo} />
                    <TextMedium style={[commonStyles.cWhite]}>{card.metadata.expiry}</TextMedium>
                </View>
            </View>
            <View style={[commonStyles.flex1]}>
                <TextBold style={[commonStyles.cWhite]}>{card.metadata.number}</TextBold>
            </View>
            <View>
                <View style={[commonStyles.flexDirectionRow, commonStyles.justifyContentSpaceBetween]}>
                    <TextBold style={[commonStyles.cWhite]}>{card.name}</TextBold>
                    <TextMedium style={[commonStyles.cWhite]}>{card.funding.charAt(0).toUpperCase() +  card.funding.slice(1)} Card</TextMedium>
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