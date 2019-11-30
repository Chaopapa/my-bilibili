import React, { Component } from "react";
import Http from "../../../utils/Http";
import api from "../../../utils/api";
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
       <HomePage/>
      </React.Fragment>
    );
  }

 
  async getVideoList() {
    try {
      let result = await Http.get(api.RECOMMEND_VIDEO, {
        rid: 0,
        day: 1,
        jsonp: "jsonp"
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}


