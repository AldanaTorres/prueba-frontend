import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import LeidaSelect from "./componentesVentanillaElectronica/LeidaSelect";
import {
  Card,
  CardBody,
  Col,
  Form,
  Row,
  ButtonGroup,
} from "reactstrap";
import Button from "react-bootstrap/Button";
import BuscarUsuarioServicioSelect from "./componentesVentanillaElectronica/BuscarUsuarioServicioSelect";

class FormularioVentanilla extends Component {
  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div className="form-group">
      <label forname={input.name}>{label}</label>
      <input
        {...input}
        type={type}
        className="form-control"
        id={input.name}
        placeholder={label}
      />
      <div className="text-danger" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );

  handleLeida = leido => {
    this.props.change("leido", leido)
    
  };

  render() {
    const { handleSubmit, pristine, submitting, reset } = this.props;
    return (
      <Col xs="12" md="12">
        <Card>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md="2">
                  <Field
                    name="fechaVentanilla"
                    label="Fecha"
                    type="Date"
                    component={this.renderField}
                  />
                </Col>
                <Col md="3">
                  <Field
                    name="asunto"
                    type="text"
                    component={this.renderField}
                    label="Asunto"
                  />
                </Col>
                <Col md="3">
                    <Field
                      name="leido"
                      handleLeida={this.handleLeida}
                      component={LeidaSelect}
                    />
                  </Col>
              <Col md="3">
                <Field
                  name="usuarioServicioId"
                  component={BuscarUsuarioServicioSelect}
                />
              </Col>
              </Row>

              <ButtonGroup>
                <Button size="md" color="info" type="submit">
                  <i className="fa fa-search" />
                  &nbsp; Buscar
                </Button>
                <Button
                  size="md"
                  outline="true"
                  color="secondary"
                  disabled={pristine || submitting}
                  onClick={reset}
                >
                  <i className="fa fa-eraser" />
                  &nbsp; Limpiar
                </Button>
              </ButtonGroup>
            </Form>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default reduxForm({
  form: "ventanillaForm",
})(FormularioVentanilla);
