import React from 'react';
import SelectSearch from "react-select-search";
import '../../../util/Select.css';

export default function LeidaSelect(props) {

    const {
        input: { value },
      } = props

    const selectedOption = value;

    function cargarItems() {
        const leida = [
            {value: "true", name: "Leída"},
            {value: "false", name: "No leída"},
        ]
          return leida
      }

    return (
        <div className="form-group">
          <label forname="anio">Leída</label>
          <SelectSearch
            options={cargarItems()}
            onChange={(value) => props.handleLeida(value)}
            value={selectedOption ? selectedOption : null}
            placeholder="Seleccionar"
          />
        </div>
      );
}