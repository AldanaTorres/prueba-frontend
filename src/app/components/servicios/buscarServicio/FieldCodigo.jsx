export default function FieldCodigo ({
    tipoServicio,
    nombre,
    name,
    label,
    type,
    touched,
    error,
    handleCodigo
  }){ 

    function retrievePlaceHolder  (tipo, name) {
        if (tipo && tipo.codigo) {
          if (tipo.codigo === "A") {
            if (name === "codigo1") {
              return "Código de Cauce";
            } else if (name === "codigo2") {
              return "Padrón Parcial";
            }
          } else if (tipo.codigo === "B") {
            if (name === "codigo1") {
              return "Departamento";
            } else if (name === "codigo2") {
              return "Nro Pozo";
            }
          } else if (tipo.codigo === "C") {
            if (name === "codigo1") {
              return "Código Contaminación";
            }
          }
        }
        return "";
      };
      
      
    
    return(
      <div className="form-group">
        
        <label forname={nombre}> {retrievePlaceHolder(tipoServicio, name)}</label>
        <input
          
          onChange={handleCodigo}

          type={
            tipoServicio &&
              (tipoServicio.codigo === "A" || tipoServicio.codigo === "B")
              ? "text"
              : tipoServicio &&
                tipoServicio.codigo === "C" &&
                name === "codigo1"
                ? "text"
                : tipoServicio &&
                  tipoServicio.codigo === "C" &&
                  name === "codigo2"
                  ? "hidden"
                  : ""
          }
          className="form-control position-relative"
          id={nombre}
         // placeholder={retrievePlaceHolder(tipoServicio, name)}
          max={
            tipoServicio &&
              tipoServicio.codigo === "A" &&
              name === "codigo1"
              ? "[1000-9999]"
              : tipoServicio &&
                (tipoServicio.codigo === "A" || tipoServicio.codigo === "B") &&
                name === "codigo2"
                ? "9999"
                : tipoServicio &&
                  tipoServicio.codigo === "B" &&
                  name === "codigo1"
                  ? "99"
                  : tipoServicio &&
                    tipoServicio.codigo === "C" &&
                    name === "codigo1"
                    ? "9999999999"
                    : ""
          }
          minLength={
            tipoServicio &&
              tipoServicio.codigo === "A" &&
              name === "codigo1"
              ? "4"
              : tipoServicio &&
                (tipoServicio.codigo === "A" || tipoServicio.codigo === "B") &&
                name === "codigo2"
                ? "1"
                : tipoServicio &&
                  tipoServicio.codigo === "B" &&
                  name === "codigo1"
                  ? "1"
                  : tipoServicio &&
                    tipoServicio.codigo === "C" &&
                    name === "codigo1"
                    ? "1"
                    : ""
          }
          maxLength={
            tipoServicio &&
              tipoServicio.codigo === "A" &&
              name === "codigo1"
              ? "4"
              : tipoServicio &&
                (tipoServicio.codigo === "A" || tipoServicio.codigo === "B") &&
                name === "codigo2"
                ? "6"
                : tipoServicio &&
                  tipoServicio.codigo === "B" &&
                  name === "codigo1"
                  ? "2"
                  : tipoServicio &&
                    tipoServicio.codigo === "C" &&
                    name === "codigo1"
                    ? "9"
                    : ""
          }
        />
        <div className="text-danger" style={{ marginBottom: "20px" }}>
          {touched && error}
        </div>
      </div>
    )
}