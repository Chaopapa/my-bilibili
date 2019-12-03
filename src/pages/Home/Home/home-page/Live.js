import React, { Component } from 'react';
import { requestLiveAll } from "../reducer";
import { connect } from "react-redux";
import LiveSwiper from "./live-children/LiveSwiper";
import TagList from "./live-children/TagList";
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
                moduleList:props.liveAll[2].list,//分区模块
                recommendLive: props.liveAll[7].list,//推荐直播
                timeRank: props.liveAll[12].list,//小时榜
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
                moduleList:[],
                recommendLive: [],
                timeRank: [],
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
                <LiveSwiper  bannerList={this.state.bannerList} />
                <TagList moduleList={this.state.moduleList} />
            </div>
        )
    }

    componentDidMount() {
        this.getLiveAll();
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

