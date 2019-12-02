import React, { PureComponent } from "react";
import MyVideo from "./My-Video";
import VideoTab from "./Video-Tab";
import About from "./video-main/About";
import Commend from "./video-main/Commend";


export default class VideoDetail extends PureComponent {
  constructor() {
    super();
    this.state = {
      select: 0
    };
  }
  render() {
    let Com = this.state.com;
    return (
      <div className="subPage">
        <MyVideo></MyVideo>
        <VideoTab
          changeAction={this.handleChange.bind(this)}
          select={this.state.select}
        ></VideoTab>
        <Com {...this.props}></Com>
      </div>
    );
  }
  handleChange(id) {
    this.setState({
      select: id
    });
  }

  static getDerivedStateFromProps(props, state) {
    console.log(state);
    if (state.select === 0) {
      return {
        com: About
      };
    } else {
      return {
        com: Commend
      };
    }
  }
}
