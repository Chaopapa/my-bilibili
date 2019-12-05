import React, { Component, lazy, Suspense } from "react";
import Tabs from "./components/Tabs/Tabs";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./style/style.scss";

const Home = lazy(() => import("./pages/Home/Home/Home"));
const Mine = lazy(() => import("./pages/Mine/Mine/Mine"));
const Channel = lazy(() => import("./pages/Channel/Channel/Channel"));
const NotFound = lazy(() => import("./pages/common/notFound/notFound"));
const VideoDetail = lazy(()=>import("./pages/Home/Home/children/Video/VideoDetail"))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={<h1>加载中...</h1>}>
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
          </Switch>
          <Tabs />
        </Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
