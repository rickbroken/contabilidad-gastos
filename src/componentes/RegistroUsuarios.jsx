import React from 'react';
import { Helmet } from 'react-helmet';
import { Header, Titulo } from './../elementos/Header';
import Boton from '../elementos/Boton';
import { Formulario, Input, ContenedorBoton} from './../elementos/ElementosDeFormulario';
import { ReactComponent as SvgLogin } from './../imagenes/registro.svg';
import styled from 'styled-components';

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 6.25rem; /* 100px */
  margin-bottom: 1.25rem; /* 20px */
`;

const RegistroUsuarios = () => {
  return ( 
    <>
      <Helmet>
        <title>Registrar Cuenta</title>
      </Helmet>
      <Header>
        <Titulo>Crear Cuenta</Titulo>
        <div>
          <Boton to="/iniciar-sesion">Iniciar Sesion</Boton>
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
        <Input 
          type='password'
          name='password2'
          placeholder='Repetir Contraseña'
        />

        <ContenedorBoton>
          <Boton primario as="button" type="submit">Crear Cuenta</Boton>
        </ContenedorBoton>
      </Formulario>
    </>
   );
}
 
export default RegistroUsuarios;