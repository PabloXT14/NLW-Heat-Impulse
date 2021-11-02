import React from 'react';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';

import { AuthProvider } from './src/hooks/auth';
import { Home } from './src/screens/Home';


export default function App() {
  //Componente que carrega as fontes personalizadas
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });

  //Se não carregar as fonts fica na tela de splach.png
  if (!fontsLoaded) {
    return <AppLoading />
  }


  return (
    <AuthProvider>
      <StatusBar
        style="light"
        translucent//para podermos ver o fundo da aplicacao na statusbar
        backgroundColor="transparent"
      />
      <Home />
    </AuthProvider>

  );
}


