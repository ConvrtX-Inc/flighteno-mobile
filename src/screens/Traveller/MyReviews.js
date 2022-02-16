import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList, BackHandler } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { color } from '../../Utility/Color';
import { useSelector, useDispatch } from 'react-redux'
import { styles } from '../../Utility/Styles'
import ReviewList from '../../components/ReviewList';
import { GetProfile } from '../../redux/actions/Trips';
import VideoView from '../../components/VideoView';
import ScreenLoader from '../../components/ScreenLoader'
import { LOGIN_DATA } from '../../redux/constants';
import { useTranslation } from 'react-i18next';
import TextBold from '../../components/atoms/TextBold';
var windowWidth = Dimensions.get('window').width;

export default function MyReviews({ route }) {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const { loading, currentUser, token } = useSelector(({ authRed }) => authRed)
    const [userRating, setUserRating] = useState([])
    const [videoView, setVideoView] = useState(false)
    const [videoUrl, setVideoUrl] = useState("")
    const [showList, setShowList] = useState(false)
    const {t} = useTranslation()

    useEffect(() => {
        var obj = {
            admin_id: currentUser._id
        }
        dispatch(GetProfile(obj, token, (data) => {
            setUserRating(data)
            setShowList(true)
        },
            (currentRating) => {
                currentUser.rating = currentRating
                dispatch({ type: LOGIN_DATA, data: currentUser })
            }
        ))
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                if (videoView) {
                    setVideoView(false);
                    return true;
                } else {
                    return false;
                }
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [videoView])
    );

    const onVideoPress = (value) => {
        setVideoUrl(value)
        setVideoView(true)
    }

    return (
        <View style={{ flex: 1, backgroundColor: color.backgroundColor }}>
            <ScreenLoader loader={loading} />
            <VideoView
                showVideo={videoView}
                onPressClose={() => setVideoView(false)}
                videoUrl={videoUrl}
            />
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    style={styles.backImg}
                    resizeMode='stretch'
                    source={require('../../images/back.png')}
                />
            </TouchableOpacity>
            <TextBold style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginLeft: '5%' }]}>{t('common.myReviews')}</TextBold>
            {showList ?
                <FlatList
                    data={userRating.traveler_review}
                    nestedScrollEnabled
                    renderItem={({ item, index }) =>
                        <ReviewList review={item} onPress={(value) => onVideoPress(value)} />
                    }
                    keyExtractor={item => item._id}
                    ListEmptyComponent={<Text style={styles.emptyListText}>There are no reviews!</Text>}
                />
                : null}
        </View>
    );
}

const Styles = StyleSheet.create({
    userImage: {
        height: 40,
        width: 40,
        borderRadius: 20
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginTop: 10
    },
    userView: {
        flexDirection: 'row',
    },
    listView: {
        marginHorizontal: '7.5%',
        marginTop: 20
    },
    ratingTime: {
        fontSize: 14,
        color: color.reviewTime,
        marginTop: -3,
        flexWrap: 'wrap'
    },
    reviewText: {
        fontSize: 15,
        color: color.reviewText,
        width: '95%', alignSelf: 'center',
        marginTop: 10,
        lineHeight: 22
    },
    photoView: {
        flexDirection: 'row',
        marginTop: 5
    },
    reviewImage: {
        height: 60,
        width: 100,
        borderRadius: 10,
        marginLeft: '2%'
    }
})