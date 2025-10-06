import React, { createContext, useState, useEffect } from 'react';
import { db } from '../Firebase/FirebaseConnection';
import { onSnapshot, doc } from 'firebase/firestore';

export const AuthContext = createContext({});

export default function AuthProvider({children}){
    const [NomeDoBanco, setNomeDoBanco] = useState('')

    useEffect( () => {
        async function PegarDadosBanco(){
            onSnapshot(doc(db, "Usuarios", "1"), (doc) => {
                 setNomeDoBanco(doc.data().PrimeiroNome)
            })
        }
        PegarDadosBanco();
    })

    return(
        <AuthContext.Provider value={{NomeDoBanco}}>
            {children}
        </AuthContext.Provider>
    )
}
