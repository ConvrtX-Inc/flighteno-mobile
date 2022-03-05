import { Platform } from 'react-native';
import styled from 'styled-components/native';


export default TextSemiBold = styled.Text`
    fontFamily: ${Platform.OS == 'ios' ? 'Gilroy-Semibold' : 'GilroySemibold'} 
`