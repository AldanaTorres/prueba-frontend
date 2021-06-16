import React from "react";
import { useDispatch } from "react-redux";
import DataGrid, { Column } from "devextreme-react/data-grid";
import { Button, ButtonGroup } from "reactstrap";
import moment from "moment";
import { descargarArchivoVentanilla } from "../../reducers/archivoVentanillaElectronicaReducer";

export default function VentanillaTable({
  listaVentanillas,
  pageCount: controlledPageCount,
  history,
}) {
  
  const dispatch = useDispatch();

   const button = (icon, fun) => (
    <Button className="group-button" size="md" id={icon} onClick={fun}>
      <i className={"fa " + icon} />
    </Button>
  );

  const go = {
    descargaPDF: (vent) => dispatch(descargarArchivoVentanilla(vent.id, vent.nombre)),   
    detail: (id) =>
      history.push(`/private/notificacion/${id}/${"detalle"}`),
  };

    return (
      <DataGrid
        showBorders={true}
        dataSource={listaVentanillas}
        wordWrapEnabled={true}
        showColumnLines={true}
        showRowLines={true}
        rowAlternationEnabled={true}
        noDataText="No hay notificaciones"
      >
        <Column
          caption="Tema"
          cssClass="alignTable"
          cellRender={(cellInfo) => {
            return cellInfo.data.tema
              ? cellInfo.data.tema.nombre
              : "";
          }}
        />
         <Column
          caption="Fecha"
          cssClass="alignTable"
          alignment="left"
          cellRender={(cellInfo) => {
            return cellInfo.data.fechaVentanilla
              ? moment(cellInfo.data.fechaVentanilla).format("DD/MM/YYYY")
              : "";
          }}
        />
        <Column
          dataField="asunto"
          caption="Asunto"
          cssClass="alignTable"
          alignment="left"
        />
        <Column
          dataField="organismo"
          caption="Organismo"
          cssClass="alignTable"
          alignment="left"
        />
        <Column dataField="leido"></Column>
        <Column
            caption="Adjunto"
            cssClass="alignTable"
            cellRender={(cellInfo) => {
                return (
                <ButtonGroup>
                  {cellInfo.data.archivoVentanilla && button("fa-download", () => go.descargaPDF(cellInfo.data.archivoVentanilla))}
                </ButtonGroup>
              );
              }}
          />
          <Column
            caption="Acciones"
            cssClass="alignTable"
            width={90}
            cellRender={(cellInfo) => {
                return (
                 <ButtonGroup>
                   {button("fa-search", () => go.detail(cellInfo.data.id))}
                 </ButtonGroup>
              );
              }}
          />
      </DataGrid>
    );
  }
