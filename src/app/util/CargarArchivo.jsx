import React, { Component } from "react";
import { Button, Label, Col, Row } from "reactstrap";
import SecureActionsTransaccionBancaria from "./principal/SecureActionsTransaccionBancaria";

import { customSecurity } from "../util/principal/customSecurity";


class CargarArchivo extends Component {
  state = {
    selectedFile: null,
  };

  fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  fileUploadHandler = () => {
    const nombre = this.state.selectedFile.name.toString();
    const fd = new FormData();
    fd.append(
      this.props.tipoArchivo ? this.props.tipoArchivo : "file",
      this.state.selectedFile,
      nombre
    );
    this.props.cargarArchivo(fd);
  };

  render() {
    return (
      <>
        <Col>
          <Row>
            <Label>
              {this.state.selectedFile ? this.state.selectedFile.name : ""}
            </Label>
          </Row>
          <Row>
            <input
              style={{ display: "none" }}
              type={this.props.tipoArchivo ? this.props.tipoArchivo : "file"}
              onChange={this.fileSelectedHandler}
              ref={(fileInput) => (this.fileInput = fileInput)}
            />

            {this.props.permiso ?
              <>
                <Button onClick={() => this.fileInput.click()} color={"primary"}>
                  {this.props.etiquetaAdjuntar ? this.props.etiquetaAdjuntar : "Adjuntar Archivo"}
                </Button>

                <Button
                  className="ml-2"
                  onClick={this.fileUploadHandler}
                  color={this.props.color ? "primary" : "secondary"}
                >
                  {this.props.datetiquetaCargar ? this.props.etiquetaCargar : "Enviar"}
                </Button>
              </>
              
               : ""
            }
 
            {/*<SecureActionsTransaccionBancaria
              acceso="Archivo"
              ms="Expedientes"
              data={this.props}
              color={this.state.selectedFile}
              actions={this.fileUploadHandler}
              fileInput={this.fileInput}
              archivo={true}
            />*/}
          </Row>
        </Col>
      </>
    );
  }
}

export default CargarArchivo;
