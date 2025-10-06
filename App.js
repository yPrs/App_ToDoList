import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Rotas from './src/Routes/rotas';
import AuthProvider from "./src/Contexts/ContextUser";

export default function App(){
  return(
      <AuthProvider>
          <Rotas/>
      </AuthProvider>
  )
}