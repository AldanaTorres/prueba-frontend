import React, { useState } from "react";
export default function FieldCuit({ nombre, handleNC }) {
  const [error1, setError] = useState(null);

  function valida(e) {
    let nc = e.target.value;
    if (/^\d+$/.test(nc)) {
      if (nc.length > 15) {
        handleNC(nc);
        setError(null);
      } else {
        setError("Debe contener 16 dígitos");
        handleNC(null);
      }
    } else if(nc.length>=1){
      setError("Sólo debe contener números");
      handleNC(null);
    }else{
      setError(null);
    }
  }
  return (
    <div className="form-group">
      <label forname={nombre}> Nomenclatura</label>
      <input
        onChange={valida}
        type={"text"}
        className="form-control position-relative"
        id={nombre}
        minLength={16}
        maxLength={16}
      />
      <div className="text-danger" style={{ marginBottom: "20px" }}>
        {error1}
      </div>
    </div>
  );
}
