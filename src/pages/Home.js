import React, { useState } from 'react';

import { StyleSheet, SafeAreaView, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Modal, Share } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Header } from '../components/Header';
import { StatusBarApp } from '../components/StatusBar';

import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { ModalLink } from '../components/ModalLink';

import { api } from '../services/api';

import { saveLink } from '../libs/Storage';

export const Home = () => {

    const [link, setlink] = useState('');
    const [apiEncurted, setApiEncurted] = useState();

    const [showModal, setShowModal] = useState(false);

    const callModalLink = async () => {

        if (link == '') {
            return alert('Favor inserir seu link')
        }

        try {

            const response = await api.post('/shorten', { long_url: link });

            setApiEncurted(response.data.link);

            saveLink('sujeitolinks', response.data);

            setShowModal(true);


        } catch (error) {
            console.log('Ops parece que algo deu errado.');

        }

    }

    const hundleModalClose = () => {
        setShowModal(false);
        setlink('');

    };

    const dismissKey = () => {
        Keyboard.dismiss();
    }

    return (
        <LinearGradient colors={['#1ddbb9', '#132742']} style={{ flex: 1, justifyContent: 'center' }}>
            <StatusBarApp backgroundColor='#1ddbb9' barStyle='dark-content' />

            <TouchableWithoutFeedback onPress={dismissKey} >
                <SafeAreaView style={styles.container}>

                    <Header />

                    <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : 'position'} enabled>


                        <View style={styles.areaTxt}>

                            <MaterialCommunityIcons name='message' color={'#FFF'} size={120} />

                            <View>
                                <Text style={styles.txtTitle}>EncurtLink</Text>
                                <Text style={styles.txtSubTitle}>Cole seu link para encurtar</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 120 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.boxInput} >
                                    <Feather name='link' size={25} color={'#FFF'} style={styles.icon} />
                                </View>
                                <TextInput value={link} style={styles.input} placeholder='Cole seu link aqui...' autoCapitalize={'none'} placeholderTextColor={'#FFF'} onChangeText={text => setlink(text)} />
                            </View>

                            <TouchableOpacity style={styles.button} onPress={callModalLink}>
                                <Text style={styles.buttonTxt}>Gerar Link</Text>
                            </TouchableOpacity>
                        </View>

                        <Modal animationType='slide' visible={showModal} transparent={true}>

                            <ModalLink
                                OncloseModal={hundleModalClose}
                                onShare={async () => await Share.share({ url: 'o link' })}
                                link={link}
                                linkEncurted={apiEncurted}
                            />

                        </Modal>



                    </KeyboardAvoidingView>
                </SafeAreaView>
            </TouchableWithoutFeedback>



        </LinearGradient>

    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    areaTxt: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 20
    },

    txtTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 20
    },

    txtSubTitle: {
        color: '#FFF',
        fontSize: 15,
        textAlign:'center'
    },

    input: {
        height: 50,
        width: 300,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'rgba(161,204,206, 0.5)',
        borderBottomRightRadius: 7,
        borderTopRightRadius: 7,
        fontSize: 18,
        color: '#FFF'
    },

    boxInput: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(161,204,206, 0.5)',
        borderTopLeftRadius: 7,
        borderBottomLeftRadius: 7
    },

    icon: {
        left: 10
    },

    button: {
        width: 350,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },

    buttonTxt: {
        fontSize: 18
    }
})