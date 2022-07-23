import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
  Animated,
  FlatList,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {styles} from '../../Utility/Styles';
import {useDispatch, useSelector} from 'react-redux';
import {color} from '../../Utility/Color';
import {getChatMessages} from '../../redux/actions/Chat';
import moment from 'moment';
import TextBold from '../../components/atoms/TextBold';
import TextMedium from '../../components/atoms/TextMedium';
import {useTranslation} from 'react-i18next';
import ChatsSkeleton from '../../components/ChatsSkeleton';
import {CHAT_MESSAGES} from '../../redux/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
// import ChatsSkeleton from '../../components/ChatsSkeleton';

var windowWidth = Dimensions.get('window').width;

export default function ChatScreen() {
  const navigation = useNavigation();
  const {loading, token, currentUser, currentProfile} = useSelector(
    ({authRed}) => authRed,
  );
  const {chatMessages} = useSelector(({chatRed}) => chatRed);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [imageValid, setImageValid] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getMessages();

      return () => {};
    }, []),
  );

  const getMessages = () => {
    var data = {
      admin_id: currentUser._id,
    };
    dispatch(getChatMessages(data, token));
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={[styles.ScreenCss, {marginLeft: 18}]}>
        <View>
          <FlatList
            data={chatMessages}
            nestedScrollEnabled
            refreshing={refreshing}
            onRefresh={() => {
              dispatch({type: CHAT_MESSAGES, data: []});
              getMessages();
            }}
            // ListEmptyComponent={
            //     <ChatsSkeleton />
            // }
            ListHeaderComponent={
              <View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image
                    style={styles.backImg}
                    resizeMode="stretch"
                    source={require('../../images/back.png')}
                  />
                </TouchableOpacity>
                <TextBold
                  style={[
                    styles.HeadingText,
                    {marginTop: (windowWidth * 4) / 100, textAlign: 'left'},
                  ]}>
                  {t('messages.inbox')}
                </TextBold>
                <View style={{marginVertical: 30}}>
                  <FlatList
                    data={chatMessages}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    nestedScrollEnabled
                    // style={{ paddingHorizontal: '5%' }}
                    renderItem={({item, index}) => (
                      <View style={{marginRight: 15, width: 80}}>
                        <TouchableOpacity
                          style={{alignItems: 'center'}}
                          onPress={() =>
                            navigation.navigate('ChatTraveler', {
                              currentStatus: 'message',
                              userDetail: item.reciverImageName[0],
                              chatHistory: item.messages,
                              orderID: item.order_id,
                              offerID:
                                item.offer_id.length > 0
                                  ? item.offer_id[0].offer_id
                                  : '',
                              offerStatus:
                                item.offer_id.length > 0
                                  ? item.offer_id[0].status
                                  : '',
                            })
                          }>
                          <Image
                            source={
                              item.reciverImageName[0]?.profile_image == ''
                                ? require('../../images/manProfile.png')
                                : {
                                    uri: item?.reciverImageName[0]
                                      ?.profile_image,
                                  }
                            }
                            // source={  {uri: item.reciverImageName[0].profile_image }  }
                            style={styles.profileImage}
                            resizeMode="cover"
                            // onError={() => setImageValid(false)}
                          />
                          <TextMedium
                            numberOfLines={1}
                            style={{textAlign: 'left'}}>
                            {item?.reciverImageName[0].full_name?.split(' ')[0]}
                          </TextMedium>
                        </TouchableOpacity>
                      </View>
                    )}
                    keyExtractor={item => item._id}
                  />
                </View>
              </View>
            }
            renderItem={({item, index}) => (
              <View>
                {index == 0 ? (
                  <TextBold style={[styles.HeadingText, {textAlign: 'left'}]}>
                    {t('messages.messages')}
                  </TextBold>
                ) : null}
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ChatTraveler', {
                      currentStatus: 'message',
                      userDetail: item.reciverImageName[0],
                      receiverId: item.reciver_id,
                      chatHistory: item.messages,
                      orderID: item.order_id,
                      offerID:
                        item.offer_id.length > 0
                          ? item.offer_id[0].offer_id
                          : '',
                      offerStatus:
                        item.offer_id.length > 0 ? item.offer_id[0].status : '',
                    })
                  }
                  style={[Styles.itemView, {}]}>
                  <View style={{flexDirection: 'row'}}>
                    <View>
                      <Image
                        // source={ imageValid ? {uri:item.reciverImageName[0].profile_image }: require('../../images/manProfile.png')}
                        source={
                          item?.reciverImageName[0]?.profile_image == ''
                            ? require('../../images/manProfile.png')
                            : {uri: item?.reciverImageName[0]?.profile_image}
                        }
                        style={styles.profileImage}
                        resizeMode="cover"
                      />
                    </View>
                    <View
                      style={{flex: 1, marginLeft: '6%', marginRight: '4%'}}>
                      <TextBold
                        numberOfLines={1}
                        style={[Styles.addText, {textAlign: 'left'}]}>
                        {item.reciverImageName[0].full_name.split(' ')[0] +
                          (item.order_name.length > 0
                            ? ', ' + item.order_name[0].order_name
                            : '')}
                      </TextBold>

                      <TextMedium
                        numberOfLines={1}
                        style={[Styles.dateText, {}]}>
                        {item.messages[0]?.currentMessage.image
                          ? item.messages[0]?.currentMessage.user._id ==
                            currentUser._id
                            ? 'You sent a photo'
                            : `${item.messages[0]?.currentMessage.user.name} sent a photo`
                          : item.messages[0]?.currentMessage.text}
                      </TextMedium>
                    </View>

                    <View>
                      <TextMedium
                        style={[
                          Styles.dateText,
                          {marginLeft: 'auto', marginRight: 18},
                        ]}>
                        {moment(
                          item.messages[0]?.currentMessage.createdAt,
                        ).format('DD MMM')}
                      </TextMedium>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item._id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  inboxTopName: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  addText: {fontSize: 16, textAlign: 'center', marginTop: 5, marginBottom: 8},
  nameText: {
    fontSize: 15,
    color: 'gray',
  },
  itemView: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 15,
    height: 75,
    marginTop: 20,
    alignItems: 'center',
  },
  addFriendImage: {height: 50, width: 50, borderRadius: 50 / 2},
  dateText: {fontSize: 14, color: color.grayText},
});
