import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png'

import styles from './styles'

export default function Detail() {
    const navigation = useNavigation();

    const route = useRoute();
    const incident = route.params.incident;

    const message = `Olá ${incident.nome}, estou entrando em contato, pois gostaria de ajudar no caso
        "${incident.titulo}" com o valor de ${Intl.NumberFormat('pt-BR',
        {
            style: 'currency',
            currency: 'BRL'
        }).format(incident.valor)}.`;

    function navigateBack() {
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.titulo}`,
            recipients: [incident.email],
            body: message,
        });
    }

    function sendWhatsapp() {
        // Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
        // Linking.openURL(`whatsapp://send?phone=5584981599453&text=${message}`);
        Linking.openURL(`whatsapp://send?phone=5584994843694&text=${message}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.nome} de {incident.cidade}/{incident.uf}</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.descricao}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR',
                    {
                        style: 'currency',
                        currency: 'BRL'
                    })
                    .format(incident.valor)}
                </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitulo}>Salve o dia!</Text>
                <Text style={styles.heroTitulo}>Seja o herói deste caso</Text>

                <Text style={styles.heroDescricao}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}