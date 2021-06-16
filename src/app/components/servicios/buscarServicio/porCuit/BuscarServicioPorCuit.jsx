import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { Modal, ModalFooter } from "react-bootstrap";
import ServicioTable from "../../componentesServicios/ServicioTable";
import { buscarPersonaPorCuit } from "../../../../reducers/personaReducer";
import "../../../../util/Style.css";

export default function BuscarServicioPorCuit(props) {
  const [show, setShow] = useState(false);
  const [persona, setPersona] = useState(null);

  const handleClose = () => setShow(false);
  const cuit = props.cuit;
  const dispatch = useDispatch();

  function submit() {
    dispatch(buscarPersonaPorCuit(cuit.toString())).then((resp) => {
      setPersona(resp.payload.data);
      setShow(true);
    }).catch((err) => {
      
    });
  }

  function handleList() {
    props.agregarServicios()
    handleClose();
  }

  return (
    <>
      <div className="form-group">
        <Button
          size="md"
          disabled={cuit ? false : true}
          outline
          color="info"
          onClick={submit}
        >
          Buscar Servicios
        </Button>
      </div>
      <Modal show={show} size="lg" onHide={handleClose} animation={false}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <ServicioTable
            handleSelected={(e) => props.handleSelected(e)}
            persona={persona}
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
