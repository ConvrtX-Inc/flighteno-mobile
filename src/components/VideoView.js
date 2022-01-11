import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, Dimensions, Modal } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/AntDesign'
import
MediaControls, { PLAYER_STATES }
    from 'react-native-media-controls';
const windowHeight = Dimensions.get('window').height

export default function VideoView({ showVideo, onPressClose, videoUrl }) {
    const videoPlayer = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [paused, setPaused] = useState(false);
    const [
        playerState, setPlayerState
    ] = useState(PLAYER_STATES.PLAYING);
    const [screenType, setScreenType] = useState('content');

    const onSeek = (seek) => {
        //Handler for change in seekbar
        videoPlayer.current.seek(seek);
    };

    const onPaused = (playerState) => {
        //Handler for Video Pause
        setPaused(!paused);
        setPlayerState(playerState);
    };

    const onReplay = () => {
        //Handler for Replay
        setPlayerState(PLAYER_STATES.PLAYING);
        videoPlayer.current.seek(0);
    };

    const onProgress = (data) => {
        // Video Player will progress continue even if it ends
        if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
            setCurrentTime(data.currentTime);
        }
    };

    const onLoad = (data) => {
        setDuration(data.duration);
        setIsLoading(false);
    };

    const onLoadStart = (data) => setIsLoading(true);

    const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

    const onError = () => alert('Oh! ', error);

    const exitFullScreen = () => {
        alert('Exit full screen');
    };

    const enterFullScreen = () => { };

    const onFullScreen = () => {
        setIsFullScreen(isFullScreen);
        if (screenType == 'content') setScreenType('cover');
        else setScreenType('content');
    };

    const renderToolbar = () => (
        <View>
            <Text style={Styles.toolbar}> toolbar </Text>
        </View>
    );

    const onSeeking = (currentTime) => setCurrentTime(currentTime);
    return (
        showVideo ?
            <Modal style={{flex: 1}} animationType={"slide"} transparent={false}
                onRequestClose={onPressClose}>
                <Video
                    onEnd={onEnd}
                    onLoad={onLoad}
                    onLoadStart={onLoadStart}
                    onProgress={onProgress}
                    paused={paused}
                    ref={videoPlayer}
                    resizeMode="contain"
                    onFullScreen={isFullScreen}
                    source={{
                        uri:
                            videoUrl,
                    }}
                    style={Styles.mediaPlayer}
                    volume={10}
                />
                <MediaControls
                    duration={duration}
                    isLoading={isLoading}
                    mainColor="#333"
                    onFullScreen={onFullScreen}
                    onPaused={onPaused}
                    onReplay={onReplay}
                    onSeek={onSeek}
                    onSeeking={onSeeking}
                    playerState={playerState}
                    progress={currentTime}
                    toolbar={renderToolbar()}
                    isFullScreen={true}
                />
            </Modal>
            : null
    );
}

const Styles = StyleSheet.create({
    mainView: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'black'
    },
    iconStyle: {
        marginLeft: '5%',
        marginTop: 20
    },
    videoStyle: {
        height: 300,
        width: '100%',
        marginTop: (windowHeight * 20) / 100
    },
    toolbar: {
        marginTop: 30,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    mediaPlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
        justifyContent: 'center',
    },
})