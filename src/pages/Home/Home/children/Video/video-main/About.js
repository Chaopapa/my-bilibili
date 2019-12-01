import React, { Component } from 'react'
import withScroll from "../../../../../../HOC/withScroll";
import "./style.scss";

class About extends Component {
    render() {
        return (
            <div className="video-about">
                <div className="video-info">
                    <h1>简介页</h1>
                </div>
            </div>
        )
    }
}

export default withScroll(About,'video-scroll',462/75,0);
