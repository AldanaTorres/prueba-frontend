// Search Object with "Active" props to Object
export const customSecurity = (nombre, permiso, ms) => {
    

    const datosPermisos = localStorage.getItem("grupos-permisos");

    const valor = "/"+ms+"-"+nombre+"-"+permiso;

    console.log(valor)

    const hayPermiso = datosPermisos.includes("/Presupuesto-"+nombre+"-"+permiso);

    const hayPermisoConMS = datosPermisos.includes("/"+ms+"-"+nombre+"-"+permiso);

    console.log(hayPermiso)

    console.log(hayPermisoConMS)

    if(hayPermiso){
      return hayPermiso
    }

    if(hayPermisoConMS){
      return hayPermisoConMS
    }

    return false;

   
    
    
  };