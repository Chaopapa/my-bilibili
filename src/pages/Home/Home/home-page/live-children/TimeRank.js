import React, { Component } from 'react'

export default (props) => {
    let showRank = [];
    if (props.timeRank.module_info) {
        showRank = props.timeRank.list;
        let temp = showRank[0];
        showRank[0] = showRank[1];
        showRank[1] = temp;
    }


    return (
        <div className="time-rank">
            <div className="time-rank-title">
                <h4>小时榜</h4>
                {props.timeRank.module_info && <span>{props.timeRank.module_info.sub_title}</span>}
                <p>
                    <span>查看更多</span>
                    <span className="iconfont"></span>
                </p>

            </div>
            <div className="time-rank-main">
                {showRank.map(item => {
                    return <div key={item.id} className="rank">
                        <img src={item.cover} alt="" />
                        <h3>{item.uname}</h3>
                        <span>{item.area_v2_parent_name}</span>
                    </div>
                })}
            </div>
        </div>
    )

}
