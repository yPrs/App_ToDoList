import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Acessos(){
    const navigation = useNavigation();
    
    return(
        <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#FFF'}}>

                <View style={{ alignSelf: 'flex-start', marginLeft: 50}}>
                    <Image
                        source={require('../../assets/Logotipo.png')}
                        style={{width: 200, height: 200, marginLeft: -50}}
                        resizeMode="contain"
                    />
                    <Text style={estilo.Titulo}>Bem Vindo ao ...</Text>
                </View>

                <View style={{marginTop: 50}}>
                    <TouchableOpacity style={estilo.BotaoCadastro} onPress={() => navigation.navigate('Cadastro')}>
                        <Text style={estilo.TextoBotaoCadastro}>Criar Conta</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={estilo.BotaoLogin} onPress={() => navigation.navigate('Login')}>
                        <Text style={estilo.TextoBotaoLogin}>Fazer Login</Text>
                    </TouchableOpacity>
                </View>
        </View>
    )
}

const estilo = StyleSheet.create({
    Titulo:{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
    },
    BotaoCadastro:{
        height: 60,
        width: 350,
        backgroundColor: '#000',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    TextoBotaoCadastro:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF'
    },
    BotaoLogin:{
        height: 60,
        width: 350,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    TextoBotaoLogin:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000'
    }
})