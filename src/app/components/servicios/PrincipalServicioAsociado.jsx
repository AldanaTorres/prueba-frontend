import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardBody,
} from "reactstrap";
import {
  buscarServicioAsociado

} from "../../reducers/servicioAsociadoReducer";
import Pagination from "../../util/Pagination"
import { searchPropToObj } from "../../util/lib";
import { useHistory } from "react-router-dom";
import ServicioAsociadoTable from "./ServicioAsociadoTable";
import SecureEntityHeader from "../../util/principal/SecuredEntityHeader";
import {
  buscarCuotasActivas

} from "../../reducers/cuotaReducer";

import { useKeycloak } from '@react-keycloak/web';
import "../../util/modales/modalito.css";


export default function PrincipalServicioAsociado() {

  const { keycloak } = useKeycloak()

  const login = keycloak && keycloak.tokenParsed && keycloak.tokenParsed.preferred_username

  let history = useHistory();

  const [isSearching, setIsSerching] = useState(false);
  const [paginacion, setPagination] = useState(true);
  const [searchProps, setSearchProps] = useState(null);
  

  const lstServicioAsociado = useSelector(state => state.servicioAsociadoReducer.lstServicioAsociado)

  const { currentPage, totalPages } = useSelector(state => state.servicioAsociadoReducer)
  //const sPagination = useSelector(state => state.servicioAsociadoReducer.pag)

  const dispatch = useDispatch();

  useEffect(() => {

    const searchProps = {
      "login.equals": login,
      "login.equalsActive": true,
    }

    function buscarInicial() {
      dispatch(buscarServicioAsociado(0, 20, searchPropToObj(searchProps)))
        .then(() => {
          setIsSerching(false)
          setSearchProps(searchProps);
      });

      dispatch(buscarCuotasActivas());
    }

    login && buscarInicial()
  }, [login, dispatch]);

  /*function buscar ({
    servicio
  }){
    const searchProps = {
      "servicio.equals": servicio && servicio.id,
      "servicio.equalsActive": servicio ? true : false,
     
    };
 
    this.setState({
      searchProps: searchProps,
      paginacion: true
    });
    this.setState({ isSearching: true });
    this.props
      .buscarServicioAsociado(0, 20, searchPropToObj(searchProps))
      .then(() => this.setState({ isSearching: false }))
      .catch((err) => {
        throw new SubmissionError(err);
      });
  };*/

  function data() {
    return {
      pagination: {
        currentPage,
        totalPages,
        onPagination: onPagination,
      },
    };
  };

  function onPagination(e, i) {
    e.preventDefault();
    setIsSerching(true);
    setPagination(true)
      dispatch(
        buscarServicioAsociado(i, 20, searchPropToObj(searchProps))
      ).then(() => {
        setIsSerching(false);
      });
  };


  return (
    <Card className="jh-card body">
      {
        //Esto es para cuando se realiza la búsqueda de servicioAsociados desde otro caso de uso utilizando la tabla para seleccionar la requerida
      }

      <SecureEntityHeader
        nombreCabecera="Mis Servicios"
        acceso="Servicios"
        sinSeguridad={true}
        nombreBoton="   Agregar Servicios"
        ms="Serviciosweb"
        link="/private/servicios/nuevo"
        className="agregarServicio"
      />

      <CardBody>


        <ServicioAsociadoTable
          data={lstServicioAsociado}
          loading={isSearching}
          acciones={true}
          pageCount={50}

          // fetchData={this.onPagination}
          history={history}
        />
      </CardBody>
      {paginacion ? (
         <Pagination {...{ ...data() }} />
          ) : ""}

      
    </Card>

  );

}

