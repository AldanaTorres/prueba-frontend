import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid, {
  Column,
  Selection,
  Paging,
} from "devextreme-react/data-grid";
import { buscarServicios } from "../../../reducers/servicioReducer";
import { Card, CardBody, CardHeader } from "reactstrap";
import { searchPropToObj } from "../../../util/lib";
import Spinner from "../../../util/Spinner";

export default function ServicioTable({
  pageCount: controlledPageCount,
  nc,
  persona,
  codigoP,
  handleSelected,
  serviciosSelected,
}) {
  const [selectedRowKeys, setSelectedRowKeys] = useState(
    serviciosSelected ? serviciosSelected : []
  );
  const [listaFiltrada, setLista] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const dispatch = useDispatch();

  const fetchData = useCallback(() => {
    setIsSearching(true);
    if (persona) {
      const searchPropsPer = {
        "personaId.equals": persona.id,
        "personaId.equalsActive": true,
      };
      dispatch(buscarServicios(searchPropToObj(searchPropsPer))).then((res) => {
        armarLista(res.payload);
      });
    } else if (nc) {
      const searchPropsNc = {
        "nomenclatura.equals": nc,
        "nomenclatura.equalsActive": true,
      };
      dispatch(buscarServicios(searchPropToObj(searchPropsNc))).then((res) => {
        armarLista(res.payload);
      });
    } else if (codigoP) {
      const searchPropsCod = {
        "codigo_persona.equals": codigoP,
        "codigo_persona.equalsActive": true,
      };
      dispatch(buscarServicios(searchPropToObj(searchPropsCod))).then((res) => {
        armarLista(res.payload);
      });
    }
  }, [dispatch, persona, nc, codigoP]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const lstServicioAsociado = useSelector(
    (state) => state.servicioAsociadoReducer.lstServicioAsociado
  );

  function armarLista(lst) {
    let lista = lst.filter((servicio) => {
      let res = lstServicioAsociado.find((servicioAsoc) => {
        return servicio.id !== servicioAsoc.id;
      });
      return res;
    });
    setLista(lista);
    setIsSearching(false);
  }

  function onSelectionChanged(e) {
    setSelectedRowKeys(e.selectedRowKeys);
    handleSelected(e.selectedRowKeys);
  }

  return (
    <div id="app-Servicios">
      <Card className="jh-card body">
        <CardHeader>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 pl-3 pr-2 mb-3">
            <h2>Mis servicios</h2>
          </div>
        </CardHeader>
        {isSearching ? (
          <Spinner />
        ) : (
          <CardBody>
            <DataGrid
              showBorders={true}
              dataSource={listaFiltrada}
              wordWrapEnabled={true}
              showColumnLines={true}
              showRowLines={true}
              rowAlternationEnabled={true}
              noDataText={
                nc
                  ? "No existen Servicios para la Nomenclatura"
                  : "No existen Servicios para el Usuario"
              }
              selectedRowKeys={selectedRowKeys}
              onSelectionChanged={onSelectionChanged}
            >
              <Selection
                mode="multiple"
                selectAllMode="allPages"
                showCheckBoxesMode="onClick"
              />
              <Paging defaultPageSize={10} />
              <Column
                dataField="codigo"
                caption="Código"
                cssClass="alignTable"
                alignment="left"
              />
              <Column
                caption="Tipo de Servicio"
                cssClass="alignTable"
                alignment="left"
                cellRender={(cellInfo) => {
                  return cellInfo.data.tipoServicio
                    ? cellInfo.data.tipoServicio.codigo +
                        " - " +
                        cellInfo.data.tipoServicio.nombre
                    : "";
                }}
              />
              <Column
                caption="Uso"
                cssClass="alignTable"
                alignment="left"
                cellRender={(cellInfo) => {
                  return cellInfo.data.uso
                    ? cellInfo.data.uso.codigo +
                        " - " +
                        cellInfo.data.uso.nombre
                    : "";
                }}
              />
              <Column
                caption="Organismo"
                cssClass="alignTable"
                alignment="left"
                cellRender={(cellInfo) => {
                  return cellInfo.data.organismo
                    ? cellInfo.data.organismo.codigo +
                        " - " +
                        cellInfo.data.organismo.nombre
                    : "";
                }}
              />
            </DataGrid>
          </CardBody>
        )}
      </Card>
    </div>
  );
}
