import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";

const tabList = [
  { id: 0, title: "首页", icon: "icon-home", to: "/home" },
  { id: 1, title: "频道", icon: "icon-channel", to: "/channel" },
  { id: 2, title: "动态", icon: "icon-event", to: "/event" },
  { id: 3, title: "会员购", icon: "icon-buy", to: "/vip" },
  { id: 4, title: "我的", icon: "icon-mine", to: "/mine" }
];

export default () => {
  return (
    <nav className="tab">
      {tabList.map(item => {
        return <NavLink to={item.to} key={item.id}>
            <span className={'iconfont '+item.icon}></span>
            <p>
                {item.title}
            </p>
            </NavLink>;
      })}
    </nav>
  );
};
