import React, { useEffect } from "react";
import "./style.scss";
import widthScroll from "../../../../../../HOC/withScroll";


// let top = 532;

const InteractItem = (props) => {
    return <div className="live-interact-main-item">
        <div className="message">
            <span>{props.item.name}:</span>
            {props.item.content}
        </div>
    </div>
}

const InteractMain = (props) => {
    console.log(props.messageList);

    //监听list变化更新滚动视图
    useEffect(() => {
        props.initAction();
        console.log(props);
        props.myScroll&&props.scrollTo(0,props.myScroll.maxScrollY);

    }, [props.messageList])

    return (
        <div className="live-interact-main">
            {props.messageList.map((item, index) => {
                return <InteractItem key={index} item={item} />
            })}
        </div>
    );
}



const Main = widthScroll(InteractMain, 'interact-scrolll', 140 / 75, 0);

/**
 * @props:messageList
 */
export default function Interact(props) {

    console.log(props.messageList);

    return <div className="live-interact">
        <div className="live-interact-header">
            <img src="/static/image/user.jpg" alt="" />
            <div className="live-interact-header-info">
                <h3>FKEY</h3>
                <p>
                    <span>人气：5822</span>
                    <span>粉丝：7.2万</span>
                    <span>原创绘画</span>
                </p>
            </div>
            <a href="#">
                +关注
                </a>
        </div>
        <Main messageList={props.messageList} ></Main>
    </div>
}


