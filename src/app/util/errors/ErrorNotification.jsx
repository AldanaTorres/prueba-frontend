import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { /*HIDE_ERROR , setErrorLight , initializeError,*/ INITIALIZE_ERROR } from '../../reducers/errorReducer';
// import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";

const ErrorNotification = (props) => {
  // const isOpen = useSelector(state => state.errorReducer.isOpen);
  // const error1 = useSelector(state => state.errorReducer.isError1);
  // const errorLight = useSelector(state => state.errorReducer.isErrorLight);
  // const warning = useSelector(state => state.errorReducer.isWarning);
  // const warningLight = useSelector(state => state.errorReducer.isWarningLight);
  let error = useSelector(state => state.errorReducer.error);
  let titulo = '';
  let mensaje = '';
  let tipoMensaje = 'error';

  const dispatch = useDispatch();

  // function handleClose() {
  //   dispatch({ type: HIDE_ERROR });
  // }

  if (error) {

    switch (parseInt(error["status"])) {
      case 500:
        (mensaje = 'Error Interno del Servidor');
        break;
      case 502:
          (titulo = 'Puerta de Enlace Incorrecta');
          (mensaje = 'Problema de Conexión');
          (tipoMensaje = "warning")
        break;  
      case 504:
        (mensaje = 'Problema de Conexión');
        (tipoMensaje = "warning")
      break; 
      case 405:
        (mensaje = 'Acceso a datos no permitido');
        (tipoMensaje = "warning")
        break;
      case 404:
        (mensaje = 'No se encontraron datos');
        (tipoMensaje = "warning")
        break;
      case 403:
        (mensaje = 'Error - Acceso no permitido')
        break;
      case 401:
        (mensaje = 'Error - Error de conexión')
        break;
      case 400: {
        if (error['title'] !== 'Bad Request') {
          titulo = error['title'];
          mensaje = error['detail'];
        } else {
          mensaje = 'Petición o Solicitud Incorrecta';
        }
        break;
      }
      case 204:
        (mensaje = 'Error - No hay Contenido')
        break;
      case 201:
        (mensaje = 'Datos Creados');
        (tipoMensaje = "success")
        break;
      default:
        mensaje = 'Error'
        break;
    }
    Swal.fire({
      icon: tipoMensaje,
      title: titulo,
      text: mensaje,
      // showCancelButton: true,
    }).then(() => {
      dispatch({ type: INITIALIZE_ERROR });
    });

  }

  if (error) {
    if (error.fieldErrors !== undefined) {
      error = {
        ...error,
        detail: "UN ERROR"
      }
    }
  }





  return (
    <>

      {/* {isOpen && error1 && (
        <Modal className="modal-danger " show={isOpen} onHide={handleClose}>
          <Modal.Header closeButton>
            {(mensaje)}
          </Modal.Header>
          <Modal.Body>{error.detail}</Modal.Body>

        </Modal>
      )}

      {isOpen && errorLight && (
        <div className="app-header" style={{ paddingTop: '70px' }}>
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <button type="button" className="close" aria-label="Close" onClick={handleClose}>
              <span aria-hidden="true">×</span>
            </button>
            {(mensaje)}
          </div>
        </div>
      )}

      {isOpen && warning && (
        <Modal className="modal-info " show={isOpen} onHide={handleClose}>
          <Modal.Header closeButton>
            {(mensaje)}
          </Modal.Header>
          <Modal.Body>{error.detail}</Modal.Body>

        </Modal>
      )}

      {isOpen && warningLight && (



        <div className="app-header" style={{ paddingTop: '70px' }}>
          <div className="alert alert-info alert-dismissible fade show" role="alert">
            <button type="button" className="close" aria-label="Close" onClick={handleClose}>
              <span aria-hidden="true">×</span>
            </button>
            {(mensaje)}
          </div>
        </div>
      )} */}




    </>
  )
}

export default ErrorNotification;