import axios from "axios";
import { SubmissionError } from "redux-form";
import { SET_ERROR_LIGHT, SET_ERROR, setErrorLight } from "./errorReducer";
import Swal from "sweetalert2";
import { objToQuery } from "../util/lib";

export const ACTION_TYPES = {
  BUSCAR_LISTADO_SERVICIO_ASOCIADO: "servicioAsociado/BUSCAR_LISTADO_SERVICIO_ASOCIADO",
  NUEVO_SERVICIO_ASOCIADO: "servicioAsociado/NUEVO_SERVICIO_ASOCIADO",
  GUARDAR_SERVICIO_ASOCIADO: "servicioAsociado/GUARDAR_SERVICIO_ASOCIADO",
  BUSCAR_SERVICIO_ASOCIADO_POR_ID: "servicioAsociado/BUSCAR_SERVICIO_ASOCIADO_POR_ID",
  ACTUALIZAR_SERVICIO_ASOCIADO: "servicioAsociado/ACTUALIZAR_SERVICIO_ASOCIADO",
  ELIMINAR_SERVICIO_ASOCIADO: "servicioAsociado/ELIMINAR_SERVICIO_ASOCIADO",
  GUARDAR_RANGO: "servicioAsociado/GUARDAR_RANGO",
  ACTUALIZAR_CARGA: "servicioAsociado/ACTUALIZAR_CARGA",
  SET_SERVICIO_ASOCIADO: "servicioAsociado/SET_SERVICIO_ASOCIADO",
};

const initialState = {
  lstServicioAsociado: [],
  servicioAsociado: {boletoDigital : false},
  errores: {},
  currentPage: 0,
  totalPages: 0,
  cargando: false,
  lstActual: [],
  servicioAsociadoSelected: null
};

// Reducer

export default function servicioStates (state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.BUSCAR_LISTADO_SERVICIO_ASOCIADO: {
      return {
        ...state,
        ...action.payload,
        cargando: true,
      };
    }

    case ACTION_TYPES.ELIMINAR_SERVICIO_ASOCIADO: {
      const id = action.payload;
      return {
        ...state,
        lstServicioAsociado: state.lstServicioAsociado.filter((item) => item.id !== id),
        lstActual: state.lstActual.filter((item) => item.id !== id),
      };
    }

    case ACTION_TYPES.BUSCAR_SERVICIO_ASOCIADO_POR_ID: {
      return {
        ...state,
        servicioAsociado: action.payload.data,
      };
    }

    case ACTION_TYPES.NUEVO_SERVICIO_ASOCIADO: {
      return {
        ...state,
        servicioAsociado: {
          boletoDigital: true,
        },
      };
    }

    case ACTION_TYPES.GUARDAR_SERVICIO_ASOCIADO: {
      return {
        ...state,
        servicioAsociado: action.payload.data,
        lstActual: state.lstActual.concat(action.payload.data)
      }
    }

    case ACTION_TYPES.ACTUALIZAR_SERVICIO_ASOCIADO: {
      return {
        ...state,
        lstActual: state.lstActual.concat(action.payload.data)
      }
    }

    case ACTION_TYPES.GUARDAR_RANGO: {
      return {
        ...state,
        lstRangos: action.payload.data,
        lstActual: state.lstActual.concat(action.payload.data),
      }
    }

    case ACTION_TYPES.ACTUALIZAR_CARGA: {
      return {
        ...state,
        ...action.payload
      };
    }

    case ACTION_TYPES.SET_SERVICIO_ASOCIADO: {
      return {
        ...state,
        servicioAsociado: (action.payload || {}).servicioAsociado,
        servicioAsociadoSelected: action.payload,
      };
    }

    default:
      return state;
  }
}

const apiUrl = "/services/serviciosweb/api/usuario-servicios";

// Actions

export const buscarServicioAsociado = (page, size, search) => async (dispatch) => {
  try {
    const obj = objToQuery({
      page: page,
      size: size,
      ...search,
    });
    const res = await axios.get(apiUrl + obj);
    let cantTotal = parseInt(res.headers["x-total-count"]);
    if (res && res.status === 200) {
      dispatch({
        type: ACTION_TYPES.BUSCAR_LISTADO_SERVICIO_ASOCIADO,
        payload: {
          lstServicioAsociado: res.data,
          currentPage: page,
          totalPages: parseInt(cantTotal / size) + (cantTotal % size ? 1 : 0),
        },
      });
    }
  } catch (error) {
    dispatch({ type: SET_ERROR_LIGHT, payload: error.response });
  }
};



export const nuevoServicioAsociado = () => async (dispatch) => {
  dispatch({ type: ACTION_TYPES.NUEVO_SERVICIO_ASOCIADO });
};

export const guardarServicioAsociado = (servicioAsociado) => async (dispatch) => {
  try {
    /*if (servicioAsociado.fechaDesde === undefined) {
      servicioAsociado = {
        ...servicioAsociado,
        fechaDesde: new Date(),
      };
    }*/
    
    let res = await axios.post(apiUrl + '/createUsuarioServicioBoleto/', servicioAsociado);

      
    dispatch({ type: ACTION_TYPES.GUARDAR_SERVICIO_ASOCIADO, payload: res });
  } catch (error) {

    dispatch(setErrorLight(error))
    //Swal.fire("", error.response, "error");
    dispatch({ type: SET_ERROR_LIGHT, payload: error.response });
    throw new SubmissionError(error);
  }
};

export const buscarServicioAsociadoPorId = (id) => async (dispatch) => {
  const res = await axios.get(`${apiUrl}/${id}`);
  dispatch({ type: ACTION_TYPES.BUSCAR_SERVICIO_ASOCIADO_POR_ID, payload: res });
};

export const actualizarServicioAsociado = (servicioAsociado) => async (dispatch) => {
  try {
    const res = await axios.put(apiUrl, servicioAsociado);
    return dispatch({
      type: ACTION_TYPES.ACTUALIZAR_SERVICIO_ASOCIADO,
      payload: res,
    });
  } catch (error) {
    dispatch({ type: SET_ERROR_LIGHT, payload: error.response });
    throw new SubmissionError(error);
  }
};

export const eliminarServicioAsociado = (id) => async (dispatch) => {
  try {
    await axios.delete(`${apiUrl}/${id}`);

    Swal.fire("", "Se eliminó correctamente.", "success");
    dispatch({
      type: ACTION_TYPES.ELIMINAR_SERVICIO_ASOCIADO,
      payload: id,
    });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.response });
  }
};

export const setServicioAsociado = (servicioAsociado) => (dispatch) => {
  return dispatch({
    type: ACTION_TYPES.SET_SERVICIO_ASOCIADO,
    payload: servicioAsociado,
  });
};


