import React, { useState } from "react";
import DataGrid, { Column, Paging } from "devextreme-react/data-grid";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { eliminarServicioAsociado } from "../../reducers/servicioAsociadoReducer";
import { buscarServicioPorCodigo } from "../../reducers/servicioReducer";
import SecureTableActions from "../../util/principal/SecureTableActions";
import DetalleServicioModal from "./DetalleServicioModal";
import { ButtonGroup } from "reactstrap";
import ButtonGeneric from "../../util/ButtonGeneric";


export default function ServicioAsociadoTable({
  data,
  pageCount: controlledPageCount,
  history,
  handleSelectedAsociarServicio,
}) {
  const [servicio, setServicio] = useState(null);
  const dispatch = useDispatch();

  const cuotas = useSelector(state => state.cuotaReducer);


  const go = {
    new: () => {
      history.push(`/recursos/AsociarServicio/nueva`);
    },
    update: (id) => history.push(`/private/servicios`),
    busquedaAsociarServicio: (AsociarServicio) =>
      handleSelectedAsociarServicio(AsociarServicio),
    delete: (data) => {
      Swal.fire({
        title: "",
        text: "Si se elimina, no se puede recuperar!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar!",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.value) {
          dispatch(eliminarServicioAsociado(data.id));
        }
      });
    },
    detail: (servicioAsociado) => {
      dispatch(buscarServicioPorCodigo(servicioAsociado.codigoServicio)).then(
        (response) => {
          setServicio(response);
        }
      );
    },
    verBoleto: (servicioAsociado) => {
      const codigo = servicioAsociado.codigoServicio;
      const tipo = codigo[0];
      let cc1 = "";
      let cc2 = "";

      if(tipo === "B"){
        cc1 = codigo.substring(1,3)
        cc2 = parseInt(codigo.substring(5,9));
      }

      if(tipo === "A"){
        cc1 = codigo.substring(1,5)
        cc2 = parseInt(codigo.substring(5,9));
      }

      if(tipo === "C"){
        cc1 = parseInt(codigo.substring(1,10));
      }

      window.open("https://www.irrigacion.gov.ar/boleto/boletoOnline/#/servicio/"+tipo+"/"+cc1+"/"+cc2, "_blank")
    },
  };

  return (
    <div className="mt-4">
      <DetalleServicioModal servicio={servicio} />
      <DataGrid
        id="gridAsociarServicio"
        dataSource={data}
        showBorders={true}
        showColumnLines={true}
        wordWrapEnabled={true}
        showRowLines={true}
        noDataText="No existen Servicios Asociados para el Usuario"
      >
        <Paging enabled={true} />

        <Column name="servicio" dataField="codigoServicio" caption="Código Servicio">


        </Column>
        <Column dataField="boletoDigital"></Column>
        <Column
          caption="Acciones"
          cellRender={(cellInfo) => {
            return (
                <ButtonGroup>
                    <SecureTableActions
                      sinSeguridad={false}
                      data={cellInfo.data}
                      actions={go}
                    />{
                      cuotas.cuotas && cuotas.cuotas.map(m =>
                         m.tipo && cellInfo.data.codigoServicio.includes(m.tipo) ? 
                         <ButtonGeneric key={cellInfo.data.codigoServicio} icon={"fa-money"} actions={go.verBoleto} data={cellInfo.data}/> 
                         : "")
                    }
                    
                </ButtonGroup>
            );
          }}
        />
      </DataGrid>
    </div>
  );
}
