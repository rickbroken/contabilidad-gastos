import {useState, useEffect} from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, onSnapshot, orderBy, query, where, limit, startAfter } from 'firebase/firestore';
import { useAuth } from '../contextos/AuthContext';



const useObtenerGastos = () => {
    const [gastos, cambiarGastos] = useState([]);
    const {usuario} = useAuth()
    const [ultimoGasto, cambiarUltimoGasto] = useState(null);
    const [hayMasPorCargar, cambiarHayMasPorCargar] = useState(false);

    const obtenerMasGastos = () => {
        const consulta = query(
            collection(db, 'gastos'),
            where('uidUsuario', '==', usuario.uid),
            orderBy('fecha', 'desc'),
            limit(10),
            startAfter(ultimoGasto)
        );

        const unsuscribe = onSnapshot(consulta, (snapshot) => {
            if(snapshot.docs.length > 0){
                cambiarUltimoGasto(snapshot.docs[snapshot.docs.length - 1]);
                
                cambiarGastos(gastos.concat(snapshot.docs.map((gasto)=>{
                    return {...gasto.data(), id: gasto.id}
                })));
            } else {
                cambiarHayMasPorCargar(false);
            }
            
        })
        return unsuscribe;
    }

    useEffect(()=>{
        const consulta = query(
            collection(db, 'gastos'),
            where('uidUsuario', '==', usuario.uid),
            orderBy('fecha', 'desc'),
            limit(10)
        );

        const unsuscribe = onSnapshot(consulta, (snapshot) => {
            if(snapshot.docs.length > 0){
                cambiarUltimoGasto(snapshot.docs[snapshot.docs.length - 1]);

                cambiarHayMasPorCargar(true);
            } else {
                cambiarHayMasPorCargar(false);
            }

            cambiarGastos(snapshot.docs.map((gasto)=>{
                return {...gasto.data(), id: gasto.id}
            }));
          });

        return unsuscribe;
    },[usuario])

    return {gastos, hayMasPorCargar, obtenerMasGastos};
}
 
export default useObtenerGastos;