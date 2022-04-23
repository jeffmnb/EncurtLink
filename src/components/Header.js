import React from 'react';

import { StyleSheet, View, Text, TouchableOpacity, Share } from 'react-native';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

export const Header = ({ ...props }) => {

    const Navigation = useNavigation();

    return (
        <View style={styles.container}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                <Feather name='menu' size={35} color='white' onPress={() => Navigation.openDrawer()} />

                <Feather name='share-2' size={32} color='white' onPress={async () => await Share.share({ message: 'Baixe ja esse app maneiro!' })} />

            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        marginTop: getStatusBarHeight() + 15,
        top: 0,
        width: '100%',
        height: 50,
        justifyContent: 'space-between',
        paddingHorizontal: 25
    }
})