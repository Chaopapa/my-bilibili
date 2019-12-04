import React, { Component } from 'react'
import flvjs from "flv.js";
import "./style.scss";



export default class MyVideo extends Component {
    render() {
        return (
            <div className="my-video" ref={(el) => this.videoBox = el}>
                <video width="100%" height="100%" controls muted ref={(el) => this.video = el}></video>
                <div className="header-opa">

                </div>
            </div>
        )
    };
    componentDidMount() {
        this.initVideo();
        this.video.addEventListener('canplay', this.canPlayHandle);
    }
    componentWillUnmount() {
        this.video.removeEventListener('canplay', this.canPlayHandle);
    }

    initVideo() {

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


    canPlayHandle = () => {

        console.log('视频能够播放了');
        console.log(this.video.videoHeight);
        console.log(this.video.videoWidth);
        let rate = this.video.videoHeight/this.video.videoWidth;
        console.log(rate);
      
        let  boxHeight = this.videoBox.clientWidth*2*rate;
        this.props.changeNavTop(boxHeight);
        this.videoBox.style.height = boxHeight/75 +'rem';
    }
}
