import React, { createContext, useState } from "react";

export const AuthContexto = createContext({})

export default function AuthProvider({children}){
    const [Usuario, setUsuario] = useState({
        
    });
    
    return(
        <AuthContexto.Provider value={{ Usuario, setUsuario }}>
            {children}
        </AuthContexto.Provider>
    )
}