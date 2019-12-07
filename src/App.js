import React, { Component, lazy, Suspense } from "react";
import Tabs from "./components/Tabs/Tabs";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./style/style.scss";

const Home = lazy(() => import("./pages/Home/Home/Home"));
const Mine = lazy(() => import("./pages/Mine/Mine/Mine"));
const Channel = lazy(() => import("./pages/Channel/Channel/Channel"));
const NotFound = lazy(() => import("./pages/common/notFound/notFound"));
const VideoDetail = lazy(()=>import("./pages/Home/Home/children/Video/VideoDetail"))
const LiveDetail = lazy(()=>import("./pages/Home/Home/children/Live/LiveDetail"));

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={<h1>(´・ω・｀)正在加载...</h1>}>
          <Switch>
            <Redirect from="/" exact to="/home"></Redirect>
            <Route path="/home" component={Home} />
            <Route path="/channel" component={Channel} />
            <Route path="/mine" component={Mine} />

            <Route component={NotFound} />
          </Switch>
          <Switch>
            <Route
              path="/home/video/detail/:aid"
              render={(props) => {
                return < VideoDetail {...props} />;
              }}
            />
            <Route path="/home/live/detail/:roomid" render={(props)=>{
                console.log('liveDetail匹配');
                return <LiveDetail  {...props}></LiveDetail>
            }} />
          </Switch>
          <Tabs />
        </Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
