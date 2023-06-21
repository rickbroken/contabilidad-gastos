import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Header, Titulo } from './../elementos/Header';
import Boton from '../elementos/Boton';
import { Formulario, Input, ContenedorBoton} from './../elementos/ElementosDeFormulario';
import { ReactComponent as SvgLogin } from './../imagenes/registro.svg';
import styled from 'styled-components';
import { auth } from './../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import Alerta from '../elementos/Alerta';
import { useAuth } from '../contextos/AuthContext';

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 6.25rem; /* 100px */
  margin-bottom: 1.25rem; /* 20px */
`;

const RegistroUsuarios = () => {
  const navigate = useNavigate();
  const [correo, establecerCorreo] = useState('');
  const [password, establecerPassword] = useState('');
  const [password2, establecerPassword2] = useState('');
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});

  const {usuario} = useAuth();

  
  useEffect(()=>{
    if(usuario !== null){
      navigate('/');
    }
  },[usuario, navigate])
  

  const handleChange = (e) => {
    switch(e.target.name){
      case 'email':
        establecerCorreo(e.target.value);
        break;
      case 'password':
        establecerPassword(e.target.value);
        break;
      case 'password2':
        establecerPassword2(e.target.value);
        break;
      default:
        break;
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
        mensaje: 'Tienes un email invalido :('
      });
      return;
    }
    if(correo === '' || password === '' || password2 === ''){
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: 'error',
        mensaje: 'Rellena todos los campos por favor :('
      });
      return;
    }
    if(password !== password2){
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: 'error',
        mensaje: 'Las contraseñas no son iguales :('
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, correo, password);

      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: 'exito',
        mensaje: 'Registro de Usuario Correcto, Inicie sesion'
      });
      
      setTimeout(()=>{
        navigate('/iniciar-sesion');
      },2500)
    } catch (error) {
      cambiarEstadoAlerta(true);
      let mensaje;

      switch (error.code) {
        case 'auth/invalid-password':
          mensaje = 'La contraseña tine que ser de almenos 6 caracteres';
          break;

        case 'auth/weak-password':
          mensaje = 'La contraseña es demasiado debil, agrega por lo menos una mayuscula simbolos o numeros :(';
          break;

        case 'auth/email-already-in-use':
          mensaje = 'Este correo ya esta registrado :(';
          break;

        case 'auth/invalid-email':
          mensaje = 'Tienes un email invalido';
          break;

        default:
          mensaje = 'Hubo algun error al intentar crear la cuenta :(';
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
        <title>Registrar Cuenta</title>
      </Helmet>
      <Header>
        <Titulo>Crear Cuenta</Titulo>
        <div>
          <Boton to="/iniciar-sesion">Iniciar Sesion</Boton>
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
        <Input 
          type='password'
          name='password2'
          placeholder='Repetir Contraseña'
          value={password2}
          onChange={handleChange}
        />

        <ContenedorBoton>
          <Boton primario="" as="button" type="submit">Crear Cuenta</Boton>
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
 
export default RegistroUsuarios;