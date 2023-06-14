import React from 'react';
import { Header, Titulo } from './../elementos/Header';
import { Helmet } from 'react-helmet';
import BtnRegresar from '../elementos/BtnRegresar';
import { useAuth } from '../contextos/AuthContext';
import BarraTotalGastado from './BarraTotalGastado';
import useObtenerGastos from '../hooks/useObtenerGastos';

const ListaDeGastos = () => {

  const [gastos] = useObtenerGastos();

  console.log(gastos);
  const {usuario} = useAuth();

  //console.log(usuario);
  return ( 
    <>
      <Helmet>
        <title>Lista de Gastos</title>
      </Helmet>

      <Header>
          <BtnRegresar />
          <Titulo>Lista de Gastos</Titulo>
      </Header>

      <BarraTotalGastado />
    </>
   );
}
 
export default ListaDeGastos;