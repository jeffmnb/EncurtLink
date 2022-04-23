import React, { useEffect, useState } from 'react';

import { StyleSheet, SafeAreaView, Text, View, FlatList, Modal, Share, Alert } from 'react-native';

import { StatusBarApp } from '../components/StatusBar';

import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { CardLink } from '../components/CardLink';
import { ModalLink } from '../components/ModalLink';
import { deleteLink, getLinkSave } from '../libs/Storage';

import { LinearGradient } from 'expo-linear-gradient';

export const MyLinks = () => {

    const [data, setData] = useState();

    const [showModal, setShowModal] = useState(false);

    const [linkEncurted, setLinkEncurted] = useState('');
    const [linkLong, setLinkLong] = useState('');


    const Navigation = useNavigation();

    useEffect(() => {
        const getLinksStored = async () => {

            const linksStored = await getLinkSave('sujeitolinks');

            setData(linksStored);


        };

        getLinksStored();
    }, [data]);


    const callModal = (item) => {
        setLinkEncurted(item.link);
        setLinkLong(item.long_url);
        setShowModal(true)
    };

    const hundleDeleteLink = async (item) => {

        Alert.alert('Remover', 'Deseja remover este link?', [
            {
                text: 'Não',
                style: 'cancel'
            },

            {
                text: 'Sim',
                onPress: async () => {
                    const result = await deleteLink(data, item.id);

                }
            }
        ])


    }

    return (

        <SafeAreaView style={styles.container}>
            <StatusBarApp backgroundColor='#1ddbb9' barStyle='dark-content'/>

            <LinearGradient style={styles.container} colors={['#1ddbb9', '#132742']}>

                {/* Area do Header */}
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        <Feather name='menu' size={35} color='white' onPress={() => Navigation.openDrawer()} />
                    </View>

                </View>

                {/* texto Meus Links */}
                <Text style={{ color: '#FFF', fontSize: 40, fontWeight: 'bold', alignSelf: 'flex-start', marginLeft: 27, position: 'absolute', top: 115 }}>Meus links</Text>

                {/* area do txtExiste */}

                {numLink &&

                    <View style={{ width: '100%', height: 100, top: 200, marginTop: 300, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 25, textAlign: 'center', lineHeight: 35 }}>Você ainda não possui {'\n'} nenhum link salvo :(</Text>
                    </View>

                }

                {/* area dos links */}
                <View style={{ width: '100%', height: 700, marginTop: 390, }}>

                    <FlatList
                        keyExtractor={(item) => String(item.id)}
                        data={data}
                        renderItem={({ item }) => (
                            <CardLink text={item.link} onpress={() => callModal(item)} onDelete={() => hundleDeleteLink(item)} />
                        )}
                        showsVerticalScrollIndicator={false}
                    />

                </View>

                {/* area do Modal */}
                <Modal visible={showModal} animationType='slide' transparent={true}>

                    <ModalLink OncloseModal={() => setShowModal(false)} onShare={async () => await Share.share({ message: linkEncurted })} link={linkLong} linkEncurted={linkEncurted} />

                </Modal>

            </LinearGradient>


        </SafeAreaView>

    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        width:'100%'
    },

    header: {
        position: 'absolute',
        marginTop: getStatusBarHeight() + 15,
        top: 0,
        width: '100%',
        height: 50,
        justifyContent: 'space-between',
        paddingHorizontal: 25
    },


})