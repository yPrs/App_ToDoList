import React, { createContext, useState } from 'react';

// 1. Cria o contexto com um valor inicial (pode ser um objeto vazio)
export const UserContext = createContext({});

// 2. Cria o componente Provider
function UserProvider({ children }) {
    const [userName, setUserName] = useState('');

    return (
        <UserContext.Provider value={{ userName, setUserName }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;