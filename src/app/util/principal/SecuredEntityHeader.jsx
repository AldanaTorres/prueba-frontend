import React from "react";
import { Link } from "react-router-dom";
import { useKeycloak } from '@react-keycloak/web';
import "../../util/modales/modalito.css";


export default function SecureEntityHeader(props) {

    const nombreCabecera = props.nombreCabecera;

    const nombreBoton = props.nombreBoton;

    const ms = props.ms;

    const sinSeguridad = props.sinSeguridad;

    const { keycloak } = useKeycloak()

    var hayPermiso = false;

    if(keycloak && keycloak.tokenParsed){
        const datosPermisos = keycloak.tokenParsed.groups;

        hayPermiso = datosPermisos && datosPermisos.includes(`/${ms}-UsuarioGeneral`);
    }

    if (sinSeguridad) {
        hayPermiso = true;
    }

    return (
        <>
            <div>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-1 pb-1 pl-3 pr-2 mb-1">
                    <h1 className="h2">{nombreCabecera ? nombreCabecera : ""}</h1>
                    {hayPermiso &&
                        <div className="btn-toolbar mb-2 mb-md-0">
                            <div className="btn-group mr-2">
                                <Link
                                    to={props.link}
                                    type="button"
                                    className="agregarServicio btn btn-outline-primary btn-lg"
                                > 
                                    <i className="fa fa-plus-circle fa-1x" fa-3xaria-hidden="true"></i>
                                    {nombreBoton  ? nombreBoton : "Nuevo"}
                                </Link>

                                
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}