import React from "react";
import SelectSearch from "react-select-search";

export default function ComboAniooLimpio (props) {
    const {
        input: { value },
        disabled
      } = props

    const selectedOption = value;

    function handleChange(value) {
      props.input.onChange(value);
    }


    function cargarItems() {
      const anios = []
        let anioActual = new Date().getFullYear();
        for (let i = anioActual; i >= anioActual-10; i--) {
            anios.push({ value: i.toString(), name: i.toString()});
        };
        return anios
    }

    return (
        <div className="form-group">
          <label forname="anio">Año</label>
          <SelectSearch
            disabled={disabled? disabled : false}
            options={cargarItems()}
            onChange={(value) => handleChange(value)}
            value={selectedOption ? selectedOption : ""}
            search
            placeholder="Seleccionar año"
          />
        </div>
      );
}