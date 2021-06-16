import axios from "axios";

export const ACTION_TYPES = {
  COORDINAR_USUARIO: "user/COORDINAR_USUARIO",
  
};

const initialState = {
  usuario: null,
};

// Reducer

export default function servicioStates (state = initialState, action) {
  switch (action.type) {
    

    case ACTION_TYPES.COORDINAR_USUARIO: {
      return {
        ...state,
        usuario: action.payload.data,
      }
    }


    default:
      return state;
  }
}

const apiUrl = "/services/serviciosweb/api/usuario-portals";

// Actions


export const coordinarUsuario = () => async (dispatch) => {
  try {
    
    let res = await axios.post(apiUrl + '/coordinar');
      
    dispatch({ type: ACTION_TYPES.COORDINAR_USUARIO, payload: res });
  } catch (error) {

    throw new Error(error);
    
   
  }
};





