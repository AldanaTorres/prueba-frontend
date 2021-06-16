import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

export default function DetalleServicioModal(props) {
    const [show, setShow] = useState(false);
    const servicio = props.servicio;
    const handleClose = () => setShow(false);
    

    useEffect(() => {
      
      servicio && setShow(true)
      
    }, [servicio])

    return (
      
    <>
      {servicio &&
      <Modal show={show} size="lg" onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Detalle del servicio <b>{servicio.codigo}</b></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="detalle">
            
            <table>
              <tbody>
                <tr>
                  <td>
                    <h4 ><b>Títular principal:</b></h4>
                      <p>Código: <b>{servicio.persona.codigo}</b></p>
                      <p>Nombre: <b>{servicio.persona.nombre}</b></p>
                      <p >Cuit: <b>{servicio.persona.cuit}</b></p>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr></hr>
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td ><span>Fecha de alta: </span><b>{servicio.fechaAlta ? servicio.fechaAlta : "-"}</b></td>
                  <td ><span>Nomenclatura: </span><b>{servicio.nomenclatura}</b></td>
                </tr>
                <tr>
                  <td ><span>Fecha de baja: </span><b>{servicio.fechaBaja ? servicio.fechaBaja : "-"}</b></td>
                  <td ><span>Organismo: </span><b>{servicio.organismo && servicio.organismo.nombre}</b></td>
                </tr>
                <tr>
                  <td >Uso: <b>{servicio.uso.nombre}</b></td>
                  <td >{servicio.tipoServicio.id===1? "Categoría de Derecho: " : servicio.tipoServicio.id===2? "Díametro de entubamiento: " : "Categoría de contaminación: "}
                  <b>{servicio.tipoServicio.id===1 ? servicio.categoriaDerecho.nombre : servicio.tipoServicio.id===2 ? servicio.diametroEntubamiento : servicio.categoriaContaminacion && servicio.categoriaContaminacion.nombre}</b></td>
                </tr>          
                <tr>
                  <td >{servicio.tipoServicio.id===1 ? "Mapa Hídrico: " : ""}<b>{servicio.tipoServicio.id===1 ? servicio.mapaHidrico.nombre : ""}</b></td>
                  <td >{servicio.tipoServicio.id===1 ? "Superficie Empadronada: " : ""}<b>{servicio.tipoServicio.id===1 ? servicio.superficieEmpadronada : ""}</b></td>
                </tr>
              </tbody>
            </table>
          </div> 
        </Modal.Body>
      </Modal>
      }
    </>
    );
}