import axios from "axios";

export const ACTION_TYPES = {
    CUOTAS_ACTIVAS: "cuota/CUOTAS_ACTIVAS",
  
};

const initialState = {
  cuotas: null,
};

// Reducer

export default function cuotasState (state = initialState, action) {
  switch (action.type) {
    

    case ACTION_TYPES.CUOTAS_ACTIVAS: {
      return {
        ...state,
        cuotas: action.payload.data,
      }
    }


    default:
      return state;
  }
}

const apiUrl = "https://www.irrigacion.gov.ar/boletoonline";

// Actions


export const buscarCuotasActivas = () => async (dispatch) => {
  try {
    
    let res = await axios.get(apiUrl + '/cuota/cuotasActivas');
    
    dispatch({ type: ACTION_TYPES.CUOTAS_ACTIVAS, payload: res });
  } catch (error) {

       
   
  }
};





