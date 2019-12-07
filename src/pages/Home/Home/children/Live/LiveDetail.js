import React, { useState, useMemo, lazy, useCallback, useEffect} from "react";
import {useHistory,useLocation} from "react-router-dom";
import MyVideo from "../Video/My-Video";
import VideoTab from "../Video/Video-Tab";
import { w3cwebsocket } from "websocket";

const tabList = [
    { id: 0, title: "互动" },
    { id: 1, title: "主播" },
    {
        id: 2, title: "贡献榜"
    }
];

let HEART_BEAT_TIMER = null;

console.log(w3cwebsocket);




const client = new w3cwebsocket('wss://hw-bj-live-comet-05.chat.bilibili.com/sub');
client.binaryType = 'arraybuffer';

let auth_params = {
    'uid': 1,
    'roomid':7734200,
    'protover': 1,
    'platform': 'web',
    'clientver': '1.4.0'
};

const wsBinaryHeaderList = [{
    name: "Header Length",
    key: "headerLen",
    bytes: 2,
    offset: 4,
    value: 16
}, {
    name: "Protocol Version",
    key: "ver",
    bytes: 2,
    offset: 6,
    value: 1
}, {
    name: "Operation",
    key: "op",
    bytes: 4,
    offset: 8,
    value: 1
}, {
    name: "Sequence Id",
    key: "seq",
    bytes: 4,
    offset: 12,
    value: 1
}];


export default function Live(props) {
    const [select, setSelect] = useState(0);
    const [navTop, setNavTop] = useState(382);
    const [messageList, setMessageList] = useState([]);
    const history = useHistory();
    const location  = useLocation();
    console.log(history);
    console.log(location);

    //设置房间号
    auth_params.roomid = location.state;
    let {roomid}  = auth_params;

    const Com = useMemo(() =>
        select === 0 ? lazy(() => import('./live-main/Interact')) : lazy(() => import('./live-main/About'))
        , [select]);
    const handleChange = useCallback(
        (id) => {
            setSelect(id);
        },
        [select],
    );
    console.log(Com);
    //心跳检测    
    const heartBeat = useCallback(
        () => {
            clearTimeout(HEART_BEAT_TIMER);
            const t = convertToArrayBuffer({}, 2);

            console.log(HEART_BEAT_TIMER);
            client.send(t);
            HEART_BEAT_TIMER = setTimeout(function () {
                heartBeat()
            }, 30000);

        },
        [client],
    )

        

    //监听websocket 
    useEffect(() => {
        client.onerror = function () {
            console.log('Connection Error');
        };

        client.onopen = function () {
            // Web Socket 已连接上，使用 send() 方法发送数据
            const data = JSON.stringify(auth_params);
            const byte = convertToArrayBuffer(data, 7);
            client.send(byte);
            console.log('ws.sending...', byte);
        };

        client.onclose = function () {
            console.log('客户端关闭');
        };

        client.onmessage = function (e) {
            var result = convertToObject(e.data);
            let body = result.body;
            console.log(body);
            if (body instanceof Array && body.length > 0) {
                let info = body[0].info;
                if (info instanceof Array && info.length > 0) {
                    console.log(info);
                    let content = info[1];
                    let name = info[2][1];
                    setMessageList((messageList)=>{
                       return [...messageList,{content,name}];     
                    });
                }
            }

            //给指定浏览器添加弹幕，暂时不需要
            // result.body.forEach && result.body.forEach(function(item) {
            //   if(item.cmd == 'DANMU_MSG') {
            //     barrager.shoot(item.info[1]);
            //   }
            // });

            if (result.op == 8) {
                heartBeat();
            }
        };
        return () => {

        };
    }, [])





    return (<div className="subPage">
        <MyVideo changeNavTop={(val) => {
            setNavTop(val)
        }} history={props.history} ></MyVideo>
        <VideoTab
            changeAction={handleChange}
            select={select}
            navTop={navTop}
            tabList={tabList}
            isLive
        ></VideoTab>
        <Com {...props} messageList={messageList} top={navTop + 80}></Com>
        {select == 0 && <div className="sendComment sc-i">
            <span className="user">
                <img src="/static/image/user.jpg" alt=""/>
            </span>
            <input type="text" placeholder="发个弹幕呗"/>
            <span className="iconfont icon-liwu gift"></span>
        </div>}
    </div >);
}

