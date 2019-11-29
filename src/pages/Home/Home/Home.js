import React, { Component } from "react";
import Http from "../../../utils/Http";
import api from "../../../utils/api";
import HomeHeader from "./children/HomeHeader";
import MyScroll from "../../../components/MyScroll/MyScroll";
import "./style.scss";

export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <HomeHeader />
        <MyScroll>
          <div id="home" className="page"></div>
        </MyScroll>
      </React.Fragment>
    );
  }

  componentDidMount() {
    // this.getVideoList();
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
