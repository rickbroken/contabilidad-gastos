import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import WebFont from 'webfontloader';
import Contenedor from './elementos/Contenedor';
import { HashRouter, Route, Routes } from "react-router-dom";
import {Helmet} from "react-helmet";
import InicioSesion from './componentes/InicioSesion';
import RegistroUsuarios from './componentes/RegistroUsuarios';
import ListaDeGastos from './componentes/ListaDeGastos';
import EditarGastos from './componentes/EditarGasto';
import GastosPorCategoria from './componentes/GastosPorCategoria';
import favicon from './imagenes/logo.png';
import Fondo from './elementos/Fondo';
import { AuthProvider } from './contextos/AuthContext';
import RutaPrivada from './componentes/RutaPrivada';
import { TotalGastadoProvider } from './contextos/TotalGastadoEnElMesContext';


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
        <TotalGastadoProvider>
          <HashRouter>
            <Contenedor>
              <Routes>
                <Route path="/iniciar-sesion" element={<InicioSesion/>}/>
                <Route path="/crear-cuenta" element={<RegistroUsuarios/>}/>

                <Route path='*' element={
                  <RutaPrivada>
                    <App />
                  </RutaPrivada>
                } />


                <Route path='/categorias' element={
                  <RutaPrivada>
                    <GastosPorCategoria/>
                  </RutaPrivada>
                } />

                <Route path='/lista' element={
                  <RutaPrivada>
                    <ListaDeGastos/>
                  </RutaPrivada>
                } />

                <Route path='/editar/:id' element={
                  <RutaPrivada>
                    <EditarGastos/>
                  </RutaPrivada>
                }/>

                <Route path='/' element={
                  <RutaPrivada>
                    <App/>
                  </RutaPrivada>
                } />
              </Routes>
            </Contenedor>
          </HashRouter>
        </TotalGastadoProvider>
      </AuthProvider>


      <Fondo />
    </>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Index />);