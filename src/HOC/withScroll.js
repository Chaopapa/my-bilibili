import React from "react";

/**
 * 滚动视图高阶组件
 */
export default (Com, className, top, bottom, ...rest) => {
  return class withScroll extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        style :{
          width: "100%",
          position: "absolute",
          overflow: "hidden",
          top: `${top}rem`,
          bottom: `${bottom}rem`,
          left: 0
        },
        myScroll:null
      }
      console.log(props);

    }
    render() {
      return (
        <div className={className} style={this.state.style}>
          <Com {...this.props} myScroll={this.state.myScroll} scrollTo={this.scrollTo.bind(this)} initAction={this.initScroll.bind(this)} />
        </div>
      );
    }

    initScroll() {
      let  myScroll = new window.IScroll(`.${className}`);
      console.log(className + '初始化滚动视图');
      this.setState({
        myScroll
      })
    }

    scrollTo(x,y){
      this.state.myScroll.scrollTo(x,y,300);
    }

  };
};
