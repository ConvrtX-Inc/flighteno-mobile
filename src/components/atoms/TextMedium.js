import { Platform } from 'react-native';
import styled from 'styled-components/native';

export default TextMedium = styled.Text`
    fontFamily:${Platform.OS == 'ios' ? 'Gilroy-Medium' : 'GilroyMedium'} 
`
