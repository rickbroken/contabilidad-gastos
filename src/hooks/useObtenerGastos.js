import {useState, useEffect} from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useAuth } from '../contextos/AuthContext';



const useObtenerGastos = () => {
    const [gastos, cambiarGastos] = useState([]);
    const {usuario} = useAuth()

    useEffect(()=>{
        const datoPorUsuario = query(collection(db, 'gastos'), where('uidUsuario', '==', usuario.uid))
        const unsuscribe = onSnapshot(datoPorUsuario, (snapshot) => {
            cambiarGastos(snapshot.docs.map((gasto)=>{
                return {...gasto.data(), id: gasto.id}
            }));
          });

        return unsuscribe;
    },[usuario])

    return [gastos];
}
 
export default useObtenerGastos;