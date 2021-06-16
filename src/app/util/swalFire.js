import Swal from "sweetalert2";

export const swalFire = ( mensaje , icon, confirmButtonText, showCancelButton) => {

    return Swal.fire({
        text: mensaje,
        icon: icon,
        showCancelButton: showCancelButton,
        confirmButtonColor: showCancelButton? "#d33" : "#3085d6",
        cancelButtonColor: "#3085d6",
        confirmButtonText: confirmButtonText,
        cancelButtonText: "Cancelar",
    });
}