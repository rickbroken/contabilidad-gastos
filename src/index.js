import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import WebFont from 'webfontloader';
import Contenedor from './elementos/Contenedor';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Helmet} from "react-helmet";
import InicioSesion from './componentes/InicioSesion';
import RegistroUsuarios from './componentes/RegistroUsuarios';
import ListaDeGastos from './componentes/ListaDeGastos';
import EditarGastos from './componentes/EditarGasto';
import GastosPorCategoria from './componentes/GastosPorCategoria';
import favicon from './imagenes/logo.png';
import Fondo from './elementos/Fondo';
import { AuthProvider } from './contextos/AuthContext';


WebFont.load({
  google: {
    //Work+Sans:wght@400;500;700
    families: ['Work Sans:400,500,700', 'sans-serif']
  }
});

const Index = () => {
  return(
    <>
      <Helmet>
        <link rel="shorcut icon" href={favicon} type="image/x-icon" />
        <title>Contabilidad Gastos</title>
      </Helmet>

      <AuthProvider>
        <BrowserRouter>
          <Contenedor>
            <Routes>
              <Route path="*" element={<App />}/>
              <Route path="/" element={<App />}/>
              <Route path="/iniciar-sesion" element={<InicioSesion/>}/>
              <Route path="/crear-cuenta" element={<RegistroUsuarios/>}/>
              <Route path="/categorias" element={<GastosPorCategoria/>}/>
              <Route path="/lista" element={<ListaDeGastos/>}/>
              <Route path="/editar/:id" element={<EditarGastos/>}/>
            </Routes>
          </Contenedor>
        </BrowserRouter>
      </AuthProvider>


      <Fondo />
    </>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Index />);