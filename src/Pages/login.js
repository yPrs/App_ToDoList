import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Login(){
    const navigation = useNavigation();

    return(
        <View style={{flex: 1}}>
            
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
                    />
                    <Text style={estilo.Label}>Senha</Text>
                    <TextInput
                        placeholder="Sua senha pessoal"
                        style={estilo.Input}
                    />

                    <TouchableOpacity style={estilo.Botao}>
                        <Text style={estilo.TextoBotao}>Log in</Text>
                    </TouchableOpacity>
                </View>
                
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
        color: '#CCC',
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
    }
})