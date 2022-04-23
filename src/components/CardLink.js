import React from 'react';

import { StyleSheet, Text, TouchableOpacity, Animated, View } from 'react-native';

import { Feather } from '@expo/vector-icons';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';

export const CardLink = ({ text, onpress, onDelete }) => {
    return (

        <Swipeable overshootRight={false} renderRightActions={() => (
            <Animated.View >

                <View>
                    <RectButton style={styles.buttonTrash} onPress={onDelete}>
                        <Feather name='trash' size={25} color={'#FFF'} style={{left:3}}/>
                    </RectButton>
                </View>

            </Animated.View>
        )}>

            <RectButton style={styles.container} onPress={onpress}>

                <Feather name='link' size={25} color='#FFF' />
                <Text style={styles.txtCard} numberOfLines={1}>{text}</Text>

            </RectButton>

        </Swipeable>
    )
};

const styles = StyleSheet.create({
    container: {
        width: 350,
        height: 55,
        alignSelf: 'center',
        borderRadius: 7,
        backgroundColor: 'rgba(161,204,206, 0.5)',
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        marginBottom: 16
    },

    txtCard: {
        color: '#FFF',
        fontSize: 19,
        marginLeft: 20
    },

    buttonTrash: {
        width: 65,
        height: 55,
        backgroundColor: '#FF5555',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        position: 'relative',
        right: 40,
    }
})