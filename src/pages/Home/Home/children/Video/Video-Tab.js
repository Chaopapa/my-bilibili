import React, { Component } from "react";

const tabList = [
  { id: 0, title: "简介" },
  { id: 1, title: "评论" }
];
export default class VideoTab extends Component {
  render() {
    return (
      <nav className="video-nav">
        <ul>
          {tabList.map(item => {
            return (
              <li
                key={item.id}
                className={this.props.select == item.id ? "active" : ""}
                onClick={
                    ()=>{
                        this.props.changeAction(item.id);
                    }
                }
              >
                {item.title}
              </li>
            );
          })}
        </ul>
        <div className="video-nav-ipt">
            <input type="text"/>
            <button>弹</button>
        </div>
      </nav>
    );
  }
}