function stringToByte(str) {
    var bytes = new Array();
    var len, c;
    len = str.length;
    for (var i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x010000 && c <= 0x10FFFF) {
            bytes.push(((c >> 18) & 0x07) | 0xF0);
            bytes.push(((c >> 12) & 0x3F) | 0x80);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if (c >= 0x000800 && c <= 0x00FFFF) {
            bytes.push(((c >> 12) & 0x0F) | 0xE0);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if (c >= 0x000080 && c <= 0x0007FF) {
            bytes.push(((c >> 6) & 0x1F) | 0xC0);
            bytes.push((c & 0x3F) | 0x80);
        } else {
            bytes.push(c & 0xFF);
        }
    }
    return bytes;
}

function convertToObject(arraybuffer) {
    var dataview = new DataView(arraybuffer);
    var output = {
        body: []
    };
    output.packetLen = dataview.getInt32(0);

    wsBinaryHeaderList.forEach(function (item) {
        4 === item.bytes ? output[item.key] = dataview.getInt32(item.offset) : 2 === item.bytes && (output[item.key] = dataview.getInt16(item.offset))
    });

    output.packetLen < arraybuffer.byteLength && convertToObject(arraybuffer.slice(0, output.packetLen));

    var decoder = getDecoder();

    if (output.op && 5 === output.op) {
        for (var i = 0, o = output.packetLen, u = "", c = ""; i < arraybuffer.byteLength; i += o) {

            try {
                o = dataview.getInt32(i).toString();
                u = dataview.getInt16(i + 4).toString();

                if (output.ver === 2) {
                    var l = arraybuffer.slice(i + u, i + o),
                        f = new Uint8Array(l);
                    c = convertToObject(f.buffer).body
                } else {
                    c = JSON.parse(decoder.decode(arraybuffer.slice(i + u, i + o)));
                }
                c && output.body.push(c)
            } catch (t) {
                console.error("decode body error:", new Uint8Array(arraybuffer), output, t)
            }
        }
    } else {
        output.op && 3 === output.op && (output.body = {
            count: dataview.getInt32(16)
        });
    }
    return output;
}


function convertToArrayBuffer(data, t) {
    var encoder = getEncoder();
    var buffer = new ArrayBuffer(16);
    var dataview = new DataView(buffer, 0);
    var encode = encoder.encode(data);

    return dataview.setInt32(0, 16 + encode.byteLength),
        wsBinaryHeaderList[2].value = t,
        wsBinaryHeaderList.forEach(function (e) {
            4 === e.bytes ? dataview.setInt32(e.offset, e.value) : 2 === e.bytes && dataview.setInt16(e.offset, e.value)
        }),
        mergeArrayBuffer(buffer, encode)
}

function mergeArrayBuffer(e, t) {
    var n = new Uint8Array(e),
        i = new Uint8Array(t),
        r = new Uint8Array(n.byteLength + i.byteLength);
    return r.set(n, 0), r.set(i, n.byteLength), r.buffer
}

function getDecoder() {
    return window.TextDecoder ? new window.TextDecoder : {
        decode: function (e) {
            return decodeURIComponent(window.escape(String.fromCharCode.apply(String, new Uint8Array(e))))
        }
    }
}

function getEncoder() {
    return window.TextEncoder ? new window.TextEncoder : {
        encode: function (e) {
            for (var t = new ArrayBuffer(e.length), n = new Uint8Array(t), i = 0, r = e.length; i < r; i++) {
                n[i] = e.charCodeAt(i);
            }
            return t
        }
    }
}