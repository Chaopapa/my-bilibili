import React, { Component } from "react";

const tabList = [
  { id: 0, title: "简介" },
  { id: 1, title: "评论" }
];
export default class VideoTab extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  }
  render() {
    return (
      <nav className="video-nav" style={{top:this.props.navTop/75+'rem'}} ref={(el)=>this.nav=el}>
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
