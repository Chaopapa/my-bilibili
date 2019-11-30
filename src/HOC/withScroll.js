import React from "react";

/**
 * 滚动视图高阶组件
 */
export default (Com, top, bottom) => {
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
    }
    render() {
      return (
        <div className="scroll-wrap" style={this.style}>
          <Com {...this.props} />
        </div>
      );
    }

    componentDidMount() {
      this.initScroll();
    }
    initScroll() {
      this.myScroll = new window.IScroll(".scroll-wrap");
    }
  };
};
