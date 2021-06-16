import React, { Component } from 'react';
import NumberFormat from 'react-number-format';


class ServicioField extends Component {
    render() {
        const superficial = (<div>
            <NumberFormat
                className='form-control'
                format="####-####"
                placeholder={'   CC   -   PP   '}
                allowNegative={false}
                isNumericString={true}
                onValueChange={this.props.handleChangeCodigo}
                disabled={this.props.actualiza}
                defaultValue={this.props.servicio ? 
                    (this.props.servicio.codigo.substring(1, this.props.servicio.codigo.length))
                    :
                    null}
            />
        </div>);
        const subterraneo = (
            <div>
                <NumberFormat
                    className='form-control'
                    format="##-######"
                    placeholder={' Dpto - Pozo '}
                    allowNegative={false}
                    isNumericString={true}
                    onValueChange={this.props.handleChangeCodigo}
                    disabled={this.props.actualiza}
                    defaultValue={this.props.servicio ? 
                        (this.props.servicio.codigo.substring(1, this.props.servicio.codigo.length))
                        :
                        null}
                />
            </div>
        )
        const contaminacion = (
            <div>
                <NumberFormat
                    className='form-control'
                    format="#########"
                    placeholder={' Cod Contaminación '}
                    allowNegative={false}
                    isNumericString={true}
                    onValueChange={this.props.handleChangeCodigo}
                    disabled={this.props.actualiza}
                    defaultValue={this.props.servicio ? 
                        (this.props.servicio.codigo.substring(1, this.props.servicio.codigo.length))
                        :
                        null}
                />
            </div>)
        return (
            <>
                {this.props.tipoServicio && this.props.tipoServicio.codigo === 'A' ?
                    superficial : this.props.tipoServicio && this.props.tipoServicio.codigo === 'B' ?
                        subterraneo : this.props.tipoServicio && this.props.tipoServicio.codigo === 'C' ?
                            contaminacion : ''
                }
            </>
        )
    }
}

export default ServicioField
