import React, { Component } from "react";
import { HashRouter,Route } from "react-keeper";

import Index from "../containers/index/index.js";
import Home from "../containers/home/index"
import Massage from "../containers/massage/index"
import AtMeComment from "../containers/massage/at_me_comment"
import AtMeWeibo from "../containers/massage/at_me_weibo"
import CommentByMe from "../containers/massage/comment_by_me"
import CommentToMe from "../containers/massage/comment_to_me"
import HotPage from "../containers/hotpage/index"

import UserPage from "../containers/userpage/index";
import Detail from "../containers/detail/index";
import Post from "../component/postpage/post";
import ImageZoom from "../component/imagezoom/index"
import NotFound from "../containers/404";

class RouterMap extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <HashRouter>
        <div>
          <Route cache component={Index} path="/">
            <Route index cache='parent' component={Home} />
            <Route component={Massage} path="/massage">
              <Route index cache='parent' component={CommentToMe} />
              <Route cache='parent' component={AtMeComment} path="/at_me_comment" />
              <Route cache='parent' component={AtMeWeibo} path="/at_me_weibo" />
              <Route cache='parent' component={CommentByMe} path="/comment_by_me" />
            </Route>
            <Route component={HotPage} cache='parent' path="/hot" /> 
          </Route>
          <Route component={UserPage} path="/user/:id" />
          <Route component={Detail} path="/detail/:id" />
          <Route component={Post} path="/post" />
          <Route component={ImageZoom} path="/imageZoom" />
          <Route miss component={NotFound} path="/NotFound" />
        </div>
      </HashRouter>
    );
  }
}

export default RouterMap;
