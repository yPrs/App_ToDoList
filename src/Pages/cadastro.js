import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ImageBackground } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { auth } from "../Firebase/FirebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Cadastro(){
    const navigation = useNavigation();

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
             setMostrarMensagemErro("Senha fraca, (minímo 6 caracteres)")
             setInterval(() => {
                 setMostrarMensagemErro('')
             }, 5000)
             return
        } else{
            createUserWithEmailAndPassword(auth, ValorEmail, ValorSenha)
            .then(() => {
                setMostrarMensagemConfirmacao("Conta criada")
                setTimeout(() => {
                    setMostrarMensagemConfirmacao('')
                }, 5000)
                setPrimeiroNome('')
                setUltimoNome('')
                setValorEmail('')
                setValorSenha('')
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
                    <View style={estilo.MensagemConfirmacao}>
                        <Text style={{fontSize: 16, color: "#008000", fontWeight: '600'}}>
                            {MostrarMensagemConfirmacao}
                        </Text>
                    </View>
                ): null}

                {MostrarMensagemErro ? (
                    <View style={estilo.MensagemErro}>
                        <Text style={{fontSize: 16, color: "#8B0000", fontWeight: '600'}}>
                            {MostrarMensagemErro}
                        </Text>
                    </View>
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
        width: 200,
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
        height: 60, width: 350, backgroundColor: "#90EE90", 
        borderWidth: 2, borderColor: "#008000", borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10, borderTopLeftRadius: 10, justifyContent: 'center',
        alignItems: 'center', marginTop: -60
    },
    MensagemErro:{
        height: 60, width: 350, backgroundColor: "#FF6666", 
        borderWidth: 2, borderColor: "#8B0000", borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10, borderTopLeftRadius: 10, justifyContent: 'center',
        alignItems: 'center', marginTop: -60,
    }
})