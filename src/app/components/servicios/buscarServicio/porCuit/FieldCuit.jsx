import React, { useState } from "react";
import { validarCuit } from "../../../../util/validarCuit";
import NumberFormat from 'react-number-format';

export default function FieldCuit({ nombre, handleCuit }) {
  const [error1, setError] = useState(null);

  function valida(e) {
  let cuit = e.value;
    if (cuit.length > 10) {
      if (validarCuit(cuit)) {
        setError(null);
        handleCuit(cuit);
      } else {
        setError("Cuit inválido");
        handleCuit(null);
      }
    } else {
      setError(null);
    }
  }
  return (
    <div className="form-group ">
        <label forname={nombre}> CUIT</label>
      <NumberFormat
        className="form-control position-relative"
        format="##-########-#"
        allowNegative={false}
        isNumericString={true}
        onValueChange={valida}
      />
      <div className="text-danger" style={{ marginBottom: "20px" }}>
        {error1}
      </div>
    </div>
  );
}
