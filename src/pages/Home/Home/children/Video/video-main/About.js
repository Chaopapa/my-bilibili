import React, { Component } from "react";
import withScroll from "../../../../../../HOC/withScroll";
import "./style.scss";
import { connect } from "react-redux";
import { requestLikeVideo } from "../../../reducer";

class About extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <div className="video-about">
        <div className="video-info">
          <div className="video-info-text">
            <div className="video-info-text-user">
              <div className="user-img"></div>
              <div className="user-name">
                <h3>花花杂货店</h3>
                <p>1.6w粉丝</p>
              </div>
              <a href="#">+关注</a>
            </div>
            <div className="video-info-text-video">
              <h2>皎月重做，全皮肤特效对比，看看哪个更适合你</h2>
              <p>
                <span>播放:3.9万</span>
                <span>评论:3.9万</span>
                <span>9小时前</span>
                <span>AV77224508</span>
              </p>
            </div>
          </div>
          <div className="video-opa">
            <p>
              <span className="iconfont icon-zan"></span>
              <span>679</span>
            </p>
            <p>
              <span className="iconfont icon-cai"></span>
              <span> 不喜欢</span>
            </p>
            <p>
              <span className="iconfont icon-coin"></span>
              <span> 103</span>
            </p>
            <p>
              <span className="iconfont icon-coin"></span>
              <span>64</span>
            </p>
            <p>
              <span className="iconfont icon-coin"></span>
              <span> 181</span>
            </p>
          </div>
        </div>
        <div className="video-like">
          <div className="video-like-tag">
            <span>进击的巨人</span>
            <span>动漫</span>
            <span>热血</span>
          </div>
          <div className="video-like-list">
            {this.props.likeVideo.map(item => {
              return (
                <div className="video-like-list-item" key={item.aid}>
                  <div className="video-like-list-item-img">
                    <img src={item.pic} alt=""/>
                  </div>
                  <div className="video-like-list-item-text">
                    <h2>
                      {item.title}
                    </h2>
                    <p className="author">
                      <span className="iconfont"></span>
                      {item.owner.name}
                    </p>
                    <p className="vi-info">
                      <span className="iconfont">14.3</span>
                      <span className="iconfont">122</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    // this.props.initAction();
    this.getLikeVideo();
  }
  async getLikeVideo() {
    await this.props.getLikeVideo();
    //更新滚动视图
    console.log('更新滚动视图');
    console.log(this.props.initAction);
    this.props.initAction();
  }
}

const mapStateToProps = state => ({
  videoList: state.home.videoListMap["1"],
  likeVideo: state.home.likeVideo
});
const mapDispatchToProps = dispatch => ({
  async getLikeVideo() {
    let action = requestLikeVideo(77365043);
    await dispatch(action);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withScroll(About, "video-scroll", 462 / 75, 0));
