import React from 'react';

import * as Clipboard from 'expo-clipboard';

import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import { AntDesign, Entypo, Feather } from '@expo/vector-icons';

export const ModalLink = ({ OncloseModal, onShare, link, linkEncurted }) => {

    const callClipboard = () => {
        Clipboard.setString(linkEncurted);
        alert('Link copiado com sucesso!');
    }

    return (

        <View style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={OncloseModal}>
                <View style={{ flex: 1, backgroundColor: 'rgba(1,1,1,0.2)' }}></View>
            </TouchableWithoutFeedback>

            <View style={styles.container}>

                <View style={styles.header}>
                    <AntDesign name="close" size={35} color="black" onPress={OncloseModal} />
                    <Entypo name='share-alternative' color='#000' size={29} onPress={onShare} />
                </View>

                <View style={styles.areaTxt}>
                    <Text style={{ fontSize: 35, fontWeight: 'bold', color: '#1ddbb9' }}>Link Encurtado:</Text>
                    <Text style={{ fontSize: 18, color: 'gray', marginTop: 10 }}>{link}</Text>
                </View>

                <View style={styles.areaLink} onPress={callClipboard}>
                    <Text style={{ color: '#FFF', fontSize: 18 }} numberOfLines={1} >{linkEncurted}</Text>

                    <Feather name='copy' size={25} color='#FFF' onPress={callClipboard} />
                </View>

            </View>

        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FFF',
        height: 350,
        position: 'absolute',
        bottom: 0
    },

    header: {
        flexDirection: 'row',
        width: '100%',
        height: 45,
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        marginTop: 30
    },

    areaTxt: {
        paddingHorizontal: 30,
        marginTop: 40,
        marginBottom: 20
    },

    areaLink: {
        backgroundColor: '#132742',
        height: 50,
        width: 345,
        alignSelf: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 7,
        marginBottom: 25
    }
})