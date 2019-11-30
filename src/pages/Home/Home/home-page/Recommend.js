import React, { Component } from "react";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import {connect} from "react-redux";
import {requestRecommendBanner} from "../reducer";

class Recommend extends Component {
  render() {
    return (
      <div id="home" className="page">
        <div className="swiper-container home-banner">
          <div className="swiper-wrapper">
            <div className="swiper-slide">slider1</div>
            <div className="swiper-slide">slider2</div>
            <div className="swiper-slide">slider3</div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.SwiperInit();
  }
  SwiperInit() {
    this.props.getBannerData();
    new Swiper(".home-banner", {
      // autoplay: true
    });
  }

}



const mapStateToProps = (state)=>({
  bannerList:state.home.recommendBanner
});
const mapDispatchToProps = (dispatch)=>({
  getBannerData(){
    let action = requestRecommendBanner();
    dispatch(action);
  }
});

export default  connect(mapStateToProps,mapDispatchToProps)(Recommend);
