import getCamposServicio from "./getCamposServicio";

export const getCodigoServicio = (codigo, tipoServicio) => {
  const servicio = getCamposServicio(codigo, tipoServicio);
  var cod;
  if (tipoServicio.codigo === "A") {
    cod = "A" + servicio.codigo1 + servicio.codigo2.padStart(4, "0");
  } else if (tipoServicio.codigo === "B") {
    cod =
      "B" +
      servicio.codigo1.padStart(2, "0") +
      servicio.codigo2.padStart(6, "0");
  } else if (tipoServicio.codigo === "C") {
    cod = "C" + servicio.codigo1.padStart(9, "0");
  }
  return cod;
};

export default getCodigoServicio;