import React, { useEffect, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTipoServicio, buscarTipoServicio } from '../../../reducers/tipoServicioReducer';
import SelectSearch from 'react-select-search';

import '../../../util/Select.css';

export default function BuscarTipoServicioSelect(props) {

  const dispatch = useDispatch()

  const {
    disabled,
    input,
    handleTipoServicio
  } = props
  const valor = input ? input.value : null;


  function handleChange(e, options) {
    if (e) {
      const tipoServicio = options.filter(o => o.value === e);
      if (tipoServicio && tipoServicio[0]) {
        if (props.input) {
          props.input.onChange(tipoServicio[0].tipoServicio);
        } else {
          props.handleTipoServicio && props.handleTipoServicio(tipoServicio[0].tipoServicio)
        }
      }
    }
  }
  const fetchData = useCallback(() => {
    dispatch(buscarTipoServicio(props.tipoServicio))
    .then(dispatch(setTipoServicio(createOption(props.tipoServicio))))
    .then(handleTipoServicio({codigo:"A"}))
    .catch(err => {
    })
  }, [props.tipoServicio, dispatch, handleTipoServicio]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function createOption(dato) {
    if (dato) {
      let value = String(dato.id);
      let name = dato.codigo + " - " + dato.nombre;
      let tipoServicio = dato;
      let altSel = { tipoServicio, value, name };
      return altSel;
    } else {
      return "";
    }

  }

  const lstTipoServicio = useSelector(state => state.tipoServicioReducer.listaTipoServicio);

  let selectedOption = useSelector(state => state.tipoServicioReducer.tipoServicioSelected);
  const options = [];

  if (valor) selectedOption = createOption(valor);

  



  lstTipoServicio.map((m, k) => {
   
    if (props.soloPrincipales) {
      
      if (m.codigo === "A" || m.codigo === "B" || m.codigo === "C") {
        options.push(createOption(m));
      }

     
    } else {
      options.push(createOption(m));
    }
    return "";
  });

  /*if (!selectedOption && inicializar) {
    const tipoServicio = lstTipoServicio.filter(o => o.id === tipoServicioCarga);
    props.input.onChange(tipoServicio[0])
  } if (inicializar && !tipoServicioCarga && !selectedOption) {
    const tipoServicio = lstTipoServicio.filter(o => o.id === 1);
    props.input.onChange(tipoServicio[0])
  }*/

  return (
    <div className='form-group' xs="12">
      <label forname="tipoServicio">Tipo de Servicio</label>
      <SelectSearch
        disabled={disabled ? disabled : false}
        options={options}
        name="tipoServicio"
        value={selectedOption ? selectedOption.value : ""}
        
        onChange={e => handleChange(e, options)}>
      </SelectSearch>
    </div>

  )

}
