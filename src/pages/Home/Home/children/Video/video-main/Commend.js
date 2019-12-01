import React, { Component } from 'react'
import withScroll from "../../../../../../HOC/withScroll";

class Commend extends Component {
    render() {
        return (
            <div className="video-commend">
                <h1>评论页</h1>
            </div>
        )
    }

}

export default withScroll(Commend,'video-scroll',462/75,0);

