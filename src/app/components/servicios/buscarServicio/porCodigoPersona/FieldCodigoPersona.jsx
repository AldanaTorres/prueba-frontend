import React, { useState } from "react";
export default function FieldCodigoPersona({ nombre, handleCodigoPersona }) {
  const [error1, setError] = useState(null);

  function valida(e) {
    let codigo = e.target.value;  
  
    if(/^\d+$/.test(codigo)){
      handleCodigoPersona(codigo)
      setError(null);
    } else if(codigo.length>=1){
      setError("Sólo debe contener números")
      handleCodigoPersona(null)
    } else {
      setError(null)
    }
    
  }
  return (
    <div className="form-group">
      <label forname={nombre}>Código</label>
      <input
        onChange={valida}
        type={"text"}
        className="form-control position-relative"
        id={nombre}
      />
      <div className="text-danger" style={{ marginBottom: "20px" }}>
        {error1}
      </div>
    </div>
  );
}
