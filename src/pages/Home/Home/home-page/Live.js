import React, { Component } from 'react';
import { requestLiveAll } from "../reducer";
import { connect } from "react-redux";
import LiveSwiper from "./live-children/LiveSwiper";
import TagList from "./live-children/TagList";
import LiveItem from "./live-children/LiveItem";
import TimeRank from "./live-children/TimeRank";
import "../style.scss";
import Swiper from "swiper";


class Live extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    static getDerivedStateFromProps(props) {
        if (props.liveAll.length > 0) {
            return {
                bannerList: props.liveAll[0].list,//banner图,
                moduleList: props.liveAll[2].list,//分区模块
                recommendLive: props.liveAll[7].list,//推荐直播
                timeRank: props.liveAll[12],//小时榜
                radio: props.liveAll[13].list,//电台,
                video: props.liveAll[14].list,//视频唱见
                rongyao: props.liveAll[15].list,//王者荣耀
                game: props.liveAll[16].list,//网游
                mobile: props.liveAll[17].list,//手游
                dangji: props.liveAll[18].list,//单机
                yule: props.liveAll[19].list,//娱乐
                paint: props.liveAll[20].list,//绘画
            }
        } else {
            return {
                bannerList: [],
                moduleList: [],
                recommendLive: [],
                timeRank: {},
                radio: [],
                video: [],
                rongyao: [],
                game: [],
                mobile: [],
                dangji: [],
                yule: [],
                paint: []
            }
        }
    }




    render() {
        return (
            <div className="home-live">
                <LiveSwiper bannerList={this.state.bannerList} />
                <TagList moduleList={this.state.moduleList} />
                <LiveItem title="推荐直播" count="6" list={this.state.recommendLive}  rightText="换一换" right-icon="" />
                <TimeRank timeRank={this.state.timeRank} />
                <LiveItem title="电台" count="4" list={this.state.radio}  rightText="查看更多" right-icon="" />
                <LiveItem title="视频唱见" count="4" list={this.state.video}  rightText="查看更多" right-icon="" />
                <LiveItem title="王者荣耀" count="4" list={this.state.rongyao}  rightText="查看更多" right-icon="" />
                <LiveItem title="网游" count="4" list={this.state.game}  rightText="查看更多" right-icon="" />
                <LiveItem title="手游" count="4" list={this.state.mobile}  rightText="查看更多" right-icon="" />
                <LiveItem title="单机" count="4" list={this.state.dangji}  rightText="查看更多" right-icon="" />
                <LiveItem title="娱乐" count="4" list={this.state.yule}  rightText="查看更多" right-icon="" />
                <LiveItem title="绘画" count="4" list={this.state.paint}  rightText="查看更多" right-icon="" />
            </div>
        )
    }

    componentDidMount() {
        this.getLiveAll();
    }
    componentWillUnmount(){
        console.log('组件卸载');
    }

    async getLiveAll() {
        await this.props.getLiveAll();
        //更新滚动视图
        this.props.initAction();
        //更新轮播图
        // console.log(Swiper);
        new Swiper('.live-banner', {});
    }
}

const mapStateToProps = state => ({
    liveAll: state.home.liveAll,
});
const mapDispatchToProps = dispatch => ({
    async getLiveAll() {
        let action = requestLiveAll(3, 10000);
        await dispatch(action);
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Live);

