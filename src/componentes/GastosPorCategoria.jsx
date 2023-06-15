import React from 'react';
import { Header, Titulo } from './../elementos/Header';
import { Helmet } from 'react-helmet';
import BtnRegresar from '../elementos/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';
import useObtenerGastosDelMes from '../hooks/useObtenerGastosDelMes';


const GastosPorCategoria = () => {
  const [gastos] = useObtenerGastosDelMes();

  console.log(gastos);
  return ( 
    <>
      <Helmet>
        <title>Gastos por Categoria</title>
      </Helmet>

      <Header>
          <BtnRegresar />
          <Titulo>Gastos por Categoria</Titulo>
      </Header>

      <BarraTotalGastado />
    </>
   );
}
 
export default GastosPorCategoria;