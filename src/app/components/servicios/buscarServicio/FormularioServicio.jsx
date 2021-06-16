import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { Row, Col, Form } from "reactstrap";
import BuscarTipoServicioSelect from "./BuscarTipoServicioSelect";

const validaciones = (valores) => {
  const errores = {};
  if (!valores.tipoServicio) {
    errores.tipoServicio = "tipoServicio requerido";
  }
  return errores;
};

class FormularioServicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  setOpen = () => {
    this.setState({ open: !this.state.open });
  };

  handleSelectedTipoServicio = (cm) => {
    if (cm) this.props.change("tipoServicio", cm);
  };

  retrievePlaceHolder = (tipo, name) => {
    if (tipo && tipo.codigo) {
      if (tipo.codigo === "A") {
        if (name === "codigo1") {
          return "Código de Cauce";
        } else if (name === "codigo2") {
          return "Padrón parcial";
        }
      } else if (tipo.codigo === "B") {
        if (name === "codigo1") {
          return "Departamento";
        } else if (name === "codigo2") {
          return "Nro Pozo";
        }
      } else if (tipo.codigo === "C") {
        if (name === "codigo1") {
          return "Código Contaminación";
        }
      }
    }
    return "";
  };

  renderFieldCodigo = ({
    tipoServicio,
    input,
    label,
    type,
    meta: { touched, error },
  }) =>

  (
    <div className="form-group">
      <label forname={input.nombre}>{label}</label>
      <input
        {...input}
        type={
          tipoServicio &&
            (tipoServicio.codigo === "A" || tipoServicio.codigo === "B")
            ? "text"
            : tipoServicio &&
              tipoServicio.codigo === "C" &&
              input.name === "codigo1"
              ? "text"
              : tipoServicio &&
                tipoServicio.codigo === "C" &&
                input.name === "codigo2"
                ? "hidden"
                : ""
        }
        className="form-control position-relative"
        id={input.nombre}
        placeholder={this.retrievePlaceHolder(tipoServicio, input.name)}
        max={
          tipoServicio &&
            tipoServicio.codigo === "A" &&
            input.name === "codigo1"
            ? "[1000-9999]"
            : tipoServicio &&
              (tipoServicio.codigo === "A" || tipoServicio.codigo === "B") &&
              input.name === "codigo2"
              ? "9999"
              : tipoServicio &&
                tipoServicio.codigo === "B" &&
                input.name === "codigo1"
                ? "99"
                : tipoServicio &&
                  tipoServicio.codigo === "C" &&
                  input.name === "codigo1"
                  ? "9999999999"
                  : ""
        }
        minLength={
          tipoServicio &&
            tipoServicio.codigo === "A" &&
            input.name === "codigo1"
            ? "4"
            : tipoServicio &&
              (tipoServicio.codigo === "A" || tipoServicio.codigo === "B") &&
              input.name === "codigo2"
              ? "1"
              : tipoServicio &&
                tipoServicio.codigo === "B" &&
                input.name === "codigo1"
                ? "1"
                : tipoServicio &&
                  tipoServicio.codigo === "C" &&
                  input.name === "codigo1"
                  ? "1"
                  : ""
        }
        maxLength={
          tipoServicio &&
            tipoServicio.codigo === "A" &&
            input.name === "codigo1"
            ? "4"
            : tipoServicio &&
              (tipoServicio.codigo === "A" || tipoServicio.codigo === "B") &&
              input.name === "codigo2"
              ? "6"
              : tipoServicio &&
                tipoServicio.codigo === "B" &&
                input.name === "codigo1"
                ? "2"
                : tipoServicio &&
                  tipoServicio.codigo === "C" &&
                  input.name === "codigo1"
                  ? "9"
                  : ""
        }
      />
      <div className="text-danger" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );



  render() {
    const { tipoServicio, handleSubmit } = this.props;
    return (
      <Fragment>
        <Col xs="12" md="12">


          <Form onSubmit={handleSubmit} >


            <Row md="12">
              <Col lg={4} className="pt-3">
                <Field
                  name="tipoServicio"
                  component={BuscarTipoServicioSelect}
                />
              </Col>
              <Col className="pt-4">
                <Field
                  name="codigo1"
                  tipoServicio={tipoServicio}
                  component={this.renderFieldCodigo}
                />
              </Col>

              <Col className="pt-4">
                <Field
                  name="codigo2"
                  tipoServicio={tipoServicio}
                  component={this.renderFieldCodigo}
                />
              </Col>
              <Col className="mt-3 pt-4">
                <button className="btn btn-primary mr-2" type="submit">
                  Buscar
                  </button>
              </Col>
            </Row>
          </Form>


        </Col>
      </Fragment>
    );
  }
}

const selector = formValueSelector("buscarServicio");

FormularioServicio = connect((state) => {
  // can select values individually
  const tipoServicio = selector(state, "tipoServicio");
  const codigo1 = selector(state, "codigo1");
  const codigo2 = selector(state, "codigo2");


  return {
    tipoServicio,
    codigo1,
    codigo2
    //servicio: state.servicioReducer.servicio,
  };
})(FormularioServicio);

export default reduxForm({
  form: "buscarServicio",
  validate: validaciones,
})(FormularioServicio);
