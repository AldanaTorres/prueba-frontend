import React from "react";
import { useSelector } from "react-redux";
import SelectSearch from "react-select-search";
import "../../../util/Select.css";

export default function BuscarUsuarioServicioSelect(props) {
  const valor = props.input ? props.input.value : null;

  function handleChange(e, options) {
    if (e) {
      const usuarioServicioId = options.filter((o) => o.value === e);
      if (usuarioServicioId && usuarioServicioId[0]) {
        if (props.input) {
          props.input.onChange(usuarioServicioId[0].usuarioServicioId);
        } 
      }
    }
  }

  let lstServicioAsociado = useSelector(
    (state) => state.servicioAsociadoReducer.lstServicioAsociado
  );



  let selectedOption = useSelector(
    (state) => state.servicioAsociadoReducer.servicioAsociadoSelected
  );

  let options = [];

  if (lstServicioAsociado) {
    lstServicioAsociado.forEach(element => {
      options.push(createOption(element));
    });
  }

  function createOption(dato) {
    if (dato) {
      let value = String(dato.id);
      let name = String(dato.codigoServicio);
      let usuarioServicioId = dato;
      let altSel = { usuarioServicioId, value, name };
      return altSel;
    } else {
      return "";
    }
  }

  if (valor) {
    const m = valor;
    let value = String(m.id);
    let name = m.nombre;
    selectedOption = { value, name };
    const opcion = createOption(m);

    if (options.find((o) => o.value === opcion.value)) {
      selectedOption = opcion;
    } else {
      options.push(opcion);
    }
  }

  return (
    <div className="form-group">
      <label forname="anio">Servicio</label>
      <SelectSearch
        options={options}
        name="nombre"
        value={selectedOption ? selectedOption.value : ""}
        onChange={(e) => handleChange(e, options)}
        placeholder="Seleccione un servicio"
      ></SelectSearch>
    </div>
  );
}
