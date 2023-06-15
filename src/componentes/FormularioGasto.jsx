import React, {useEffect, useState} from 'react';
import {ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton} from './../elementos/ElementosDeFormulario';
import Boton from '../elementos/Boton';
import { ReactComponent as IconoPlus } from './../imagenes/plus.svg';
import SelectCategorias from './SelectCategorias';
import DatePicker from './DatePicker';
import agregarGasto from '../firebase/agregarGasto';
import getUnixTime from 'date-fns/getUnixTime';
import fromUnixTime from 'date-fns/fromUnixTime';
import {useAuth} from './../contextos/AuthContext';
import Alerta from './../elementos/Alerta';
import { useNavigate } from 'react-router-dom';
import editarGasto from './../firebase/editarGasto';

const FormularioGasto = ({gasto, gastoId}) => {

	const [inputDescripcion, cambiarInputDescripcion] = useState('');
	const [inputCantidad, cambiarInputCantidad] = useState('');
  const [categoria, cambiarCategoria] = useState('hogar');
  const {usuario} = useAuth();
  const [alerta, cambiarAlerta] = useState({});
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const navigate = useNavigate();

  const [fecha, cambiarFecha] = useState(new Date());

  //Efecto para editar el gasto, comprobando si hay un gasto
  useEffect(()=>{
    if(gasto){
      if(gasto.uidUsuario === usuario.uid){
        cambiarInputCantidad(gasto.cantidad);
        cambiarCategoria(gasto.categoria);
        cambiarFecha(fromUnixTime(gasto.fecha));
        cambiarInputDescripcion(gasto.descripcion);
      } else {
        navigate('/lista');
      }
    }
  },[gasto]);
  //console.log(gasto);


	const handleChange = (e) => {
		if(e.target.name === 'descripcion'){
			cambiarInputDescripcion(e.target.value);
		} else if(e.target.name === 'cantidad'){
			cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g, ''));
		}
	}

  const handleSubmit = async (e) => {
    e.preventDefault();
    cambiarEstadoAlerta(false);

    
    let cantidad = parseFloat(inputCantidad);

    if(inputDescripcion === ''){
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: 'error',
        mensaje: 'Ingrese una descripcion del gasto :('
      });
      return;
    } else if(inputCantidad === ''){
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: 'error',
        mensaje: 'Ingrese un valor del gasto :('
      });
      return;
    } else if(inputCantidad !== '' && inputDescripcion !== ''){
      if(gasto){
        console.log(gasto.id);
        editarGasto({
          id: gastoId,
          categoria: categoria,
          descripcion: inputDescripcion,
          cantidad: cantidad,
          fecha: getUnixTime(fecha)
        });

          cambiarEstadoAlerta(true);
          cambiarAlerta({
            tipo: 'exito',
            mensaje: 'Gasto Editado ;)'
          });

          setTimeout(()=>{
            if(gasto){
              navigate('/lista');
            }
          },1000)
      } else {
        try {
          if(cantidad){
            await agregarGasto({
                categoria: categoria,
                descripcion: inputDescripcion,
                cantidad: cantidad,
                fecha: getUnixTime(fecha),
                uidUsuario: usuario.uid
              }
            );
          }
          
          cambiarFecha(new Date());
          cambiarInputCantidad('');
          cambiarCategoria('hogar');
          cambiarInputCantidad('');
          cambiarInputDescripcion('');
  
          
          cambiarEstadoAlerta(true);
          cambiarAlerta({
            tipo: 'exito',
            mensaje: 'Gasto Agregado ;)'
          });
  
        } catch (error) {
          console.log(error);
          cambiarEstadoAlerta(true);
          cambiarAlerta({
            tipo: 'error',
            mensaje: 'Hubo un error al intentar enviar tu gasto :('
          });
        }
      }
    }


  }

  return ( 
    <Formulario onSubmit={handleSubmit}>
      <ContenedorFiltros>
        <SelectCategorias 
          categoria= {categoria}
          cambiarCategoria={cambiarCategoria}
        />
        <DatePicker 
          fecha={fecha}
          cambiarFecha={cambiarFecha}
        />
      </ContenedorFiltros>
      <div>
        <Input 
          type='text'
          name='descripcion'
          id='descripcion'
          placeholder='Descripcion'
					value={inputDescripcion}
					onChange={handleChange}
        />
        <InputGrande 
          type='text'
          name='cantidad'
          id='cantidad'
          placeholder='$0'
					value={inputCantidad}
					onChange={handleChange}
        />
      </div>
      <ContenedorBoton>
        {gasto ? 
          <Boton 
            as='button' 
            primario='' 
            con=''
            type='submit'
          >
            Actualizar Gasto
          </Boton>
          :
          <Boton 
            as='button' 
            primario='' 
            con=''
            type='submit'
          >
            Agregar Gasto <IconoPlus />
          </Boton>
        }
      </ContenedorBoton>

      <Alerta  
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        cambiarEstadoAlerta={cambiarEstadoAlerta}
      />
    </Formulario>
   )
}
export default FormularioGasto;