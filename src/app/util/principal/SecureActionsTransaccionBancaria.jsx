import React from "react";
import { Button, ButtonGroup } from "reactstrap";

export default function SecureActionsTransaccionBancaria(props) {
  const data = props.data;
  // const data_id = props.data_id
  const go = props.actions;

  const acceso = props.acceso;

  const ms = props.ms;

  const sinSeguridad = props.sinSeguridad;

  const datosPermisos = localStorage.getItem("grupos-permisos");

  //Permisos en registros de la tabla transacciones

  var hayUpdate = datosPermisos.includes(`/${ms}-${acceso}-Conciliado`);
  var hayAsociar = datosPermisos.includes(`/${ms}-${acceso}-Pendiente`);
  var hayPagar = datosPermisos.includes(`/${ms}-${acceso}-Cerrar`);
  var hayCargar = datosPermisos.includes(`/${ms}-${acceso}-CargarArchivo`);
  var hayEnviar = datosPermisos.includes(`/${ms}-${acceso}-Procesar`);
  if (sinSeguridad) {
    hayUpdate = true;
    hayAsociar = true;
    hayPagar = true;
    hayCargar = true;
    hayEnviar = true;
  }

  const button = (icon, fun) => (
    <Button className="group-button" size="md" id={icon} onClick={fun}>
      <i className={"fa " + icon} />
    </Button>
  );

  return props.transaccion ? (
    data.estadoTransaccion ? (
      data.estadoTransaccion.nombre === "Pendiente" ? (
        <ButtonGroup>
          {(hayAsociar && (
            <Button
              className="group-button"
              size="md"
              id={"asociar"}
              onClick={() => go.asociar(data.id)}
            >
              &nbsp; Asociar
            </Button>
          )) ||
            ""}
        </ButtonGroup>
      ) : data.estadoTransaccion.nombre === "Conciliado" ? (
        <ButtonGroup>
          {hayUpdate && button("fa-pencil", () => go.update(data.id))}
          {hayPagar && (
            <Button
              className="group-button"
              size="md"
              id={"cerrar"}
              onClick={() => go.pagar(data)}
            >
              &nbsp; Pagar
            </Button>
          )}
        </ButtonGroup>
      ) : (
        " "
      )
    ) : (
      " "
    )
  ) : props.archivo ? (
    <>
      {hayCargar && (
        <>
          <Button onClick={() => props.fileInput.click()} color={"primary"}>
            {data.etiquetaAdjuntar ? data.etiquetaAdjuntar : "Adjuntar Archivo"}
          </Button>

          <Button
            className="ml-2"
            onClick={go}
            color={props.color ? "primary" : "secondary"}
          >
            {data.etiquetaCargar ? data.etiquetaCargar : "Enviar"}
          </Button>
        </>
      )}
    </>
  ) : (
    <>
    {hayEnviar && (
    <Button onClick={go} color="primary">
      Enviar a Transferencias
    </Button>
    )}
    </>
  );
}
