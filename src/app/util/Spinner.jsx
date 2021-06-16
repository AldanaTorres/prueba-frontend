import React, { Component } from "react";
import "./Style.css";

class Spinner extends Component {
  render() {
    return (
      <div style={{ textAlign: "center", margin: "30px"}}>
        <div className="spinner-border"></div>
      </div>
    );
  }
}

export default Spinner;
