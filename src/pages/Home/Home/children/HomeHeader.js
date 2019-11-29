import React, { Component } from "react";
import "./style.scss";

const navList = [
  { id: 1, title: "直播" },
  { id: 2, title: "推荐" },
  { id: 3, title: "热门" },
  { id: 4, title: "追番" },
  { id: 5, title: "影视" }
];

export default class HomeHeader extends Component {
  render() {
    return (
      <div className="home-header">
        <div className="home-header-search">
          <div className="home-header-search-user"></div>
          <div className="home-header-search-ipt">
            <input type="text" />
          </div>
          <div className="home-header-search-opa"></div>
        </div>
        <nav className="home-header-nav">
          {navList.map(item => {
            return <li key={item.id}>{item.title}</li>;
          })}
        </nav>
      </div>
    );
  }
}
