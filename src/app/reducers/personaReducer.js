import axios from "axios";
import { SubmissionError } from "redux-form";
import { SET_ERROR_LIGHT, setErrorLight } from "./errorReducer";

export const tiposPersona = {
  BUSCAR_PERSONA_POR_CUIT: "BUSCAR_PERSONA_POR_CUIT",
};

const INITIAL_STATE = {
  listaPersona: [],
  persona: {},
  cargando: false,
  errores: {},
};

//Reducer

export default function personaState(state = INITIAL_STATE, action) {
  switch (action.type) {
    case tiposPersona.BUSCAR_PERSONA_POR_CUIT: {
      return {
        ...state,
        persona: action.payload.data,
        cargando: true,
      };
    }

    default:
      return state;
  }
}

const apiUrl = "/services/presupuesto/api/personas";

//Acciones

export const buscarPersonaPorCuit = (cuit) => async (dispatch) => {
  try {
    const res = await axios.get(`${apiUrl}/findByCuit/${cuit}`);
    return dispatch({
      type: tiposPersona.BUSCAR_PERSONA_POR_CUIT,
      payload: res,
    });
  } catch (error) {
    dispatch(setErrorLight(error));
    dispatch({ type: SET_ERROR_LIGHT, payload: error.response });
    throw new SubmissionError(error);
  }
};
