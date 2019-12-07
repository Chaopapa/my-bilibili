import React from 'react';
import "./style.scss";
import {useHistory} from "react-router-dom"

export default (props) => {
    let showList = [];
    if (props.list) {
        showList = props.list.splice(0, props.count)
    }
    const history = useHistory();
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
                    return <div onClick={()=>{
                        history.push({pathname:`/home/live/detail/${item.roomid}`,state:item.roomid})
                        }} key={item.roomid} className="live-item">
                      <img src={item.cover} alt=""/>
                      <h4>{item.title}</h4>
                      <p>{item.area_v2_parent_name}</p>
                    </div>
                })}
            </div>
        </div>
    )
}
