import React, { useState } from 'react';
import { color } from '../Utility/Color';
import { TouchableOpacity, View, Text, Image, StyleSheet, FlatList, TouchableHighlight } from 'react-native'
import moment from 'moment'
import { AirbnbRating } from 'react-native-elements';
import ViewImages from './ViewImages';
import { useNavigation } from '@react-navigation/native'

const ReviewList = ({ review, onPress, onPressUser }) => {
    const navigation = useNavigation()
    const [showImageView, setShowImageView] = useState(false)
    const [images, setImages] = useState([])

    const showGallery = (data) => {
        images.length = 0
        data.forEach(element => {
            images.push({ url: element })
        });
        setShowImageView(true)
    }
    return (
        <View style={Styles.listView}>
            <ViewImages
                showImageViewer={showImageView}
                images={images}
                closeModal={() => setShowImageView(false)}
            />
            <View style={Styles.userView}>
                <TouchableHighlight underlayColor="transparent" onPress={onPressUser}>
                    <Image
                        source={review.buyer_user_details[0].profile_image ? { uri: review.buyer_user_details[0].profile_image } : require('../images/manProfile.png')}
                        style={Styles.userImage}
                    />
                </TouchableHighlight>
                <View style={{ marginLeft: '3%', flex: 1 }}>
                    <Text style={[Styles.userName, { fontSize: 14, marginTop: 0, textAlign: 'auto' }]}>
                        {review.buyer_user_details[0].full_name}
                    </Text>
                    <Text style={Styles.ratingTime}>{moment(review.created_date.$date.$numberLong, 'x').fromNow()} | <Text onPress={() => navigation.navigate("OrderDetailBaseOnOrderId", { orderId: review.order_id })} style={{ textDecorationLine: "underline" }}>Order No. {review.order_id}</Text></Text>
                    <View style={{ alignSelf: 'flex-start' }}>
                        <AirbnbRating
                            defaultRating={review.rating}
                            type='star'
                            ratingCount={5}
                            size={15}
                            showRating={false}
                            isDisabled={true}
                        />
                    </View>
                </View>
            </View>
            {review.description != "" ?
                <Text style={Styles.reviewText}>
                    {review.description}
                </Text>
                : null}
            <FlatList
                data={review.image_url}
                horizontal
                nestedScrollEnabled
                renderItem={({ item }) =>
                    <TouchableHighlight underlayColor="transparent" onPress={() => showGallery(review.image_url)}>
                        <Image
                            source={{ uri: item }}
                            style={Styles.reviewImage}
                        />
                    </TouchableHighlight>
                }
                keyExtractor={item => item}
            />
            <FlatList
                data={review.video_url}
                horizontal
                nestedScrollEnabled
                style={{ marginTop: 10 }}
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => onPress(item)}
                        style={[Styles.reviewImage, { alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }]}>
                        <Image source={require('../images/playButton.png')}
                            style={{ height: 40, width: 40 }}
                        />
                    </TouchableOpacity>
                }
                keyExtractor={item => item}
            />

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
        marginVertical: 20,
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
        marginVertical: 10,
        lineHeight: 22,
    },
    photoView: {
        flexDirection: 'row',
        marginTop: 5
    },
    reviewImage: {
        height: 80,
        width: 120,
        borderRadius: 10,
        marginLeft: 5
    }
})

export default ReviewList;