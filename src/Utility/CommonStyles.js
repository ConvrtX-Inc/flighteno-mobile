import { StyleSheet } from 'react-native';
import Constants from './Constants';
import { Dimensions } from 'react-native';

export const commonStyles = StyleSheet.create({
    // FLEX
    flex1: {
        flex: 1
    },
    flexDirectionRow: {
        flexDirection: 'row',
    },  
    flexDirectionColumn: {
        flexDirection: 'column',
    }, 
    // ALIGNMENTS
    justifyContentCenter: {
        justifyContent: 'center',
    },
    justifyContentSpaceBetween: {
        justifyContent: 'space-between',
    },
    alignItemsCenter: {
        alignItems: 'center',
    },
    // FONT SIZES
    fs26: {
        fontSize: 26
    },
    fs24: {
        fontSize: 24
    },
    fs22: {
        fontSize: 22
    },
    fs20: {
        fontSize: 20
    },
    fs18: {
        fontSize: 18
    },
    fs16: {
        fontSize: 16
    },
    fs14: {
        fontSize: 14
    },
    fs12: {
        fontSize: 12
    },
    fs10: {
        fontSize: 10
    },
    // PADDING
    padding10: {
        padding: 10
    },
    padding6: {
        padding: 6
    },
    paddingHorizontal10: {
        paddingHorizontal: 10,
    },
    paddingHorizontal20: {
        paddingHorizontal: 20,
    },
    paddingVertical10: {
        paddingVertical: 10,
    },
    paddingVertical20: {
        paddingVertical: 20,
    },
    // MARGINS
    marginVertical30: {
        marginVertical: 30,
    },
    marginVertical20: {
        marginVertical: 20,
    },
    marginVertical10: {
        marginVertical: 10,
    },
    marginHorizontal30: {
        marginHorizontal: 30,
    },
    marginHorizontal20: {
        marginHorizontal: 20,
    },
    marginHorizontal10: {
        marginHorizontal: 10,
    },
    marginTop30: {
        marginTop: 30,
    },
    marginTop20: {
        marginTop: 20,
    },
    marginTop10: {
        marginTop: 10,
    },
    marginRight10: {
        marginRight: 10,
    },
    // DIMENSIONS
    fullWidth: {
        width: Dimensions.get('window').width - (Constants.appLayout.screenContainerMarginHorizontal * 2)
    },
    // BORDER RADIUS
    borerRadius12: {
        borderRadius: 12,
    },
    borerRadius10: {
        borderRadius: 10,
    },
    // COLORS
    cWhite: {
        color: '#FFFFFF',
    },
    cMountainMist: {
        color: '#959595'
    },
    cMediumGreen: {
        color: '#29A435'
    },
    // BACKGROUND COLORS
    bcWhite: {
        backgroundColor: '#FFFFFF',
    },
    // OTHER
    centerScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
});