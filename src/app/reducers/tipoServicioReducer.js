import axios from "axios";
import { SET_ERROR, SET_ERROR_LIGHT } from "./errorReducer";
import { SubmissionError } from "redux-form";
import Swal from "sweetalert2";

export const tipoTipoServicio = {
  BUSCAR_TIPO_SERVICIO: "BUSCAR_TIPO_SERVICIO",
  BUSCAR_TIPO_SERVICIO_POR_ID: "BUSCAR_TIPO_SERVICIO_POR_ID",
  NUEVO_TIPO_SERVICIO: "NUEVO_TIPO_SERVICIO",
  GUARDAR_TIPO_SERVICIO: "GUARDAR_TIPO_SERVICIO",
  ACTUALIZAR_TIPO_SERVICIO: "ACTUALIZAR_TIPO_SERVICIO",
  ELIMINAR_TIPO_SERVICIO: "ELIMINAR_TIPO_SERVICIO",
  BUSCAR_TIPO_SERVICIO_POR_CODIGO: "BUSCAR_TIPO_SERVICIO_POR_CODIGO",
  SET_TIPO_SERVICIO: "SET_TIPO_SERVICIO",
  INICIALIZAR_TIPO_SERVICIO: "INICIALIZAR_TIPO_SERVICIO",
};

// REDUCER
const INITIAL_STATE = {
  listaTipoServicio: [],
  tipoServicio: null,
  cargando: false,
  errores: {},
  tipoServicioSelected: null,
  currentPage: 0,
  totalPages: 0,
};

export default function tipoServicioState(state = INITIAL_STATE, action) {
  switch (action.type) {
    case tipoTipoServicio.BUSCAR_TIPO_SERVICIO: {
      return {
        ...state,
        listaTipoServicio: action.payload,
        cargando: true,
      };
    }
    case tipoTipoServicio.NUEVO_TIPO_SERVICIO: {
      return {
        ...state,
        tipoServicio: null, 
        tipoServicioSelected: null,
      }
    }
    case tipoTipoServicio.BUSCAR_TIPO_SERVICIO_POR_ID: {
      return {
        ...state,
        tipoServicio: action.payload.data,
        tipoServicioSelected: action.payload.data,
        cargando: true,
      };
    }
    case tipoTipoServicio.ELIMINAR_TIPO_SERVICIO: {
      const id = action.payload.id;
      return {
        ...state,
        listaTipoServicio: state.listaTipoServicio.filter(
          (item) => item.id !== id
        ),
      };
    }

    case tipoTipoServicio.BUSCAR_TIPO_SERVICIO_POR_CODIGO: {
      return {
        ...state,
        tipoServicio: action.payload.data,
        tipoServicioSelected: action.payload.data,
        cargando: false,
      };
    }
    case tipoTipoServicio.SET_TIPO_SERVICIO: {
      return {
        ...state,
        tipoServicio: (action.payload || {}).tipoServicio,
        tipoServicioSelected: action.payload,
      };
    }
    case tipoTipoServicio.INICIALIZAR_TIPO_SERVICIO: {
      return {
        ...state,
        tipoServicio: null,
        tipoServicioSelected: null,
      };
    }
    
    default:
      return state;
  }
}

const apiUrl = "/services/presupuesto/api/tipo-servicios";

// ACCIONES

export const buscarTipoServicio = () => async (dispatch) => {
  try {
    
      const res = await axios.get(apiUrl);
      dispatch({
        type: tipoTipoServicio.BUSCAR_TIPO_SERVICIO,
        payload: res.data
      });
    
    
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.response });
  }
};

export const nuevoTipoServicio = () => async (dispatch) => {
  dispatch({ type: tipoTipoServicio.NUEVO_TIPO_SERVICIO });
};

export const guardarTipoServicio = (tipoServicio) => async (dispatch) => {
  try {
    const res = await axios.post(apiUrl, tipoServicio);
    dispatch({ type: tipoTipoServicio.GUARDAR_TIPO_SERVICIO, payload: res });
  } catch (error) {
    dispatch({ type: SET_ERROR_LIGHT, payload: error.response });
    throw new SubmissionError(error);
  }
};

export const buscarTipoServicioPorId = (id) => async (dispatch) => {
  const res = await axios.get(apiUrl + "/" + id);
  dispatch({
    type: tipoTipoServicio.BUSCAR_TIPO_SERVICIO_POR_ID,
    payload: res,
  });
};

export const actualizarTipoServicio = (tipoServicio) => async (dispatch) => {
  try {
    const res = await axios.put(apiUrl, tipoServicio);
    return dispatch({
      type: tipoTipoServicio.ACTUALIZAR_TIPO_SERVICIO,
      payload: res,
    });
  } catch (error) {
    dispatch({ type: SET_ERROR_LIGHT, payload: error.response });
    
  }
};

export const eliminarTipoServicio = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(apiUrl + "/" + id);
    Swal.fire("", "Se eliminó correctamente.", "success");
    if (res.status === 204) {
      res.id = id;
    }
    return dispatch({
      type: tipoTipoServicio.ELIMINAR_TIPO_SERVICIO,
      payload: res,
    });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.response });
  }
};

export const setTipoServicio = (tipoServicio) => (dispatch) => {
  return dispatch({
    type: tipoTipoServicio.SET_TIPO_SERVICIO,
    payload: tipoServicio,
  });
};

export const buscarTipoServicioPorCodigo = (codigo) => async (dispatch) => {
  try {
    const res = await axios.get(
      apiUrl + "/findByCodigo/" + codigo
    );
    dispatch({
      type: tipoTipoServicio.BUSCAR_TIPO_SERVICIO_POR_CODIGO,
      payload: res,
    });
  } catch (error) {
  }
};

export const inicializarTipoServicio = () => (dispatch) => {
  return dispatch({
    type: tipoTipoServicio.INICIALIZAR_TIPO_SERVICIO,
    payload: null,
  });
};
