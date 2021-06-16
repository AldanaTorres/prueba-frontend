export function validarCuit(cuit) {

   
    if (typeof (cuit) == 'undefined')
        return true;
    cuit = cuit.toString().replace(/[-_]/g, "");
    if (cuit === '')
        return true; //No estamos validando si el campo esta vacio, eso queda para el "required"
    if (cuit.length !== 11)
        return false;
  else {
       var mult = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
      var total = 0;
     for (var i = 0; i < mult.length; i++) {
           total += parseInt(cuit[i]) * mult[i];
       }
      var mod = total % 11;
       var digito = mod === 0 ? 0 : mod === 1 ? 9 : 11 - mod;
 }
   return digito === parseInt(cuit[10]);
}
