import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useDispatch } from "react-redux";
import BuscarTipoServicioSelect from "./BuscarTipoServicioSelect";
import FieldCodigo from "./FieldCodigo";
import {
  buscarServicioPorCodigo,
  nuevoServicio,
} from "../../../reducers/servicioReducer";
import Swal from "sweetalert2";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import FieldCuit from "./porCuit/FieldCuit";
import BuscarServicioPorCuit from "./porCuit/BuscarServicioPorCuit";
import FieldNC from "./porNomenclatura/FieldNC";
import BuscarServicioPorNc from "./porNomenclatura/BuscarServicioPorNc";
import FieldCodigoPersona from "./porCodigoPersona/FieldCodigoPersona";
import BuscarServicioPorCodigoPersona from "./porCodigoPersona/BuscarServicioPorCodigoPersona";

export default function BuscarServicio({
  error,
  touched,
  handleServicio,
  actualiza,
  soloPrincipales,
}) {
  const [tipoServicio, setTipoServicio] = useState(null);
  const [codigo1, setCodigo1] = useState(null);
  const [codigo2, setCodigo2] = useState(null);
  const [cuit, setCuit] = useState(null);
  const [nomenclatura, setNomenclatura] = useState(null);
  const [codigoP, setCodigoP] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [mostrar, setMostrar] = useState(false);
  const [servicio, setServicio] = useState(null);

  const dispatch = useDispatch();

  const dato = { nombre: "nombre" };

  useEffect(() => {
    dispatch(nuevoServicio());
  }, [dispatch]);

  function submit(e) {
    e.preventDefault();
    setSubmitting(true);
    setMostrar(true);
    let codigo = tipoServicio.codigo;

    if (
      (codigo && (codigo === "A" || codigo === "B") && codigo1 && codigo2) ||
      (codigo === "C" && codigo1)
    ) {
      if (codigo === "A") {
        codigo = codigo + "" + codigo1 + "" + codigo2.padStart(4, "0");
      } else if (codigo === "B") {
        codigo =
          codigo +
          "" +
          codigo1.padStart(2, "0") +
          "" +
          codigo2.padStart(6, "0");
      } else if (codigo === "C") {
        codigo = codigo + "" + codigo1.padStart(9, "0");
      }

      dispatch(buscarServicioPorCodigo(codigo))
        .then((response) => {
          if (response && response.fechaBaja) {
            Swal.fire("Servicio Dado de Baja", response.fechaBaja);
            setServicio(null);
            handleServicio(null);
          } else {
            setServicio(response);
            handleServicio(response);
          }
          setSubmitting(false);
        })
        .catch(error);
    } else {
      Swal.fire("Debe completar todos los campos", "warning");
      setSubmitting(false);
    }
  }

  function handleTipoServicio(tipoServicio) {
    setTipoServicio(tipoServicio);
  }

  function handleCodigo1(e) {
    setCodigo1(e.target.value);
  }
  function handleCodigo2(e) {
    setCodigo2(e.target.value);
  }

  function handleCuit(e) {
    setCuit(e);
  }

  function handleNC(e) {
    setNomenclatura(e);
  }

  function handleCodigoPersona(e) {
    setCodigoP(e);
  }

  function handleSelectedServicio(serv) {
    setServicio(serv);
    setMostrar(false);
  }

  function agregarServicios() {
    servicio.length >= 1 ? setMostrar(true) : setMostrar(false);
    handleServicio(servicio);
  }

  function setNull() {
    setServicio(null);
  }

  function crearListaServicios() {
    return servicio.map((servicios) => {
      return servicios.codigo + " , ";
    });
  }

  return (
    <Fragment>
      <Container fluid>
        {!actualiza && (
          <Tabs
            defaultActiveKey="servicio"
            id="uncontrolled-tab-example"
            onSelect={(e) => setNull(e)}
          >
            <Tab eventKey="servicio" title="Servicio">
              <Row className="pt-4">
                <Col xs="12" md="3">
                  <BuscarTipoServicioSelect
                    handleTipoServicio={handleTipoServicio}
                    soloPrincipales={soloPrincipales}
                  />
                </Col>
                {tipoServicio ? (
                  <>
                    <Col xs="12" md="3">
                      <FieldCodigo
                        name="codigo1"
                        input={dato}
                        handleCodigo={handleCodigo1}
                        tipoServicio={tipoServicio}
                      />
                    </Col>

                    <Col xs="12" md="3">
                      <FieldCodigo
                        name="codigo2"
                        handleCodigo={handleCodigo2}
                        tipoServicio={tipoServicio}
                      />
                    </Col>

                    <Col className="mt-2 pt-4" xs="12" md="3">
                      <button
                        className="btn btn-primary mr-2"
                        disabled={submitting}
                        onClick={submit}
                      >
                        Buscar
                      </button>
                    </Col>
                  </>
                ) : (
                  ""
                )}
              </Row>
            </Tab>
            <Tab eventKey="cuit" title="CUIT">
            <Row className="pt-4">
                <Col xs="12" md="3">
                  <FieldCuit name="cuit" handleCuit={handleCuit} />
                </Col>
                <Col className="mt-2 pt-4" xs="12" md="3">
                  <BuscarServicioPorCuit
                    cuit={cuit}
                    handleSelected={handleSelectedServicio}
                    agregarServicios={agregarServicios}
                    serviciosSelected={servicio}
                  />
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="nc" title="NC">
            <Row className="pt-4">
                <Col xs="12" md="3">
                  <FieldNC name="nomenclatura" handleNC={handleNC} />
                </Col>
                <Col className="mt-2 pt-4" xs="12" md="3">
                  <BuscarServicioPorNc
                    nc={nomenclatura}
                    handleSelected={handleSelectedServicio}
                    agregarServicios={agregarServicios}
                    serviciosSelected={servicio}
                  />
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="codigoP" title="Código Persona">
            <Row className="pt-4">
                <Col xs="12" md="3">
                  <FieldCodigoPersona name="codigoP" handleCodigoPersona={handleCodigoPersona} />
                </Col>
                <Col className="mt-2 pt-4" xs="12" md="3">
                  <BuscarServicioPorCodigoPersona
                    codigoP={codigoP}
                    handleSelected={handleSelectedServicio}
                    agregarServicios={agregarServicios}
                    serviciosSelected={servicio}
                  />
                </Col>
              </Row>
            </Tab>
          </Tabs>
        )}
        <Row>
          <Col lg={12}>
            {servicio && mostrar && servicio.length > 1 ? (
              <p className="form-group txt-asociar">
                Servicios a Asociar: {crearListaServicios()}
              </p>
            ) : servicio &&
              mostrar &&
              servicio.length === 1 &&
              !servicio[0].fechaBaja ? (
              <p className="form-group txt-asociar">
                Servicio a Asociar: {servicio && servicio[0].codigo}
              </p>
            ) : servicio && mostrar && !servicio.fechaBaja ? (
              <p className="form-group txt-asociar">
                Servicio a Asociar: {servicio && servicio.codigo}
              </p>
            ) : (
              ""
            )}
            <div className="text-danger" style={{ marginBottom: "20px" }}>
              {touched && error}
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
