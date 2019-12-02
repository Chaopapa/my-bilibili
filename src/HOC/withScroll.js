import React from "react";

/**
 * 滚动视图高阶组件
 */
export default (Com,className,top,bottom,...rest) => {
  return class withScroll extends React.Component {
    constructor(props) {
      super(props);
      this.style = {
        width: "100%",
        position: "absolute",
        overflow: "hidden",
        top: `${top}rem`,
        bottom: `${bottom}rem`,
        left: 0
      };
      console.log(props);

    }
    render() {
      return (
        <div className={className} style={this.style}>
          <Com {...this.props}   initAction={this.initScroll.bind(this)}/>
        </div>
      );
    }

    initScroll() {
      this.myScroll = new window.IScroll(`.${className}`);
      console.log(className+'初始化滚动视图');
    }
  };
};
