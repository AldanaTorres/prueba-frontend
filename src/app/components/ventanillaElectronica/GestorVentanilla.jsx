import React, { useState, useEffect } from "react";
import { SubmissionError } from "redux-form";
import { useDispatch, useSelector } from "react-redux";
import DetalleVentanilla from "./componentesVentanillaElectronica/DetalleVentanilla";
import { buscarVentanillaPorId } from "../../reducers/ventanillaElectronicaReducer";

export default function GestorVentanilla(props) {
  const [detalle, setdetalle] = useState(false);
  const dispatch = useDispatch();

  const ventanillaSelected = useSelector(
    (state) => state.ventanillaElectronicaReducer.ventanillaSelected
  );

  useEffect(() => {
    const { id } = props.match.params;
    if (id) {
      dispatch(buscarVentanillaPorId(id))
        .then(() => {
          setdetalle(true);
        })
        .catch((err) => {
          throw new SubmissionError(props.errores);
        });
    }
  }, [props.match.params, props.errores, dispatch]);

  return (
    <div>
      {detalle ? (
        <DetalleVentanilla initialvalues={ventanillaSelected} />
      ) : (
        ""
      )}
    </div>
  );
}
