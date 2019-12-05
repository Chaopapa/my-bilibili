import React, { Component } from 'react';
import "../style.scss";
import { requestRecommendVideo } from "../reducer";
import { connect } from "react-redux";
import {Link} from "react-router-dom";

class HotRank extends Component {
    render() {
        return (
            <div className="home-hot">

                <div className="home-h-nav">
                    <a href="#">
                        <img src="/static/image/paihang.jpg" alt="" />
                        <span>排行榜</span>
                    </a>
                    <a href="#">
                        <img src="/static/image/bikang.jpg" alt="" />
                        <span>每周必看</span>
                    </a>
                    <a href="#">
                        <img src="/static/image/bishua.jpg" alt="" />
                        <span>入站必刷</span>
                    </a>
                </div>
             
                <div className="hot-video-list">
                    {
                        this.props.videoList.map(item=>{
                            return (
                            <Link key={item.aid}  to={'/home/video/detail/'+item.aid}>
                                <div className="hot-video-item">
                                    <div className="hot-video-item-img">
                                        <img src={item.pic} alt=""/>
                                    </div>
                                    <div className="hot-video-item-text">
                                        <div className="htxt-content">{item.title}</div>
                                        <span>百万播放</span>
                                        <p className="author">{item.author}</p>
                                        <p className="info">105.7万观看&nbsp;17小时前</p>
                                    </div>
                                </div>
                            </Link>)
                        })
                    }
                </div>
            </div>
        )
    }
    componentDidMount(){
        this.scrollInit();
    }
    async scrollInit(){
    //请求数据
    await this.props.getRecommendVideo();
    console.log(this.props);
    //通知父级更新滚动视图
    this.props.initAction();
  }
}

const mapStateToProps = state => ({
    videoList: state.home.videoListMap["1"]
});
const mapDispatchToProps = dispatch => ({


    async getRecommendVideo() {
        let action = requestRecommendVideo(0, 1);
        await dispatch(action);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(HotRank);

