import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import servicioAsociadoReducer from "./servicioAsociadoReducer";
import tipoServicioReducer from "./tipoServicioReducer";
import servicioReducer from './servicioReducer';
import ventanillaElectronicaReducer from './ventanillaElectronicaReducer';
import cuotaReducer from './cuotaReducer';

import personaReducer from './personaReducer';

export default combineReducers({
    form: reduxForm,
    servicioAsociadoReducer,
    tipoServicioReducer,
    servicioReducer,
    ventanillaElectronicaReducer,
    cuotaReducer,
    personaReducer,
  });