import React from 'react';
import { View, StyleSheet } from 'react-native';
import { color } from '../../Utility/Color'
import { WebView } from 'react-native-webview';

const StripeWebView = ({ route }) => {
    const { url } = route.params
    
    return (
        <View style={styles.containerStyle}>
            <WebView style={{ flex: 1 }} source={{ uri: url}} />
        </View>
    );
}

export default StripeWebView;

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: color.backgroundColor
    }
})