import React, { useState } from "react";
import { Button } from "reactstrap";
import { Modal, ModalFooter } from "react-bootstrap";
import ServicioTable from "../../componentesServicios/ServicioTable";
import "../../../../util/Style.css";

export default function BuscarServicioPorCodigoPersona(props) {
  const [show, setShow] = useState(false);
 
  const handleClose = () => setShow(false);
  const codigoP = props.codigoP;

  const handleShow = () => setShow(true);

  function handleList() {
    props.agregarServicios()
    handleClose();
  }

  return (
    <>
      <div className="form-group">
        <Button
          size="md"
          disabled={codigoP ? false : true}
          outline
          color="info"
          onClick={handleShow}
        >
          Buscar Servicios
        </Button>
      </div>
      <Modal show={show} size="lg" onHide={handleClose} animation={false}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <ServicioTable
            handleSelected={(e) => props.handleSelected(e)}
            codigoP={codigoP}
            serviciosSelected={props.serviciosSelected}
          />
        </Modal.Body>
        <ModalFooter>
          <Button size="md" outline color="primary" onClick={handleList}>
            {"Agregar"}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
