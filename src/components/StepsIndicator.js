import * as React from 'react';
import StepIndicator from 'react-native-step-indicator';
import { color } from '../Utility/Color';


const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 4,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: 'transparent',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: color.lightBlue,
    stepStrokeUnFinishedColor: 'transparent',
    separatorFinishedColor: color.lightBlue,
    separatorUnFinishedColor: '#dedede',
    stepIndicatorFinishedColor: color.lightBlue,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 0,
    currentStepIndicatorLabelFontSize: 0,
    stepIndicatorLabelCurrentColor: 'transparent',
    stepIndicatorLabelFinishedColor: 'transparent',
    stepIndicatorLabelUnFinishedColor: 'transparent',
  }


const StepsIndicator = ({currentPosition}) => {
    return (
        <StepIndicator
            customStyles={customStyles}
            stepCount={3}
            currentPosition={currentPosition}
            direction='horizontal'
        />
    )
}

export default StepsIndicator;