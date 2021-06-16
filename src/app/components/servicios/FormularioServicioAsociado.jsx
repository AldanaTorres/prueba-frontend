import React, { Component, Fragment } from "react";
import { Col, Form, Label, Row, Card, Container } from "reactstrap";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { AppSwitch } from "@coreui/react";
import moment from "moment";
import BuscarServicio from "./buscarServicio/BuscarServicio";
import "moment/locale/es";
import "../../util/main.css";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TerminosYCondiciones from "./TerminosYCondiciones";
import ReCAPTCHA from "react-google-recaptcha";
import "react-datepicker/dist/react-datepicker.css";
import Modalito from "../../util/modales/ModalInstructivo";
import "../../util/modales/modalito.css";
import ReactTooltip from "react-tooltip";

const validate = (values) => {
  const errors = {};

  if (!values.captcha) {
    errors.captcha = " Por favor, indique que no es un robot.";
  }

  if (!values.anio) {
    errors.anio = "Debe Ingresar el año del Boleto";
  }

  if (!values.codigoServicio) {
    errors.codigoServicio = "Debe ingresar un Servicio";
  }

  if (!values.numero) {
    errors.numero = "Debe Ingresar el Número de Boleto";
  }

  if (!values.terminos) {
    errors.terminos = "Debe Aceptar los términos y condiciones";
  }

  /*if (!values.fechaPago) {
    errors.fechaPago = "Debe Ingresar la Fecha de Pago del Boleto";
  }

  if (!values.fechaVencimiento) {
    errors.fechaVencimiento = "Debe Ingresar la fechade Vencimiento de Boleto";
  }

  if (!values.importe || values.importe === 0.0) {
    errors.importe = "Debe ingresar el Importe del Boleto";
  }*/

  return errors;
};

