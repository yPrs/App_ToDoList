import React, { useContext } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import { AuthContext } from "../Contexts/ContextUser";

export default function Home(){

    const {NomeDoBanco} = useContext(AuthContext)

    return(
        <View style={{flex:1, justifyContent: 'space-around', alignItems: 'center'}}>
                <Text style={estilo.MensagemBemVindo}>Bem vindo {NomeDoBanco}</Text>
                <Text>Seus projetos</Text>
            
        </View>
    )
}

const estilo = StyleSheet.create({
    MensagemBemVindo:{
        fontSize: 24,
        fontWeight: '600'
    },
})