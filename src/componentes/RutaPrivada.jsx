import React from 'react';
import { useAuth } from '../contextos/AuthContext';
import {Route, useNavigate} from 'react-router-dom';

const RutaPrivada = ({children, ...restoDePropiedades}) => {
    const navigate = useNavigate();
    const {usuario} = useAuth();

    
    if(usuario){
        return <Route {...restoDePropiedades}>{children}</Route>
    } else {
        navigate('/');
    }
}
 
export default RutaPrivada;