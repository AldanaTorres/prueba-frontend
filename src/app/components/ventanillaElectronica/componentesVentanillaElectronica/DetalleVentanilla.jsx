import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
  ButtonGroup,
} from "reactstrap";
import "../../../util/main.css";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import moment from "moment";
import { descargarArchivoVentanilla } from "../../../reducers/archivoVentanillaElectronicaReducer";

class DetalleVentanilla extends Component {
  renderField = (value, name, label, type) => (
    <Row>
      <Col md="4">
        <label className="mr-3">{label}:</label>
      </Col>
      <Col md="6">
        <input
          value={value ? value : ""}
          style={{ width: "100%" }}
          id={name}
          type={type}
          disabled={true}
          checked={value ? true : false}
        />
      </Col>
    </Row>
  );

  renderTextareaField = (value, name, label, type) => (
    <div className="pb-3">
      <label>{label}</label>
      <div>
        <textarea
          style={{ width: "100%", height: "5rem" }}
          value={value}
          id={name}
          type={type}
          disabled={true}
        />
      </div>
    </div>
  );

  button = (icon, fun) => (
    <Button className="group-button" size="md" id={icon} onClick={fun}>
      <i className={"fa " + icon} />
    </Button>
  );

  descargaPDF = (archivo) => {
    this.props.descargarArchivoVentanilla(archivo.id, archivo.nombre);
  };

  render() {
    const { initialvalues } = this.props;
    return (
      <div id="app-DetalleVentanilla">
        <Card className="jh-card body">
          <CardHeader>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 pl-3 pr-2 mb-3">
              <h2>Detalle Ventanilla Electrónica</h2>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group mr-2">
                  <ButtonGroup>
                    {initialvalues.archivoVentanilla &&
                      this.button("fa-download", () =>
                        this.descargaPDF(initialvalues.archivoVentanilla)
                      )}
                  </ButtonGroup>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <Row className="mb-3">
              <Col md="6">
                {this.renderField(
                  initialvalues.tema.nombre,
                  "nombre",
                  "Tema",
                  "text"
                )}
              </Col>
              <Col md="6">
                {this.renderField(
                  initialvalues.asunto,
                  "asunto",
                  "Asunto",
                  "text"
                )}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md="6">
                {this.renderField(
                  moment(initialvalues.fechaVentanilla).format("DD/MM/YYYY"),
                  "fechaVentanilla",
                  "Fecha de notificación",
                  "text"
                )}
              </Col>
              <Col md="6">
                {this.renderField(
                  moment(initialvalues.fechaLectura).isValid() ? moment(initialvalues.fechaLectura).format("DD/MM/YYYY") : "-",
                  "fechaLectura",
                  "Fecha de lectura",
                  "text"
                )}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md="6">
                {this.renderField(
                  initialvalues.organismo,
                  "organismo",
                  "Organismo",
                  "text"
                )}
              </Col>
              <Col md="6">
                {this.renderField(
                  initialvalues.leido,
                  "leido",
                  "Leído",
                  "checkbox"
                )}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md="6">
                {this.renderTextareaField(
                  initialvalues.tema.descripcion,
                  "descripcion",
                  "Descripción",
                  "text"
                )}
              </Col>
              <Col md="6">
                {this.renderTextareaField(
                  initialvalues.mensaje,
                  "mensaje",
                  "Mensaje",
                  "text"
                )}
              </Col>
            </Row>
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
      </div>
    );
  }
}

function mapState(state) {
  return {};
}

const actions = {
  descargarArchivoVentanilla,
};

export default connect(mapState, actions)(DetalleVentanilla);
