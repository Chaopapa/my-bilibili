import React, { Component } from "react";
import withScroll from "../../../../../../HOC/withScroll";
import "./style.scss";
import { connect } from "react-redux";
import { requestVideoComment } from "../../../reducer";
import MyComment from "../../../../../../components/MyComment/MyComment";

class Comment extends Component {
  render() {
    return (
      <div className="video-comment">
        <div className="video-comment-header">
          <h4>热门评论</h4>
          <p>按热度</p>
        </div>
        <div className="video-comment-list">
          {this.props.videoComment.map(item => {
            return <MyComment item={item}  key={item.rpid} />;
          })}
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.getCommentList();
  }
  async getCommentList() {
    await this.props.getCommentList();
    //更新滚动视图
    this.props.initAction();
  }
}
const mapStateToProps = state => ({
  videoComment: state.home.videoComment
});
const mapDispatchToProps = dispatch => ({
  async getCommentList() {
    let action = requestVideoComment(76667340, 1, 2, 0);
    await dispatch(action);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withScroll(Comment, "video-scroll", 462 / 75, 98/75));
