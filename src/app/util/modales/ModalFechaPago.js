import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ReactTooltip from 'react-tooltip';
import './modalito.css';
import ayudaFechaPago from '../../../assets/img/ayuda/fechaBoleto465.png'

function ModalFechaPago() {
  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
     
      
       
        <i className="modalFechaPago fa fa-question-circle fa-2x " data-tip data-for="botonTooltip" onClick={handleShow} ></i> 
       
        
        <ReactTooltip id="botonTooltipp" > 
        ayuda  
        </ReactTooltip>   
       
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Fecha de pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          

          

            <li ><p>Si desconoce la fecha de pago del boleto puede ingresar en el siguiente link para obtenerla:
            <a href="https://www.irrigacion.gov.ar/boleto/boletoOnline"  rel="noreferrer" target="_blank"> Boleto Electronico  </a></p>
            </li> 
            <br></br>  
           
          
           
          
            <img    
                src={ayudaFechaPago}
                alt="ayuda fecha de pago"
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

export default ModalFechaPago;