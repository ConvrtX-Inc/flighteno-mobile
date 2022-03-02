import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
const skeletonData = [
    'skeleton_key_1',
    'skeleton_key_2',
    'skeleton_key_3',
    'skeleton_key_4',
    'skeleton_key_5'
]
const ChatsSkeleton = () => {
    return (
        <View>
            <FlatList
                data={skeletonData}
                ListHeaderComponent={
                    <FlatList
                        data={skeletonData}
                        horizontal
                        paddingHorizontal={10}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) =>
                            <View>
                                <SkeletonPlaceholder>
                                    <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                                        <SkeletonPlaceholder.Item width={80} height={80} borderRadius={50} marginRight={15} />
                                    </SkeletonPlaceholder.Item>
                                </SkeletonPlaceholder>
                            </View>
                        }
                        keyExtractor={item => `${item}_header`}
                    />
                }
                renderItem={({ item, index }) =>
                    <View style={{ padding: 20 }}>
                        <SkeletonPlaceholder>
                            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                                <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />

                                <SkeletonPlaceholder.Item marginLeft={20}>
                                    <SkeletonPlaceholder.Item width={250} height={20} borderRadius={4} marginBottom={6} />

                                    <SkeletonPlaceholder.Item width={100} height={20} borderRadius={4} />
                                </SkeletonPlaceholder.Item>

                            </SkeletonPlaceholder.Item>
                        </SkeletonPlaceholder>
                    </View>
                }
                keyExtractor={item => item}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: "#D4D4D4",
        height: 55,
        width: '89%',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 35,
        // elevation: 10
    },
    buttonTitleStyle: {
        textAlign: "center",
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 16,
        color: "#fff"
    },
})

export default ChatsSkeleton;