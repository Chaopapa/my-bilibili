import React, { Component } from 'react'
import flvjs from "flv.js";
import "./style.scss";



export default class MyVideo extends Component {
    render() {
        return (
            <div className="my-video">
                <video width="100%" height="100%" controls muted ref={(el)=>this.video=el}></video>
            </div>
        )
    };
    componentDidMount(){
       this.initVideo();
    }

    initVideo(){
       
        if (flvjs.isSupported()) {
            let flvPlayer = flvjs.createPlayer({
                type: 'mp4',
                url: "http://47.100.139.229:8080/projectResource/video/liv.mp4"
            });
            flvPlayer.attachMediaElement(this.video);
            flvPlayer.load();
            flvPlayer.play();
        }
    }
}
