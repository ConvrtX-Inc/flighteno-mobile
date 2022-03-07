import React from 'react';
import { View, StyleSheet, Image, } from 'react-native';

// Custom Imports
import TextBold from './atoms/TextBold';
import TextMedium from './atoms/TextMedium';
import TextRegular from './atoms/TextMedium';
import { commonStyles } from '../Utility/CommonStyles';
import Constants from '../Utility/Constants';
import ButtonPlain from './ButtonPlain';
import ButtonLarge from './ButtonLarge';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function PaymentCardItem({ card }) {

    return (
        <View
            style={styles.cardItem}
            key={card.key}
        >
            <View style={{ flexDirection: 'row', padding: 16 }}>
                <View style={{ flex: 2 }}>
                    <TextBold style={[commonStyles.fs18, styles.cardName]}> {card.name} </TextBold>
                    <TextRegular style={styles.cardDetails}>**** **** **** {card.last4} {card.brand}</TextRegular>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 110, }}>
                            <ButtonLarge
                                title="Edit"
                                onPress={() => { }}

                                height={45}
                            />
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => { }}
                            style={styles.buttonStyle}
                        >
                            <Image source={require('../assets/images/pngs/delete.png')} style={{ height: 20, width: 20 }} />

                        </TouchableOpacity>

                    </View>
                </View>
                <View>
                    <ButtonPlain
                        title="Default"
                        onPress={() => { }}
                        color='rgba(54, 197, 240, 0.2)'
                        textColor='#36C5F0'

                    />
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
    }, buttonStyle: {
        backgroundColor: '#E51F4A',
        height: 45,
        width: 45,
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        borderRadius: 100,
        borderColor: '#F0F0F0',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonTitleStyle: {
        textAlign: "center",
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 16,
        color: '#000000',
    },
    cardItem: {
        marginBottom: 20,
        borderColor: '#F0F0F0',
        borderWidth: 1,
        borderRadius: 16
    },
    cardDetails: {
        color: 'rgba(67, 67, 67, 0.6)',
        marginLeft: 6,
        marginTop: 12,
        marginBottom: 12,
        fontSize: 14
    }

});