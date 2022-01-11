import * as React from 'react';
import { TextInput, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from '../Utility/Color';

const ScreenLoader = ({ loader }) => {
    return (
        <Modal style={styles.modal} animationType={"slide"} transparent={true}
            visible={loader}>
            <ActivityIndicator style={{marginTop: 50}} size="large" color={color.blueColor} />
        </Modal>
    );
}

export default ScreenLoader;

const styles = StyleSheet.create({
    modal: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})