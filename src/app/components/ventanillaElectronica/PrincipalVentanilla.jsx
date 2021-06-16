import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardFooter } from "reactstrap";
import VentanillaTable from "./VentanillaTable";
import FormularioVentanilla from "./FormularioVentanilla";
import { buscarVentanillas } from "../../reducers/ventanillaElectronicaReducer";
import { searchPropToObj } from "../../util/lib";
import Pagination from "../../util/Pagination";
import { ITEMS_PER_PAGE } from "../../util/Constant";
import { useHistory } from "react-router-dom";

export default function PrincipalVentanilla() {
  const [searchProps, setSearchProps] = useState(null);

  const dispatch = useDispatch();
  let history = useHistory();
  const listaVentanillas = useSelector(
    (state) => state.ventanillaElectronicaReducer.listaVentanillas
  );
  const { currentPage, totalPages } = useSelector(
    (state) => state.ventanillaElectronicaReducer
  );

  useEffect(() => {
    const searchPropsInic = {
      "fechaVentanilla.equals": null,
      "fechaVentanilla.equalsActive": false,
      "asunto.contains": null,
      "asunto.containsActive": false,
      "leido.equals": null,
      "leido.equalsActive": false,
      "usuarioServicioId.equals": null,
      "usuarioServicioId.equalsActive": false,
    };
    function buscarInicial() {
      dispatch(
        buscarVentanillas(0, ITEMS_PER_PAGE, searchPropToObj(searchPropsInic))
      ).then(() => {
        setSearchProps(searchPropsInic);
      });
    }
    buscarInicial();
  }, [dispatch]);

  function buscar({ fechaVentanilla, asunto, leido, usuarioServicioId }) {
    const searchPropsSig = {
      "fechaVentanilla.equals": fechaVentanilla,
      "fechaVentanilla.equalsActive": fechaVentanilla ? true : false,
      "asunto.contains": asunto ? asunto : null,
      "asunto.containsActive": asunto ? true : false,
      "leido.equals": leido,
      "leido.equalsActive": leido ? true : false,
      "usuarioServicioId.equals": usuarioServicioId
        ? usuarioServicioId.id
        : null,
      "usuarioServicioId.equalsActive": usuarioServicioId ? true : false,
    };
    dispatch(
      buscarVentanillas(0, ITEMS_PER_PAGE, searchPropToObj(searchPropsSig))
    ).then(() => {
      setSearchProps(searchPropsSig);
    });
  }

  function data() {
    return {
      pagination: {
        currentPage,
        totalPages,
        onPagination: onPagination,
      },
    };
  }

  function onPagination(e, i) {
    e.preventDefault();
    dispatch(
      buscarVentanillas(i, ITEMS_PER_PAGE, searchPropToObj(searchProps))
    );
  }

  return (
    <Card className="jh-card body">
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-1 pb-1 pl-3 pr-2 mb-1">
          <h1 className="h2">Ventanilla Electrónica</h1>
        </div>
      </div>
      <CardBody>
        <FormularioVentanilla onSubmit={buscar} />
        <VentanillaTable listaVentanillas={listaVentanillas}  history={history} />
      </CardBody>
      <Pagination {...{ ...data() }}></Pagination>
      <CardFooter></CardFooter>
    </Card>
  );
}
