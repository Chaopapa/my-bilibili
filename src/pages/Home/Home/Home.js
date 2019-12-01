import React, { Component } from "react";
import HomeHeader from "./HomeHeader";
import HomePage from "./HomePage";

import "./style.scss";


 
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectIndex: 2
    };
  }
  changeIndex(id) {
    this.setState({
      selectIndex: id
    });
  }
  render() {
    return (
      <React.Fragment>
        <HomeHeader
          changeIndex={this.changeIndex.bind(this)}
          selectIndex={this.state.selectIndex}
        />
       <HomePage  selectIndex={this.state.selectIndex}/>
       
      </React.Fragment>
    );
  }
}


