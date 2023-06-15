import React from 'react';
import FormularioGasto from './FormularioGasto';
import { useParams } from 'react-router-dom';
import useObtenerGasto from '../hooks/useObtenerGasto';
import { Helmet } from 'react-helmet';
import {Header, Titulo} from './../elementos/Header';
import BtnRegresar from '../elementos/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';

const EditarGasto = () => {

  const {id} = useParams();
  const [gasto] = useObtenerGasto(id);
  

  return ( 
    <>
      <Helmet>
        <title>Editar Gasto</title>
      </Helmet>

      <Header>
        <BtnRegresar ruta='/lista/' />
        <Titulo>Editar Gasto</Titulo>
      </Header>

      <FormularioGasto gasto={gasto} gastoId={id}/>

      <BarraTotalGastado />
    </>
   );
}
 
export default EditarGasto;