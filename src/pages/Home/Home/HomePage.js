import React, { Component } from "react";
import "./style.scss";
import withScroll from "../../../HOC/withScroll";
import Recommend from "./home-page/Recommend";
import HotRank from "./home-page/HotRank";

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
    com:HotRank
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
  constructor(props){
      super(props);
      this.state={

      }
      console.log(props);
  }  
  render() {
      let Com  = this.state.com;
    return (
        <Com {...this.props}/>
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
  }
}

export default withScroll(HomePage, 'home-scroll',175 / 75, 96 / 75);
