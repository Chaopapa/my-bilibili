import React, { Component } from "react";
import Http from "../../../utils/Http";
import api from "../../../utils/api";

export default class Home extends Component {
  render() {
    return (
      <div className="page">
        <h1>主页</h1>
      </div>
    );
  }

  componentDidMount() {
    this.getVideoList();
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
