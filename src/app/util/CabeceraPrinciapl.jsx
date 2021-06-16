import React, { Component } from 'react';
import {CardHeader} from "reactstrap";
import { Link } from 'react-router-dom';

class CabeceraPrinciapl extends Component {
    render() {
        const {
            tituloCabecera,
            textoButon,
            link
          } = this.props;
        return(
            <CardHeader>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 pl-3 pr-2 mb-3">
                <h2>{tituloCabecera}</h2>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group mr-2">
                        <Link
                        to = {link}
                        type="button"
                        className="btn btn-sm btn-outline-primary">
                        {textoButon}
                        </Link>
                    </div>
                </div>
            </div>
        </CardHeader>
        );
    }
}

export default (CabeceraPrinciapl);