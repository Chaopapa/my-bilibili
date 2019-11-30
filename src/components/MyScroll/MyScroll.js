import React, { Component } from "react";
import "./style.scss";


export default class MyScroll extends Component {
  render() {
    return <div className="scroll-wrap">{this.props.children}</div>;
  }

  
}
