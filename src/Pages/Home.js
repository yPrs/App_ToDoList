import React, { useContext } from "react";
import { View, Text } from "react-native";
import { AuthContexto } from "../Contexts/Context"

export default function Home(){
    const {Usuario} = useContext(AuthContexto)

    return(
        <View style={{flex:11, justifyContent: 'space-around', alignItems: 'center'}}>
            <Text>Bem vindo: </Text>
        </View>
    )
}