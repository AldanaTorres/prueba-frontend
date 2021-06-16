import React, { Component } from 'react';

class ComboAnio extends Component {

    state = {
        anioSeleccionado:new Date().getFullYear(),
    }


    cargarItems() {
        let anios = [];
        for (let i = 2013; i <= new Date().getFullYear(); i++) {
            anios.push(i);
        }
        return anios.map(anio => {
            return(
                <option key={anio}
                    value={anio} >
                    {anio}
                </option>
            )
        })
    }

    onChange = event => {
        this.setState({anioSeleccionado:event.target.value});
        this.props.handleChangeAnio(event.target.value);
    }

    render() {
        const { anioSeleccionado } = this.state;
        const anioActual = new Date().getFullYear();
        return (
            <div className="w-25">
                <select id="inputState" 
                        className="form-control" 
                        onChange={this.onChange}
                        value={(anioSeleccionado)?anioSeleccionado:anioActual}
                        >
                    {this.cargarItems()}
                </select>
            </div>
        )
    }
}

export default ComboAnio;