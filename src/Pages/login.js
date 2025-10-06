import React, { useState, useRef } from "react";
import {
    View, Text, StyleSheet, TouchableOpacity, 
    Image, TextInput, ImageBackground, ActivityIndicator,
    Modal
 } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../Firebase/FirebaseConnection";
import { signInWithEmailAndPassword } from 'firebase/auth';
import * as Animatable from 'react-native-animatable';

export default function Login(){
    const navigation = useNavigation();

    const BotaoRef = useRef(null)
    const [ValorEmail, setValorEmail] = useState('')
    const [ValorSenha, setValorSenha] = useState('')
    const [MensagemErro, setMensagemErro] = useState('')
    const [MensagemConfirmacao, setMensagemConfirmacao] = useState('')
    const [MostrarSenha, setMostrarSenha] = useState(false)
    const [Carregar, setCarregar] = useState(false)

    function FazerLogin(){
        if(ValorEmail === '' || ValorSenha === ''){
            setMensagemErro('Necessário digitar em todos os campos')
            setTimeout(() => {
                setMensagemErro('')
            }, 5000)
            return
        }

        setMensagemConfirmacao('')
        setMensagemErro('')

        signInWithEmailAndPassword(auth, ValorEmail, ValorSenha)
        .then(() => {
            setCarregar(true) // Loading só aparece quando login deu certo
            setValorEmail('')
            setValorSenha('')
            
             setTimeout(() => {
                setCarregar(false) // Remove o loading
                navigation.navigate('Home')
             }, 3000)
        })
        .catch(erro => {
            switch(erro.code){
                case "auth/invalid-credential":
                    setMensagemErro('E-mail ou senha incorretos')
                    setTimeout(() => {
                        setMensagemErro('')
                    }, 5000)
                    break;
                case "auth/user-not-found":
                    setMensagemErro('Usuário não encontrado')
                    setTimeout(() => {
                        setMensagemErro('')
                    }, 5000)
                    break;
                case "auth/wrong-password":
                    setMensagemErro('Senha incorreta')
                    setTimeout(() => {
                        setMensagemErro('')
                    }, 5000)
                    break;
            }
        })
    }

    return(
        <View style={{flex: 1}}>
            {/* Modal de Loading */}
            <Modal 
                visible={Carregar}
                animationType="fade"
            >
                    <View style={estilo.ModalContainer}>
                        <ActivityIndicator color={'#121212'} size={60}/>
                    </View>
            </Modal>
            
                 <ImageBackground
                    source={require('../../assets/ImageFundo1.png')}
                    style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%'}}
                    resizeMode="cover"
                    >
                    {/* Conteúdo dentro da imagem de fundo */}
                    <Image
                        source={require('../../assets/Logotipo.png')}
                        style={{width: 120, height: 120, resizeMode: 'contain',}}
                    />
                </ImageBackground>
        

            <View style={{
                flex: 2, backgroundColor:'#FFF', borderTopLeftRadius: 50, 
                justifyContent: 'space-around', alignItems: 'center'
            }}>
                <Text style={estilo.Titulo}>Login</Text>

                <View style={estilo.AreaInput}>
                    <Text style={estilo.Label}>Email</Text>
                    <TextInput
                        placeholder="Email@Exemplo.com"
                        style={estilo.Input}
                        value={ValorEmail}
                        onChangeText={(email) => setValorEmail(email)}
                    />
                    <Text style={estilo.Label}>Senha</Text>
                    <TextInput
                        placeholder="Sua senha pessoal"
                        style={estilo.Input}
                        value={ValorSenha}
                        onChangeText={(senha) => setValorSenha(senha)}
                        secureTextEntry={MostrarSenha}
                    />

                    <TouchableOpacity onPress={() => setMostrarSenha(!MostrarSenha)}>
                        {
                            MostrarSenha ?
                            <Text>Mostrar senha</Text>
                            :
                            <Text>Ocultar senha</Text>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity style={estilo.Botao} onPress={FazerLogin}>
                        <Text style={estilo.TextoBotao}>Log in</Text>
                    </TouchableOpacity>

                </View>
                    {MensagemConfirmacao ? (
                        <Animatable.View
                            style={estilo.MostrarMensagemConfirmacao}
                            ref={BotaoRef}
                            animation='fadeIn'
                            duration={1000}
                            delay={200}
                            easing='ease-out'
                        >
                            <Text style={{fontSize: 16, color: "#008000", fontWeight: '600'}}>
                                {MensagemConfirmacao}
                            </Text>
                        </Animatable.View>
                    ): null}

                    {MensagemErro ? (
                        <Animatable.View
                            style={estilo.MostrarMensagemErro}
                            ref={BotaoRef}
                            animation='fadeIn'
                            duration={1000}
                            delay={200}
                            easing='ease-out'
                        >
                            <Text style={{fontSize: 16, color: "#8B0000", fontWeight: '600'}}>
                                {MensagemErro}
                            </Text>
                        </Animatable.View>
                    ): null}
                
                <View style={estilo.AreaIrParaCadastro}>
                    <Text style={estilo.TextoCadastro}>Não tem uma conta?</Text>
                    <TouchableOpacity style={{marginLeft: 10, marginBottom: 20}} 
                        onPress={() => navigation.navigate('Cadastro')}
                    >
                        <Text style={estilo.TextoBotaoCadastro}>Cadastra-se</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const estilo = StyleSheet.create({
    Titulo:{
        fontSize: 44,
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
    TextoBotaoCadastro:{
        fontSize:16,
        fontWeight: 'bold'
    },
    MostrarMensagemConfirmacao:{
        height: 60, maxWidth: "90%", minWidth: 200, backgroundColor: "#90EE90", 
        borderWidth: 2, borderColor: "#008000", borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10, borderTopLeftRadius: 10, justifyContent: 'center',
        alignItems: 'center', marginTop: -50,
    },
    MostrarMensagemErro:{
        height: 60, backgroundColor: "#FF6666", 
        borderWidth: 2, borderColor: "#8B0000", borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10, borderTopLeftRadius: 10, justifyContent: 'center',
        alignItems: 'center', marginTop: -50, maxWidth: "90%", minWidth: 200, padding: 15
    },
    ModalContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})