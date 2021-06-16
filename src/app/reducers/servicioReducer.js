import axios from "axios";
import { setErrorLight, SET_ERROR_LIGHT } from "./errorReducer";
import { SubmissionError } from "redux-form";
import Swal from "sweetalert2";
import {objToQuery} from '../util/lib';

export const ACTION_TYPES = {
  BUSCAR_SERVICIOS: "BUSCAR_SERVICIOS",
  BUSCAR_SERVICIO_POR_CODIGO: "BUSCAR_SERVICIO_POR_CODIGO",
  NUEVO_SERVICIO: "NUEVO_SERVICIO"
  
};


const initialState = {
  lstServicios: [],
  servicio: null,
  errores: {},
  cargando: false,
  currentPage: 0,
  totalPages: 0,
};

export default function servicioState(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.BUSCAR_SERVICIOS:{
      return {
        ...state,
        lstServicios: action.payload,

      };
      
    }
    
    case ACTION_TYPES.BUSCAR_SERVICIO_POR_CODIGO: {
      return {
        ...state,
        servicio: action.payload.data,
        cargando: true,
      };
      
    }
    case ACTION_TYPES.NUEVO_SERVICIO: {
      return {
        ...state,
        servicio: null,
        cargando: true,
      };
      
    }
    default:
      return state;

  }
}

const apiUrl = "/services/presupuesto/api/servicios";


export const buscarServicios = (search) => async (dispatch) => {
  const obj = objToQuery({
    ...search,
  });  
  try {
    var res = await axios.get(apiUrl + obj);
    return dispatch({
      type: ACTION_TYPES.BUSCAR_SERVICIOS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setErrorLight(error))
    dispatch({ type: SET_ERROR_LIGHT, payload: error.response });
    throw new SubmissionError(error);
  }
};
export const buscarServicioPorCodigo = (codigo) => async (dispatch) => {
    try {
        
      const res = await axios.get(
        `${apiUrl}/getServicioByCodigo/${codigo}`
      );
      
      if (res && res.status === 200) {
        //dispatch({ type: ACTION_TYPES.BUSCAR_SERVICIO_POR_CODIGO, payload: res });
        return res.data;
      } else {
        Swal.fire("error", "No se encontraron datos", "warning");
      }
    } catch (error) {
      dispatch(setErrorLight(error))
      
    }
  };

  export const nuevoServicio= () => async (dispatch) => {
    dispatch({ type: ACTION_TYPES.NUEVO_SERVICIO });
  };