import Swal from "sweetalert2";

// errorTypes.js
export const SET_ERROR = "SET_ERROR";
export const SET_ERROR_LIGHT = "SET_ERROR_LIGHT";
export const HIDE_ERROR = "HIDE_ERROR";
export const SET_WARNING = "SET_WARNING";
export const SET_WARNING_LIGHT = "SET_WARNING_LIGHT";
export const INITIALIZE_ERROR = 'INITIALIZE_ERROR';



// errorActions.js
export function setError(error){
 return {
    type: SET_ERROR,
    error: error
 }
}

export function setErrorLight(error){
  const data = error.response.data;

  if(data.status === 404 ){
    Swal.fire("", "404 - No Encontrado" , "warning");
  }else{
    Swal.fire("", data.title + " " + data.detail, "error");
  }

  
  return {
    type: SET_ERROR_LIGHT,
    error: error
  }
 }
 
 export function setWarningLight(error){
  return {
    type: SET_WARNING_LIGHT,
    payload: error
  }
 }

 export function setNotFound(error){
  return {
    type: SET_WARNING_LIGHT,
    payload: error
  }
 }

export function hideError(){
 return {
 type: HIDE_ERROR
 }
}

export function initializeError(error){
  return {
    error: null,
    isError1: null,
    isWarning: null,
    isErrorLight: null,
    isWarningLight: null,
    isOpen: false
  }
 }

// errorReducer.js

const initState = {
 error: null,
 isError1: null,
 isWarning: null,
 isErrorLight: null,
 isWarningLight: null,
 isOpen: false
};

export default function errorReducer(state = initState, action){

 switch (action.type) {
    case SET_ERROR: {
      return {
        error: action.payload.data,
        isOpen: true,
        isError1: true
      };
    }

    case SET_ERROR_LIGHT: {
      return {
        error: action.payload.data,
        isOpen: true,
        isErrorLight: true
      };
    }

    case SET_WARNING: {
      return {
        error: action.payload.data,
        isOpen: true,
        isWarning: true
      };
    }

    case SET_WARNING_LIGHT: {
      return {
        error: action.payload.data,
        isOpen: true,
        isWarningLight: true
      };
    }
    
    case HIDE_ERROR: {
      return {
        error: null,
        warning: null,
        isOpen: false
        };
        
    }

    case INITIALIZE_ERROR: {
      return {
        error: null,
        isError1: null,
        isWarning: null,
        isErrorLight: null,
        isWarningLight: null,
        isOpen: false
      };
    }    
    default:
      return state;

 }

}