import { Platform } from 'react-native';
import styled from 'styled-components/native';


export default TextExtraBold = styled.Text`
    fontFamily:${Platform.OS == 'ios' ? 'Gilroy-ExtraBold' : 'GilroyExtraBold'} 
`