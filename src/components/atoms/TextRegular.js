import { Platform } from 'react-native';
import styled from 'styled-components/native';

export default TextRegular = styled.Text`
    fontFamily: ${Platform.OS == 'ios' ? 'Gilroy-Regular' : 'GilroyRegular'} 
`