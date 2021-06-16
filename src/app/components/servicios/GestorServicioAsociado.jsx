import React, {useState, useEffect, useCallback } from "react";

import { useDispatch,useSelector } from "react-redux";
import { Redirect } from "react-router";
import { SubmissionError } from "redux-form";
import LoadingOverlay from 'react-loading-overlay';
import {
  guardarServicioAsociado,
  actualizarServicioAsociado,
  nuevoServicioAsociado,
  buscarServicioAsociadoPorId

} from "../../reducers/servicioAsociadoReducer";

import { useParams } from 'react-router-dom';

import FormularioServicioAsociado from "./FormularioServicioAsociado";
import { useKeycloak } from '@react-keycloak/web'





export default function GestorServicioAsociado(props){

  const [redirect, setredirect] = useState(false)
  const [actualiza, setactualiza] = useState(false)
  const [loaded, setloaded] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const dispatch = useDispatch();

  const servicioAsociado = useSelector(state => state.servicioAsociadoReducer.servicioAsociado)

  const { keycloak } = useKeycloak()

  const login = keycloak && keycloak.tokenParsed && keycloak.tokenParsed.preferred_username


  const params = useParams();

  const fetchData = useCallback(() => {
    const { id } = params;

    if (id) {
      dispatch(buscarServicioAsociadoPorId(id))
        .then(() =>{
          setloaded(true);
          setactualiza(true)
        }
        )
        .catch((err) => {
          throw new SubmissionError(props.errores);
        });
    } else {
      
      dispatch(nuevoServicioAsociado())
        .then(() =>{
          setloaded(true);
          setactualiza(false)
        } )
        .catch((err) => {
          
          throw new SubmissionError(props.errores);
        });
    } }, [dispatch, props.errores, params]);
 
    useEffect(() => {
      fetchData();
    }, [fetchData]);


  function submit (servicioAsociado)  {
    servicioAsociado = {...servicioAsociado,
                        login}

                            
    setSubmitting(true);
                        
    if (servicioAsociado.id) {

      return dispatch(actualizarServicioAsociado(servicioAsociado))
        .then(() => {
          setredirect(true)
        })
        .catch((err) => {
          setSubmitting(false);
          throw new SubmissionError(err);
        });
        
    }else{
      return dispatch(guardarServicioAsociado(servicioAsociado))
        .then(() => {
          setredirect(true)
        })
        .catch((error) => {
          setSubmitting(false);
          throw new SubmissionError(error);
          
        });
    }
            
  };

  return (
    <div>
      {redirect ? <Redirect to="/private/servicios" /> : ""}
      {loaded ? 
        <LoadingOverlay
          active={submitting}
          spinner
          text='Cargando contenido...'
        >
          <FormularioServicioAsociado
            actualiza={actualiza}
            initialValues={servicioAsociado}
            onSubmit={submit}
          />
        </LoadingOverlay>
       : ""}
    </div>
  );


}


