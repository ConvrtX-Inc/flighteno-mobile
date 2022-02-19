import React, { useEffect, useState } from 'react';
import { View, Dimensions, Image, Text, ScrollView, Modal, TouchableOpacity, StyleSheet, FlatList, TouchableHighlight } from 'react-native';
import { color } from '../Utility/Color'
import { useSelector } from 'react-redux';
import { styles } from '../Utility/Styles'
import ImageViewer from 'react-native-image-zoom-viewer';
import moment from 'moment';
import VideoView from '../components/VideoView'
import Icon from 'react-native-vector-icons/AntDesign'
import RNFetchBlob from 'rn-fetch-blob'
import { useTranslation } from 'react-i18next';
import TextBold from '../components/atoms/TextBold';
import TextMedium from '../components/atoms/TextMedium';
var RNFS = require('react-native-fs');
const windowWidth = Dimensions.get('window').width;

const data = [
    {
        id: '1'
    }
]

export default function SupportReply({ navigation, route }) {
    const { ticket } = route.params
    const { currentUser, loading, supportTickets } = useSelector(({ authRed }) => authRed)
    const [ticketImages, setTicketImages] = useState([])
    const [showSlider, setShowSlider] = useState(false)
    const [galleryIndex, setGalleryIndex] = useState(0)
    const [showVideo, setShowVideo] = useState(false)
    const [videoUrl, setVideoUrl] = useState("")
    const [images, setImages] = useState([])
    const {t} = useTranslation()

    const android = RNFetchBlob.android
    let downloadDest = `${RNFS.ExternalStorageDirectoryPath}/Download`;
    const toggleSlider = (index, data) => {
        images.length = 0
        data.forEach(element => {
            images.push({ url: element })
        });
        setGalleryIndex(index)
        setShowSlider(!showSlider)
    };

    const onVideoPress = (value) => {
        setVideoUrl(value)
        setShowVideo(true)
    }

    const downloadFile = (url) => {
        var extension = ""
        const { dirs } = RNFetchBlob.fs;
        const result = Math.random().toString(36).substring(2, 7);
        extension = url.split(/[#?]/)[0].split('.').pop().trim()
        console.log(extension)
        var newExt = ""
        if (extension == "pdf") {
            newExt = 'application/pdf'
        }
        else {
            newExt = extension
        }
        console.log(newExt)
        RNFetchBlob
            .config({
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    mime: newExt,
                    path: `${dirs.DownloadDir}/${result}.${extension}`
                }
            })
            .fetch('GET', url, {
                //some headers ..
            })
            .then((res) => {
                console.log('The file saved to ', res.path())
                android.actionViewIntent(`${dirs.DownloadDir}/${result}.${extension}`, newExt)
            })
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <VideoView
                showVideo={showVideo}
                onPressClose={() => setShowVideo(false)}
                videoUrl={videoUrl}
            />
            <Modal
                visible={showSlider}
                transparent={true}
                onRequestClose={() => setShowSlider(false)}>
                <ImageViewer index={galleryIndex} imageUrls={images} />
            </Modal>
            {currentUser ?
                <ScrollView>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            style={styles.backImg}
                            resizeMode='stretch'
                            source={require('../images/back.png')}
                        />
                    </TouchableOpacity>
                    <TextBold style={[styles.HeadingText, { marginTop: (windowWidth * 4) / 100, marginLeft: '5%', marginBottom: 25, textAlign:'left' }]}>{t('support.support')}</TextBold>
                    <View style={Styles.SuportReplyCSS}>
                        <View style={Styles.replyUperMainBox}>
                            <View style={{ marginTop: 15 }}>
                                <Image source={!currentUser.profile_image ? require('../images/manProfile.png') : { uri: currentUser.profile_image }}
                                    style={styles.selectProfileImg}
                                />
                            </View>
                            <View style={Styles.replyHTxtBox}>
                                <TextMedium style={Styles.replyHTxt}>
                                    {ticket._id}
                                </TextMedium>
                                <TextBold style={[Styles.replyHTxt, {  marginVertical: 2 }]}>{currentUser.full_name}</TextBold>
                                <TextMedium style={[Styles.replyHTxt, { color: '#8E8E8E' }]}>
                                    {moment(ticket.created_date.$date.$numberLong, 'x').format("MM/DD/YYYY | hh:mmA")}
                                </TextMedium>
                            </View>
                            <View style={Styles.replyStatusBox}>
                                <TextMedium style={[Styles.suportno, { marginTop: 0, color: ticket.status == "pending" ? '#FFA800' : "#10CF73", marginLeft: 'auto', textTransform: "capitalize", marginRight: (windowWidth * 2) / 100, }]}>
                                    {ticket.status}
                                </TextMedium>
                            </View>
                        </View>
                        <TextMedium style={[Styles.suportTxt, { alignSelf: 'center', width: (windowWidth * 81) / 100, lineHeight: (windowWidth * 5.5) / 100, marginTop: (windowWidth * 5.8) / 100 }]}>
                            {ticket.message}
                        </TextMedium>
                        <FlatList
                            data={ticket.image}
                            horizontal
                            nestedScrollEnabled
                            renderItem={({ item, index }) =>
                                <TouchableHighlight underlayColor="transparent" onPress={() => toggleSlider(index, ticket.image)}>
                                    <Image
                                        source={{ uri: item }}
                                        style={Styles.reviewImage}
                                    />
                                </TouchableHighlight>
                            }
                            keyExtractor={item => item}
                        />
                        <FlatList
                            data={ticket.video}
                            horizontal
                            nestedScrollEnabled
                            style={{ marginTop: 10 }}
                            renderItem={({ item }) =>
                                <TouchableOpacity onPress={() => onVideoPress(item)}
                                    style={[Styles.reviewImage, { alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }]}>
                                    <Image source={require('../images/playButton.png')}
                                        style={{ height: 40, width: 40 }}
                                    />
                                </TouchableOpacity>
                            }
                            keyExtractor={item => item}
                        />
                    </View>
                    {ticket.messages.map(element => (
                        <View>
                            <View style={Styles.SuportReplyCSS}>
                                <View style={Styles.replyUperMainBox}>
                                    <View style={Styles.supportImageView}>
                                        <Image
                                            style={Styles.suportImg}
                                            resizeMode='stretch'
                                            source={require('../images/logo.png')}
                                        />
                                    </View>
                                    <View style={Styles.replyHTxtBox}>
                                        <TextBold style={[Styles.replyHTxt, { fontWeight: 'bold', marginTop: 8 }]}>Flighteno Admin</TextBold>
                                        <TextMedium style={[Styles.replyHTxt, { color: '#8E8E8E' }]}>
                                            {moment(element.created_date.$date.$numberLong, 'x').format("MM/DD/YYYY | hh:mmA")}
                                        </TextMedium>
                                    </View>

                                </View>
                                {element.message ?
                                    <TextMedium style={[Styles.suportTxt, { alignSelf: 'center', width: (windowWidth * 81) / 100, lineHeight: (windowWidth * 5.5) / 100, marginTop: (windowWidth * 5.8) / 100 }]}>
                                        {element.message}
                                    </TextMedium>
                                    : null}
                                {element.image ?
                                    <TouchableHighlight style={{ marginTop: 10 }} underlayColor="transparent" onPress={() => toggleSlider(0, [element.image])}>
                                        <Image
                                            source={{ uri: element.image }}
                                            style={Styles.reviewImage}
                                        />
                                    </TouchableHighlight>
                                    : null}
                                {element.file ?
                                    <TouchableOpacity activeOpacity={0.5} onPress={() => downloadFile(element.file)} style={{
                                        height: 40, width: 150, flexDirection: 'row', alignItems: 'center', borderRadius: 5,
                                        justifyContent: 'space-between', paddingHorizontal: 10, backgroundColor: color.blueColor, marginTop: 10
                                    }}>
                                        <Icon name="clouddownload" size={24} color="white" />
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>{t('track.attachment')}</Text>
                                    </TouchableOpacity>
                                    : null
                                }
                            </View>

                        </View>
                    ))}
                </ScrollView>
                : null}
        </View>
    );
}

const Styles = StyleSheet.create({
    suportno: {
        marginTop: (windowWidth * 2) / 100,
        fontSize: (windowWidth * 4.3) / 100,
    },
    SuportReplyCSS: {
        width: (windowWidth * 90) / 100,
        marginBottom: (windowWidth * 5) / 100,
        alignSelf: 'center',
        borderRadius: (windowWidth * 6) / 100,
        borderColor: '#DCDCDC',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    replyUperMainBox: {
        flexDirection: 'row',
        width: '100%',
    },
    avatarViewFlatReply: {
        height: (windowWidth * 12) / 100,
        width: (windowWidth * 12) / 100,
        borderRadius: (windowWidth * 15) / 100,
    },
    replyHTxtBox: {
        width: "56%",
        marginLeft: '4%',
    },
    replyHTxt: {
        fontSize: (windowWidth * 4.2) / 100,
    },
    replyStatusBox: {
        width: "28%",
    },
    suportTxt: {
        color: '#8E8E8E',
        marginTop: (windowWidth * 1) / 100,
        width: (windowWidth * 60) / 100,
        textAlign: 'justify'
    },
    replyImg: {
        width: (windowWidth * 42) / 100,
        height: (windowWidth * 16) / 100,
        marginTop: (windowWidth * 3) / 100,
    },
    supportImageView: {
        height: (windowWidth * 14) / 100,
        width: (windowWidth * 14) / 100,
        alignSelf: 'center',
        marginTop: (windowWidth * 1.5) / 100,
        borderRadius: ((windowWidth * 14) / 100) / 2,
        borderWidth: 2,
        borderColor: '#DADADA',
    },
    suportImg: {
        height: (windowWidth * 13) / 100,
        width: (windowWidth * 13) / 100,
        alignSelf: 'center',
        borderRadius: ((windowWidth * 13) / 100) / 2
    },
    reviewImage: {
        height: 80,
        width: 120,
        borderRadius: 10,
        marginLeft: 5
    }
})