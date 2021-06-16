import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ReactTooltip from 'react-tooltip';
import './modalito.css';
import ayudaInstructivoGral from '../../../assets/img/ayuda/boleto480.png'

function Modalito() {
  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
     
      
       
        <i className="fa fa-question-circle fa-2x" data-tip data-for="botonTooltip" onClick={handleShow} ></i> 
       
        
        <ReactTooltip id="botonTooltip" > 
        ayuda  
        </ReactTooltip>   
       
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Servicios</Modal.Title>
          
        </Modal.Header>
        <Modal.Body>
          

        <p> Completa los campos del formulario con los datos que se encuentran en tu boleto.</p>

            <li ><h6><strong>Agregar servicio:</strong> deberá buscar el servicio que desea agregar.</h6> </li>
              <ul>
                        <li  >1- Ingrese el tipo de servicio que desea buscar. </li>
                        <li  >2- Luego ingrese el código correspondiente al servicio seleccionado. </li>
                        <li  >3- Clic en "buscar".  </li>
                        <br></br>
              </ul>
            <li ><h6><strong>Validación con boleto pagado:</strong> para asegurar su titularidad deberá validar los datos con un boleto pagado.</h6> </li>
              <ul>
                        <li >1- Ingrese el año del boleto pagado. </li>
                        <li  >2- Ingrese el nro. del boleto pagado. </li>
                      
                        <br></br>
              </ul>
              <li ><h6><strong>¿Adhiere a Boleto Electrónico?</strong></h6></li>
              <ul>
                        <li  >1- Confirmar la adhesión.  </li>
                        <li  >2- Aceptar las condiciones. </li>
                        <br></br>
              </ul>
              <li ><h6><strong>¿Dónde encontrar los datos solicitados?</strong></h6></li>
           

            {/*<img alt="Instructivo Boleto" src="http://irrigacion.gov.ar/observatorio_old/rst/boleto480.png" />*/}
            <img    
                src={ayudaInstructivoGral}
                alt="ayuda instructivo general"
                className="img thumbnail"
            />
        
          
          
          
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modalito;