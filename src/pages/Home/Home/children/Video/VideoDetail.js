import React, { PureComponent } from "react";
import MyVideo from "./My-Video";
import VideoTab from "./Video-Tab";
import About from "./video-main/About";
import Comment from "./video-main/Comment";


export default class VideoDetail extends PureComponent {
  constructor() {
    super();
    this.state = {
      select: 0,
      navTop: 382,
    };
  }
  render() {
    let Com = this.state.com;
    return (
      <div className="subPage">
        <MyVideo changeNavTop={(val) => {
          this.setState({
            navTop:val
          })
        }}></MyVideo>
        <VideoTab
          changeAction={this.handleChange.bind(this)}
          select={this.state.select}
          navTop={this.state.navTop}
        ></VideoTab>
        <Com {...this.props} top={this.state.navTop + 80}></Com>
        {this.state.select == 1 && <div className="sendComment">
          <input type="text" />
          <a href="#">
            <span className="iconfont"  ></span>
          </a>
        </div>}
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
        com: Comment
      };
    }
  }
}
