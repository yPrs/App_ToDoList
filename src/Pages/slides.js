import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useNavigation } from '@react-navigation/native';

const slides = [
  {
    key: '1',
    image: require('../../assets/Slider_1.png')
  },
  {
    key: '2',
    image: require('../../assets/Slider_2.png')
  },
  {
    key: '3',
    image: require('../../assets/Slider_3.png')
  }
]

export default function Slide() {
    const navigation = useNavigation();

    function renderSlides({item}){
      return(
        <View style={{
          flex:1, justifyContent: 'center', 
          alignItems: 'center',backgroundColor: '#FFF'
        }}>
          <Image
            source={item.image}
            style={{width: '100%', height: '80%', resizeMode: 'contain'}}
          />
        </View>
      )
    }
    return(
          <AppIntroSlider
            data={slides}
            renderItem={renderSlides}
            activeDotStyle={{
              backgroundColor: '#0A0203',
              width: 30
            }}
            showPrevButton={true}
            renderNextButton={() => <Text style={estilo.ProxPrevBotao}>Próximo</Text>}
            renderPrevButton={() => <Text style={estilo.ProxPrevBotao}>Voltar</Text>}
            renderDoneButton={() => (
              <View style={estilo.FinalBotao}>
                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 16 }}>
                  Acessar
                </Text>
              </View>
            )}
            onDone={() => navigation.navigate('Acessos')}
          />
    );  
  }

  const estilo = StyleSheet.create({
    ProxPrevBotao:{
      fontSize: 16,
      color: '#0A0203',
      fontWeight:'bold'
    },
    FinalBotao:{
      height: 50,
      width: 100,
      backgroundColor: '#0A0203',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    }
  })