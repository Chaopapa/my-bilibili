import React, { Component } from 'react'
import flvjs from "flv.js";
import "./style.scss";
import VideoControl from "./Video-Control";


export default class MyVideo extends Component {
    constructor(props){
        super(props);
        this.state={
            videoTime:0,
            currentTime:0
        };
    }
    render() {
        return (
            <div className="my-video" ref={(el) => this.videoBox = el}>
                <video width="100%" height="100%"  muted ref={(el) => this.video = el}></video>
                <div className="header-opa">
                    <span onClick={
                        () => {
                            this.props.history.goBack();
                        }
                    } className="iconfont icon-fanhui back"></span>
                    <span className="iconfont icon-gengduo1 more"></span>
                    <span className="iconfont icon-erji sound"></span>
                </div>
                <VideoControl playAndPauseAction={this.playAndPauseAction.bind(this)} videoTime={this.state.videoTime} currentTime={this.state.currentTime} changeVideoTime={this.changeVideoTime.bind(this)} />             
            </div>
        )
    };
    componentDidMount() {
        this.initVideo();
        this.video.addEventListener('canplay', this.canPlayHandle);
        this.video.addEventListener('timeupdate',this.timeChangeHandle);
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
      

        //重新适配视频宽高
        let rate = this.video.videoHeight / this.video.videoWidth;
        console.log(rate);

        let boxHeight = this.videoBox.clientWidth * 2 * rate;
        this.props.changeNavTop(boxHeight);
        this.videoBox.style.height = boxHeight / 75 + 'rem';

        //获取视频时间
        console.log(this.video.duration*1000);
        this.setState({
            videoTime :this.video.duration*1000
        });
        
    }

    timeChangeHandle = ()=>{
        this.setState({
            currentTime:this.video.currentTime*1000
        })
    }

    changeVideoTime(rate){
        console.log(this.video.currentTime);
        this.video.currentTime = rate*this.state.videoTime/1000;
    }

    playAndPauseAction(){
        if(this.video.paused){
            this.video.play();
        }else{
            this.video.pause();
        }
    }
}
