import React, { Component } from "react";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import { requestRecommendBanner, requestRecommendVideo } from "../reducer";

class Recommend extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="home" className="page">
        <div className="swiper-container home-banner">
          <div className="swiper-wrapper">
            {/* <div className="swiper-slide">slider1</div>
            <div className="swiper-slide">slider2</div>
            <div className="swiper-slide">slider3</div> */}
            {this.props.bannerList.map(item => {
              return (
                <div
                  referrer="no-referrer|origin|unsafe-url"
                  key={item.id}
                  className="swiper-slide"
                >
                  <img key={item.id} src={item.pic} alt={item.name} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="home-r-video">
          {this.props.videoList.map(item => {
            return (
           
                <Link key={item.aid} className="video-r-item" to={'/home/video/detail/'+item.aid}>
                  <div className="video-r-item-img">
                    <img src={item.pic} title={item.title}/>
                  </div>
                  <div className="video-r-item-text">
                    <h4>{item.title}</h4>
                    <p>{item.author}</p>
                  </div>
                </Link>
              
            );
          })}
        </div>
      </div>
    );
  }

  componentDidMount() {
    
    this.props.getRecommendVideo();
    
    this.scrollInit();
    this.SwiperInit();
  }
  async SwiperInit() {
    await this.props.getBannerData();
    console.log("初始化swiper");
    
    new Swiper(".home-banner", {
      // autoplay: true
    });
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
  bannerList: state.home.recommendBanner,
  videoList: state.home.videoListMap["1"]
});
const mapDispatchToProps = dispatch => ({
  async getBannerData() {
    let action = requestRecommendBanner();
    await dispatch(action);
  },

  async getRecommendVideo() {
    let action = requestRecommendVideo(0, 1);
    await dispatch(action);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Recommend);
