import React, { Component } from "react";
import "./style.scss";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import withScroll from "../../../HOC/withScroll";

class HomePage extends Component {
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
    new Swiper(".home-banner", {
      // autoplay: true
    });
  }
}

export default withScroll(HomePage, 165/75,96/75);
