import React, { Component } from "react";
import "./style.scss";

export default class MyComment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let childComment = this.props.item.replies.map(item => {
      return (
        <div key={item.rpid}>
          <p>
            <span>{item.member.uname}</span>
            :&nbsp;{item.content.message}
          </p>
        </div>
      );
    });
    console.log(childComment);

    return (
      <div className="my-comment">
        <div className="avatar">
          <img src={this.props.item.member.avatar} alt="" />
        </div>
        <div className="my-comment-main">
          <div className="my-comment-main-name">
            <h3>{this.props.item.member.uname}</h3>
            <span>LV{this.props.item.member.level_info.current_level}</span>
            <a href="#">+关注</a>
          </div>
          <p className="time">11-7</p>
          <div className="my-comment-main-content">
            {this.props.item.content.message}
          </div>
          <div className="comment-opa">
            <p>{this.props.item.like}</p>
            <p>265</p>
            <p>{this.props.item.rcount}</p>
          </div>
          <div className="my-comment-main-comment">{childComment}</div>
        </div>
      </div>
    );
  }
}
