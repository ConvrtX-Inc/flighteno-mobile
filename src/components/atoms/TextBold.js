import { Platform } from 'react-native';
import styled from 'styled-components/native';


export default TextBold = styled.Text`
    fontFamily:${Platform.OS == 'ios' ? 'Gilroy-Bold' : 'GilroyBold'}
`