import axios from "axios";
import { SET_ERROR } from "./errorReducer";

const apiUrl = "services/serviciosweb/api/archivo-ventanillas";
//Acciones

export const descargarArchivoVentanilla = (id, nombreArchivo) => async (dispatch) => {
    try {
        axios.get(apiUrl + "/descargar/" + id, {responseType: 'blob'})
                .then(response => {//Create a Blob from the PDF Stream
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";
                const file = new Blob(
                [response.data],
                {type: 'application/pdf'});
                const fileURL = URL.createObjectURL(file);
                a.href = fileURL;
                a.download = nombreArchivo;
                a.click();
                window.URL.revokeObjectURL(fileURL);
            });
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.response });
    }
};
