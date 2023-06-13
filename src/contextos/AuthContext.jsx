import React from 'react';

//Creamos contexto
const AuthContext = React.createContext();

const AuthProvider = ({children}) => {
    return ( 
        <AuthContext.Provider value={{usuario: true}}>
            {children}
        </AuthContext.Provider>
     );
}
 
export {AuthProvider, AuthContext};