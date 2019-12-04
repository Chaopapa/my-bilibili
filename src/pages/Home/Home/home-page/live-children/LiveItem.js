import React from 'react';
import "./style.scss";

export default (props) => {
    let showList = [];
    if (props.list) {
        showList = props.list.splice(0, props.count)
    }
  
    return (
        <div className="live-itemList">
            <div className="list-title">
                <h3>{props.title}</h3>
                <p>
                    <span>{props.rightText}</span>
                    <span  className="iconfont"></span>
                </p>
            </div>
            <div className="list-main">
                {showList.map(item => {
                    return <div key={item.roomid} className="live-item">
                      <img src={item.cover} alt=""/>
                      <h4>{item.title}</h4>
                      <p>{item.area_v2_parent_name}</p>
                    </div>
                })}
            </div>
        </div>
    )
}
