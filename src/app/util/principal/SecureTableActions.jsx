import React from "react";
import { Fragment } from "react";
import { Button } from "reactstrap";

export default function SecureTableActions(props) {
  const data = props.data;

  const go = props.actions;

  const acceso = props.acceso;

  const ms = props.ms;

  const busquedaProrrata = props.busquedaProrrata;

  const sinSeguridad = props.sinSeguridad;

  const datosPermisos = localStorage.getItem("grupos-permisos");

  
  //Permisos Genéricos de Acciones en registros de la tabla

  var hayUpdate = datosPermisos && datosPermisos.includes(`/${ms}-${acceso}-Update`);
  var hayDelete = datosPermisos && datosPermisos.includes(`/${ms}-${acceso}-Delete`);
  var hayHistorico = datosPermisos && datosPermisos.includes(`/${ms}-${acceso}-Historia`);

  if (busquedaProrrata) {
    hayUpdate = false;
    hayDelete = false;
    hayHistorico = false;
  }

  if (sinSeguridad) {
    hayUpdate = true;
    hayDelete = true;
    hayHistorico = false;
  }

  const button = (icon, fun) => (
    <Button className="group-button" size="md" id={icon} onClick={fun}>
      <i className={"fa " + icon} />
    </Button>
  );

  return (
    
      <Fragment>
        {hayUpdate && button("fa-pencil", () => go.update(data.id))}
        {hayDelete && button("fa-trash-o", () => go.delete(data))}
        {hayHistorico && go.history(data)}

        {button("fa-search", () => go.detail(data))}
        </Fragment>
    
  );
}
