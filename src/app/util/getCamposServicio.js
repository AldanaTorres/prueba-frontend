export const getCamposServicio = (codigo, tipoServicio) => {
  let nuevoCodigo = codigo;
  let serv = {
    tipoServicio: { ...tipoServicio },
  };
  if (tipoServicio.codigo === "A") {
    serv = {
      ...serv,
      codigo1: nuevoCodigo.substring(0, 4),
      codigo2: nuevoCodigo.substring(4, nuevoCodigo.length),
    };
  } else if (tipoServicio.codigo === "B") {
    serv = {
      ...serv,
      codigo1: nuevoCodigo.substring(0, 2),
      codigo2: nuevoCodigo.substring(2, nuevoCodigo.length),
    };
  } else if (tipoServicio.codigo === "C") {
    serv = {
      ...serv,
      codigo1: nuevoCodigo,
      codigo2: null,
    };
  }
  return serv;
};

export default getCamposServicio;
