import React from 'react';
import { Helmet } from 'react-helmet';
import { Header, Titulo } from './../elementos/Header';
import Boton from '../elementos/Boton';
import { Formulario, Input, ContenedorBoton} from './../elementos/ElementosDeFormulario';
import { ReactComponent as SvgLogin } from './../imagenes/login.svg';
import styled from 'styled-components';

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 6.25rem; /* 100px */
  margin-bottom: 1.25rem; /* 20px */
`;

const InicioSesion = () => {
  return ( 
    <>
      <Helmet>
        <title>Iniciar Sesion</title>
      </Helmet>
      <Header>
        <Titulo>Inicio de Sesion</Titulo>
        <div>
          <Boton to="/crear-cuenta">Crear Cuenta</Boton>
        </div>
      </Header>

      <Formulario>
        <Svg />
        <Input 
          type='email'
          name='email'
          placeholder='Escribe tu correo'
        />
        <Input 
          type='password'
          name='password'
          placeholder='Contraseña'
        />
        <ContenedorBoton>
          <Boton primario="" as="button" type="submit">Iniciar Sesion</Boton>
        </ContenedorBoton>
      </Formulario>
    </>
   );
}
 
export default InicioSesion;