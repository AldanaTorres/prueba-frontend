import axios from "axios";
import { SET_ERROR } from "./errorReducer";
import { objToQuery } from "../util/lib";

export const tipoVentanilla = {
  BUSCAR_VENTANILLAS: "BUSCAR_VENTANILLAS",
  BUSCAR_VENTANILLA_POR_ID: "BUSCAR_VENTANILLA_POR_ID",
};

// REDUCER

const INITIAL_STATE = {
  listaVentanillas: [],
  ventanilla: null,
  ventanillaSelected: null,
  cargando: false,
  errores: {},
  currentPage: 0,
  totalPages: 0,
};

export default function ventanillaElectronicaState(state = INITIAL_STATE, action) {
  switch (action.type) {
    case tipoVentanilla.BUSCAR_VENTANILLAS: {
      return {
        ...state,
        ...action.payload,
        cargando: true,
      };
    }

    case tipoVentanilla.BUSCAR_VENTANILLA_POR_ID: {
      return {
        ...state,
        ventanillaSelected: action.payload,
        cargando: true,
      };
    }

    default:
      return state;
  }
}

const apiUrl = "/services/serviciosweb/api/ventanilla-electronicas";

// ACCIONES

export const buscarVentanillas = (page, size, search) => async (dispatch) => {
  const obj = objToQuery({
    page: page,
    size: size,
    ...search,
  });
  try {
    const res = await axios.get(apiUrl + obj);
    let cantTotal = parseInt(res.headers["x-total-count"]);
    dispatch({
      type: tipoVentanilla.BUSCAR_VENTANILLAS,
      payload: {
        listaVentanillas: res.data,
        currentPage: page,
        totalPages: parseInt(cantTotal / size) + (cantTotal % size ? 1 : 0),
      },
    });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.response });
  }
};

export const buscarVentanillaPorId = (id) => async (dispatch) => {
  try {
    const res = await axios.get(apiUrl + "/" + id);
    dispatch({
      type: tipoVentanilla.BUSCAR_VENTANILLA_POR_ID,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.response });
  }
};
