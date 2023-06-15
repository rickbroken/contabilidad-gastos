import React, { useContext, useEffect, useState } from 'react';
import useObtenerGastosDelMes from '../hooks/useObtenerGastosDelMes';


const TotalGastadoContext = React.createContext();

const useTotalDelMes = () => useContext(TotalGastadoContext);

const TotalGastadoProvider = ({children}) => {

    const [total, cambiarTotal] = useState(0);
    const gastos = useObtenerGastosDelMes();

    useEffect(()=>{
        let acumulado = 0;
        if(gastos.length !== undefined){
            gastos.map((gasto)=>{
                acumulado += Number(gasto.cantidad);
            });
        }

        cambiarTotal(acumulado);
        console.log(acumulado);
        
    },[gastos])

    return(
        <TotalGastadoContext.Provider value={{total: total}}>
            {children}
        </TotalGastadoContext.Provider>
    );
}

export {TotalGastadoProvider, useTotalDelMes};