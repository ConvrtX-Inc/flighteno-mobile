import * as React from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { color } from '../Utility/Color';

const OfferModel = ({ model, closeModal, onPressYes, onPressNo, title }) => {
    return (
        <Modal animationType={"slide"} transparent={true}
            visible={model}
            onRequestClose={closeModal}
        >
            <View style={styles.modelView}>
                <View style={styles.innerView}>
                    <Text style={styles.headingText}>
                        {title}
                    </Text>
                    <View style={styles.bottomView}>
                        <TouchableOpacity onPress={onPressYes} style={styles.buttonView}>
                            <Text style={styles.buttonText}>YES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressNo} style={[styles.buttonView, { borderWidth: 0 }]}>
                            <Text style={styles.buttonText}>NO</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default OfferModel;

const styles = StyleSheet.create({
    modelView: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerView: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10
    },
    headingText: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: 22,
        paddingVertical: 40,
        marginHorizontal: '10%'
    },
    bottomView: {
        height: 50,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: 'gray',
    },
    buttonView: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: 'gray'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})