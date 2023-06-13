import { useEffect, useState } from 'react';
import { useAuth } from '../contextos/AuthContext';
import {useNavigate} from 'react-router-dom';

const RutaProtegida = ({children}) => {
    const navigate = useNavigate();
    const {usuario} = useAuth();
    const [data, setData] = useState('');

    useEffect(()=>{
        if(usuario){
            setData(children);
        } else if(usuario === null || usuario === false) {
            navigate('/iniciar-sesion');
        }
    },[usuario,children,navigate]);


    return data;
}
 
export default RutaProtegida;