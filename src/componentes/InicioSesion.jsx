import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Header, Titulo } from './../elementos/Header';
import Boton from '../elementos/Boton';
import { Formulario, Input, ContenedorBoton} from './../elementos/ElementosDeFormulario';
import { ReactComponent as SvgLogin } from './../imagenes/login.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './../firebase/firebaseConfig';
import Alerta from '../elementos/Alerta';


const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 6.25rem; /* 100px */
  margin-bottom: 1.25rem; /* 20px */
`;

const InicioSesion = () => {

  const navigate = useNavigate();
  const [correo, establecerCorreo] = useState('');
  const [password, establecerPassword] = useState('');
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});


  const handleChange = (e) => {
    if (e.target.name === 'email'){
      establecerCorreo(e.target.value);
    } else if(e.target.name === 'password') {
      establecerPassword(e.target.value);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    cambiarEstadoAlerta(false);
    cambiarAlerta({});

    //Comprobamos que el correo sea valido
    const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if(!expresionRegular.test(correo)){
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: 'error',
        mensaje: 'Ingresa un email invalido :('
      });
      return;
      }
      if(correo === '' || password === ''){
        cambiarEstadoAlerta(true);
        cambiarAlerta({
          tipo: 'error',
          mensaje: 'Rellena todos los campos por favor :('
        });
        return;
      }

    try {
      await signInWithEmailAndPassword(auth, correo, password);

      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: 'exito',
        mensaje: 'Inicio de sesion correcto :)'
      });
      
      setTimeout(()=>{
        navigate('/');
      },2500);

    } catch (error) {
      cambiarEstadoAlerta(true);
      let mensaje;
      console.log(error.code);

      switch (error.code) {
        case 'auth/wrong-password':
          mensaje = 'Contraseña incorrecta';
          break;

        case 'auth/user-not-found':
          mensaje = 'La cuenta ingresada, no existe :(';
          break;

        default:
          mensaje = 'Hubo algun error al intentar iniciar sesion :(';
          break;
      }

      cambiarAlerta({
        tipo: 'error',
        mensaje: mensaje
      });

    }    
  }

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

      <Formulario onSubmit={handleSubmit}>
        <Svg />
        <Input 
          type='email'
          name='email'
          placeholder='Escribe tu correo'
          value={correo}
          onChange={handleChange}
        />
        <Input 
          type='password'
          name='password'
          placeholder='Contraseña'
          value={password}
          onChange={handleChange}
        />
        <ContenedorBoton>
          <Boton primario="" as="button" type="submit">Iniciar Sesion</Boton>
        </ContenedorBoton>
      </Formulario>

      <Alerta 
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        cambiarEstadoAlerta={cambiarEstadoAlerta}
      />
    </>
   );
}
export default InicioSesion;