class FormularioServicioAsociado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      spinner: false,
    };
  }

  setOpen = () => {
    this.setState({ open: !this.state.open });
  };

  cargarSpinner() {
    this.setState({ spinner: true });
  }

  setImporte = () => {
    this.setState({ importe: !this.state.importe });
  };

  handleServicio(cm) {
    this.props.change("listaServicios", null);
    this.props.change("codigoServicio", null);

    if (cm.length > 1) {
      this.props.change("listaServicios", cm);
    } else if (cm.length === 1) {
      const codigo = cm && cm[0].codigo;
      this.props.change("codigoServicio", codigo);
    } else {
      const codigo = cm && cm.codigo;
      this.props.change("codigoServicio", codigo);
    }
  }

  handleBoletoElectronico(isBoletoElectronico) {
    this.props.change("boletoDigital", isBoletoElectronico.target.checked);
  }

  handleTerminios(terminos) {
    this.props.change("terminos", terminos.target.checked);
  }

  updateFechaVencimiento(fechaVencimiento) {
    if (fechaVencimiento) {
      const result = moment(fechaVencimiento)
        .format("YYYY-MM-DD hh:mm")
        .substring(0, 10);
      this.props.change("fechaVencimiento", result);
    }
  }

  updateFecha(fecha) {
    if (fecha) {
      const result = moment(fecha).format("YYYY-MM-DD hh:mm").substring(0, 10);
      this.props.change("fechaPago", result);
    }
  }

  testSubmit() {
    this.props.handleSubmit(this.props.values);
  }

  captchaChange(value) {
    this.props.change("captcha", value);
  }

  renderField = ({
    input,
    label,
    type,
    placeholder,
    valor,
    onChange,
    meta: { touched, error },
  }) => (
    <div className="form-group">
      <label forname={input.name}>{label}</label>
      <input
        onChange={onChange ? onChange : null}
        {...input}
        disabled={this.props.actualiza}
        value={input.value ? input.value : valor}
        type={type}
        className="form-control"
        id={input.name}
        placeholder={placeholder}
      />
      <div className="text-danger" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );

  renderSwitch = ({
    input,
    label,
    type,
    placeholder,
    valor,
    onChange,
    meta: { touched, error },
  }) => (
    <>
      <AppSwitch
        name="terminos"
        className={"mx-1"}
        variant={"pill"}
        color={"success"}
        checked={this.props.terminos ? true : false}
        onChange={(e) => this.handleTerminios(e)}
      />
      <div className="text-danger" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </>
  );

  renderCaptcha = ({ meta: { touched, error } }) => (
    <>
      <ReCAPTCHA
        name="captcha"
        ref={(ref) => (this.recaptcha = ref)}
        sitekey="6LdYhLAaAAAAAEcwHHyIcozs7s-UbOudmZEGYZAL"
        onChange={(e) => this.captchaChange(e)}
      />
      <div className="text-danger" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </>
  );

  render() {
    const {
      actualiza,
      handleSubmit,
      cargando,
      error,
      submitting,
      servicio,
     listaServicios
    } = this.props;
    if (cargando) {
      return <span>Cargando...</span>;
    }
    return (
      <div id="app-ListarServicioAsociado">
        <Card>
          
          <div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3  pl-3 pr-2">
              <Row>
                <h2>Agregar Servicio</h2>
                <div className="modalInstructivo">
                  <Modalito />
                </div>
              </Row>

              <Link className="btn back" to="/private/servicios">
                Volver
              </Link>
            </div>
          </div>
          
          <div>
            <Form onSubmit={handleSubmit}>
              
              <Row>
                <Field
                  name="servicio"
                  actualiza={actualiza}
                  handleServicio={(e) => this.handleServicio(e)}
                  component={BuscarServicio}
                  soloPrincipales="true"
                />
              </Row>

              {servicio || listaServicios ? (
                <>
                  <Fragment>
                    {!actualiza && (
                      <Container fluid className="bg-gris p-3 mt-3 mb-3">
                        <Row>
                          <Col lg={12}>
                            <h5 className="mb-3">Validación con Boleto del Servicio</h5>
                          </Col>
                        </Row>

                        <Row>
                          <Col xs="10" md="2">
                                <Field
                                  name="anio"
                                  type="number"
                                  component={this.renderField}
                                  label="Año Boleto" 
                                />
                          </Col> 
                          <Col xs="2" md="1">     
                                <div className="modalFechaPago">
                                <i className=" fa fa-question-circle fa-2x" data-tip data-for="botonTooltip"  ></i>
                                <ReactTooltip id="botonTooltip"  > 
                                    El año ingresado debe ser posterior al 2017 
                                </ReactTooltip> 
                               </div>
                          </Col>
                          
                          <Col md="2">
                            <Field
                              name="numero"
                              type="number"
                              component={this.renderField}
                              label="Número Boleto"
                            />
                          </Col>
                        </Row>

                        <Row>
                          {/*<Col md="2">
                            <div className="form-group">
                              <label forname="fechaVencimiento"></label>Fecha
                              vencimiento <br />
                              <DatePicker
                                dateFormat="dd/MM/yyyy"
                                selected={
                                  moment(fechaVencimiento).isValid()
                                    ? moment(fechaVencimiento).toDate()
                                    : new Date()
                                }
                                onChange={(date) =>
                                  this.updateFechaVencimiento(date)
                                }
                                className="form-control"
                              />
                            </div>
                              </Col>

                          <Col md="2">
                            <Label>Importe Boleto</Label>
                            <Field
                              name="importe"
                              type="number"
                              component={Importe}
                            />
                          </Col>

                          <Col md="3">
                            <Row>
                              <div className="form-group">
                                <label forname="fechaPago"></label>Fecha Pago{" "}
                                <br />
                                <DatePicker
                                  dateFormat="dd/MM/yyyy"
                                  selected={
                                    moment(fechaPago).isValid()
                                      ? moment(fechaPago).toDate()
                                      : new Date()
                                  }
                                  onChange={(date) => this.updateFecha(date)}
                                  className="form-control"
                                />
                              </div>

                              <div className="modalFechaPago">
                                <ModalFechaPago />
                              </div>
                            </Row>
                          </Col>*/}
                        </Row>
                      </Container>
                    )}

                    <Row>
                      <Col md="4 p-switch mb-5">
                        <p>¿Adhiere a Boleto Electrónico?</p>

                        <AppSwitch
                          name="boletoDigital"
                          className={"mx-1"}
                          variant={"pill"}
                          color={"success"}
                          checked={this.props.boletoDigital ? true : false}
                          onChange={(e) => this.handleBoletoElectronico(e)}
                          disabled={true}
                        />
                      </Col>
                    </Row>
                    {!actualiza ? (
                      <>
                        <Row>
                          <Col md="12">
                            <Label>Terminos y Condiciones</Label>
                            <div
                              className="overflow-auto"
                              style={{ maxHeight: 200 }}
                            >
                              <TerminosYCondiciones />
                            </div>
                          </Col>
                        </Row>

                        <br></br>
                        <Row>
                          <Col md="4 p-switch mb-5">
                            <p>Aceptar Términos y Condiciones</p>
                            <Field
                              name="terminos"
                              component={this.renderSwitch}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Field
                            name="captcha"
                            component={this.renderCaptcha}
                          ></Field>
                        </Row>
                        <br></br>
                      </>
                    ) : (
                      ""
                    )}
                  </Fragment>

                  <Row>{error && <strong>{error}</strong>}</Row>
                  <Row>
                    <Col lg={12}>
                      <Link
                        className="btn btn-light mr-2"
                        to="/private/servicios"
                      >
                        Cancelar
                      </Link>
                      {!actualiza && (
                        <>
                          <button
                            className="btn btn-primary mr-2"
                            type="submit"
                            disabled={submitting}
                          >
                            {"Asociar Servicio"}
                          </button>
                        </>
                      )}
                    </Col>
                  </Row>
                </>
              ) : (
                ""
              )}
            </Form>
          </div>
        </Card>
      </div>
    );
  }
}

const selector = formValueSelector("asociarServicioForm");

FormularioServicioAsociado = connect((state) => {
  // can select values individually
  const servicio = selector(state, "codigoServicio");

  const fechaVencimiento = selector(state, "fechaVencimiento");
  const fechaPago = selector(state, "fechaPago");
  const boletoDigital = selector(state, "boletoDigital");
  const listaServicios = selector(state, "listaServicios");
  const terminos = selector(state, "terminos");

  return {
    servicio,
    boletoDigital,
    terminos,
    fechaVencimiento,
    fechaPago,
    listaServicios
  };
})(FormularioServicioAsociado);

export default reduxForm({
  form: "asociarServicioForm",
  validate,
})(FormularioServicioAsociado);
