import React, { useState, useRef, createContext, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ImageBackground } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import * as Animatable from 'react-native-animatable';
import { auth, db } from "../Firebase/FirebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

export default function Cadastro(){
    const navigation = useNavigation();

    const BotaoRef = useRef(null)

    const [PrimeiroNome, setPrimeiroNome] = useState('')
    const [UltimoNome, setUltimoNome] = useState('')
    const [ValorEmail, setValorEmail] = useState('')
    const [ValorSenha, setValorSenha] = useState('')
    const [MostrarMensagemConfirmacao, setMostrarMensagemConfirmacao] = useState('')
    const [MostrarMensagemErro, setMostrarMensagemErro] = useState('')

    function CriarConta(){
        setMostrarMensagemConfirmacao('')
        setMostrarMensagemErro('')

        if(ValorEmail === '' || ValorSenha === '' || PrimeiroNome === '' || UltimoNome === ''){
            setMostrarMensagemErro("Necessário digitar em todos os campos")
            setTimeout(() => {
                setMostrarMensagemErro('')
            }, 5000)
         } else if(ValorSenha.length < 6){
             setMostrarMensagemErro("Senha fraca (minímo 6 caracteres)")
             setInterval(() => {
                 setMostrarMensagemErro('')
             }, 5000)
             return
        } else{
            createUserWithEmailAndPassword(auth, ValorEmail, ValorSenha)
            .then(async (userCredential) =>{
                    await addDoc(collection(db, "Usuarios"), {
                        PrimeiroNome: PrimeiroNome,
                        UltimoNome: UltimoNome,
                        Email: ValorEmail,
                        Senha: ValorSenha
                    })
                    
                    setPrimeiroNome('')
                    setUltimoNome('')
                    setValorEmail('')
                    setValorSenha('')

                    setMostrarMensagemConfirmacao("Conta criada")
                    setTimeout(() => {
                        setMostrarMensagemConfirmacao('')
                    }, 5000)
                })
                
            .catch(erro => {
                switch(erro.code){
                    case "auth/email-already-in-use":
                        setMostrarMensagemErro('Este e-mail já está sendo usado')
                        setTimeout(() => {
                            setMostrarMensagemErro('')
                        }, 5000)
                        setValorEmail('')
                        break;
                }
            })
        }
    }

    return(
        <View style={{flex: 1}}>

            <ImageBackground
                source={require('../../assets/ImageFundo1.png')}
                style={{flex: 1, justifyContent: 'space-around', alignItems: 'center', width: '100%',
                     flexDirection: 'row', 
                }}
                resizeMode="cover"
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons
                        name='arrow-back-outline'
                        size={30}
                        color='#FFF'
                    />
                </TouchableOpacity>
                <Text style={estilo.Titulo}>Cadastra - se</Text>
                <Text></Text>
            </ImageBackground>
            
            <View style={{flex: 4, justifyContent: 'space-around', alignItems: 'center'}}>
                <View style={estilo.AreaInput}>
                    <Text style={estilo.Label}>Primeiro nome</Text>
                    <TextInput
                        placeholder="Primeiro Nome"
                        style={estilo.Input}
                        value={PrimeiroNome}
                        onChangeText={(PrimeiroNome) => setPrimeiroNome(PrimeiroNome)}
                    />
                    <Text style={estilo.Label}>Ultimo nome</Text>
                    <TextInput
                        placeholder="Ultimo nome"
                        style={estilo.Input}
                        value={UltimoNome}
                        onChangeText={(UltimoNome) => setUltimoNome(UltimoNome)}
                    />
                    <Text style={estilo.Label}>Email</Text>
                    <TextInput
                        placeholder="Exemplo@Email.com"
                        style={estilo.Input}
                        value={ValorEmail}
                        onChangeText={(ValorEmail) => setValorEmail(ValorEmail)}
                    />
                    <Text style={estilo.Label}>Crie uma senha</Text>
                    <TextInput
                        placeholder="*****"
                        style={estilo.Input}
                        value={ValorSenha}
                        onChangeText={(ValorSenha) => setValorSenha(ValorSenha)}
                    />

                    <TouchableOpacity style={estilo.Botao} onPress={CriarConta}>
                        <Text style={estilo.TextoBotao}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>

                {MostrarMensagemConfirmacao ? (
                    <Animatable.View 
                        style={estilo.MensagemConfirmacao}
                        ref={BotaoRef}
                        animation='fadeIn'
                        duration={800}
                        delay={200}
                        easing='ease-out'
                    >
                        <Text style={{fontSize: 16, color: "#008000", fontWeight: '600'}}>
                            {MostrarMensagemConfirmacao}
                        </Text>
                    </Animatable.View>
                ): null}

                {MostrarMensagemErro ? (
                    <Animatable.View 
                        style={estilo.MensagemErro}
                        ref={BotaoRef}
                        animation='fadeIn'
                        duration={1000}
                        delay={300}
                        easing='ease-out'
                    >
                        <Text style={{fontSize: 16, color: "#8B0000", fontWeight: '600'}}>
                            {MostrarMensagemErro}
                        </Text>
                    </Animatable.View>
                ): null}

                <View style={estilo.AreaIrParaCadastro}>
                    <Text style={estilo.TextoCadastro}>Já tem uma conta?</Text>
                    <TouchableOpacity style={{marginLeft: 10, marginBottom: 20}} 
                        onPress={() => navigation.navigate('Login')}
                    >
                    <Text style={estilo.TextoBotaoLogin}>Faça Login</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    )
}

const estilo = StyleSheet.create({
    Titulo:{
        color: '#FFF',
        fontSize: 40,
    },

    Label:{
        fontSize: 22,
        fontWeight:'600',
        marginBottom: 5
    },
    Input:{
        height: 60,
        width: 300,
        fontSize:20,
        marginBottom: 15,
        borderBottomColor: '#CCC',
        borderBottomWidth: 2
    },
    Botao:{
        height:60,
        width: 300,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    TextoBotao:{
        fontSize: 16,
        color: '#FFF',
    },
    AreaIrParaCadastro:{
        flexDirection: "row"
    },
    TextoCadastro:{
        fontSize: 16
    },
    TextoBotaoLogin:{
        fontSize:16,
        fontWeight: 'bold'
    },
    MensagemConfirmacao:{
        height: 60, maxWidth: "90%", minWidth: 200, backgroundColor: "#90EE90", 
        borderWidth: 2, borderColor: "#008000", borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10, borderTopLeftRadius: 10, justifyContent: 'center',
        alignItems: 'center', marginTop: -60,
    },
    MensagemErro:{
        height: 60, backgroundColor: "#FF6666", 
        borderWidth: 2, borderColor: "#8B0000", borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10, borderTopLeftRadius: 10, justifyContent: 'center',
        alignItems: 'center', marginTop: -60, maxWidth: "90%", minWidth: 200, padding: 15
    }
})