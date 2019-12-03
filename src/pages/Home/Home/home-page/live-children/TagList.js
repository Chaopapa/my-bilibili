import React from 'react';
import "./style.scss";

export default (props) => {
    return (
        <div className="tag-list">
            {props.moduleList&&props.moduleList.map((item,index) => {
                return <div className="tag-list-item" key={index}>
                        <img src={item.pic} alt=""/>
                        <span>{item.title}</span>
                </div>
            })}
        </div>
    )
}
