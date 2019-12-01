import React, { Component } from "react";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import { connect } from "react-redux";
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
           
                <div key={item.aid} className="video-r-item">
                  <div className="video-r-item-img">
                    <img src={item.pic} title={item.title}/>
                  </div>
                  <div className="video-r-item-text">
                    <h4>{item.title}</h4>
                    <p>{item.author}</p>
                  </div>
                </div>
              
            );
          })}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.getBannerData();
    this.props.getRecommendVideo();

    this.SwiperInit();
  }
  async SwiperInit() {
    console.log("初始化swiper");
    new Swiper(".home-banner", {
      // autoplay: true
    });
  }
}

const mapStateToProps = state => ({
  bannerList: state.home.recommendBanner,
  videoList: state.home.videoListMap["1"]
});
const mapDispatchToProps = dispatch => ({
  getBannerData() {
    let action = requestRecommendBanner();
    dispatch(action);
  },

  getRecommendVideo() {
    let action = requestRecommendVideo(0, 1);
    dispatch(action);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Recommend);
