import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Header, Titulo } from './../elementos/Header';
import Boton from '../elementos/Boton';
import { Formulario, Input, ContenedorBoton} from './../elementos/ElementosDeFormulario';
import { ReactComponent as SvgLogin } from './../imagenes/registro.svg';
import styled from 'styled-components';
import { auth } from './../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";

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

    //Comprobamos que el correo sea valido
    const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if(!expresionRegular.test(correo)){
      alert('Ingresa un correo valido');
      return;
    }
    if(correo === '' || password === '' || password2 === ''){
      alert('Rellena todos los campos por favor');
      return;
    }
    if(password !== password2){
      alert('Las contraseñas no son iguales');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, correo, password);
			alert('Registro de Usuario Correcto, Inicie sesion');
			navigate('/iniciar-sesion');
    } catch (error) {
      let mensaje;
      console.log(error.code);
      switch (error.code) {
        case 'auth/invalid-password':
          alert('La contraseña tine que ser de almenos 6 caracteres');
          break;
      
        default:
          break;
      }
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
    </>
   );
}
 
export default RegistroUsuarios;