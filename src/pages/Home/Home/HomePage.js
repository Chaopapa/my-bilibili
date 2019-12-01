import React, { Component } from "react";
import "./style.scss";
import withScroll from "../../../HOC/withScroll";
import Http from "../../../utils/Http";
import api from "../../../utils/api";
import Recommend from "./home-page/Recommend";

const pageList = [
  {
    id: 1,
    com: Recommend
  },
  {
    id: 2,
    com:Recommend
  },
  {
    id: 3,
    com:Recommend
  },
  {
    id: 4,
    com:Recommend
  },
  {
    id: 5,
    com:Recommend
  },
];

class HomePage extends Component {
  constructor(){
      super();
      this.state={

      }
  }  
  render() {
      let Com  = this.state.com;
    return (
        <Com/>
    );
  }
  
  static getDerivedStateFromProps(props){
      console.log(props.selectIndex);
      console.log(pageList[props.selectIndex-1].com);
      return {
          com:pageList[props.selectIndex-1].com
      }
  }

  componentDidMount() {
    // this.getVideoList();
  }
  // async getVideoList() {
  //   try {
  //     let result = await Http.get(api.RECOMMEND_VIDEO, {
  //       rid: 0,
  //       day: 1,
  //       jsonp: "jsonp"
  //     });
  //     console.log(result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}

export default withScroll(HomePage, 165 / 75, 96 / 75);
