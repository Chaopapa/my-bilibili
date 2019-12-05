import React, {useState,useEffect, useCallback, useRef,useMemo } from "react";
import "./style.scss";
import TimeHandle from "../../../../../utils/TimeHandle";

export default (props) => {


    const process = useRef();
    const draw = useRef();
    const played = useRef();

    const [isPlay, setIsPlay] = useState(true);
    let icon = isPlay?'icon-bofangqi-zanting':'icon-bofangqi-bofang';

    const handleDraw = useCallback((e) => {
        console.log(e);
        //记录拖拽点起始位置
        let startX = draw.current.offsetLeft;
        //记录起始鼠标位置
        let clientX = e.changedTouches[0].clientX;
        console.log(startX);
        document.ontouchmove = e => {
            //计算移动距离
            let moveLeft = e.changedTouches[0].clientX - clientX + startX;
            console.log(moveLeft);
            //边界判断
            if (moveLeft < 0) {
                moveLeft = 0;
            }

            if (moveLeft > process.current.clientWidth) {
                moveLeft = process.current.clientWidth;
            }

            draw.current.style.left = moveLeft + 'px';
            played.current.style.width = moveLeft + 'px';

            //计算比率通知父级更改时间
            let rate = moveLeft / process.current.clientWidth;

            props.changeVideoTime(rate);

            document.ontouchend = e => {
                console.log('移动结束');
                document.ontouchmove = null;
                document.ontouchend = null;
            }

        }
    }, [draw, played]);

    useEffect(() => {
        //组件的创建,监听process
        if (draw.current) {
            draw.current.addEventListener('touchstart', handleDraw);

        }
        return () => {
            //组件销毁
            draw.current.addEventListener('touchstart', handleDraw);

        };
    }, [draw]);

    const handlePlay = useCallback(()=>{
        props.playAndPauseAction();
        setIsPlay(!isPlay);
    },[isPlay]);

    //监听视频时间的变化改变视频的进度条
    useEffect(() => {
        let rate = props.currentTime / props.videoTime;
        let moveLeft = process.current.clientWidth * rate;
        draw.current.style.left = moveLeft + 'px';
        played.current.style.width = moveLeft + 'px';

    }, [props.currentTime, props.videoTime]);

    let currentTime  = useMemo(() =>TimeHandle.getMS(props.currentTime), [props.currentTime]);
    let videoTime = useMemo(() => TimeHandle.getMS(props.videoTime),[props.videoTime]);
    return (
        <div className="video-control">

            <span className={"play iconfont"+' '+icon}  onClick={handlePlay} ></span>
            <div ref={process} className="video-control-process">
                <p ref={played}></p>
                <span ref={draw} className="iconfont icon-mine "></span>
            </div>
            <span className="time">
                {currentTime}/{videoTime}
            </span>
            <span className="allScreen iconfont icon-icon_quanping"></span>
        </div>
    )
}