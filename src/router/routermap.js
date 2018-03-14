import React, { Component } from "react";
import { HashRouter, Route } from "react-keeper";

import {getAccess_token} from "../api/user"
import { URL, endTime } from "../config/config";

import Root from "../containers/index"
import Index from "../containers/index/index";
import Home from "../containers/home/index"

import Massage from "../containers/massage/index"
import AtMeComment from "../containers/massage/at_me_comment"
import AtMeWeibo from "../containers/massage/at_me_weibo"
import CommentByMe from "../containers/massage/comment_by_me"
import CommentToMe from "../containers/massage/comment_to_me"

import HotPage from "../containers/hotpage/index"
import Favorites from "../containers/favoriteslist/index"
import UserPage from "../containers/userpage/index";
import Detail from "../containers/detail/index";
import Post from "../component/postpage/post";
import ImageZoom from "../component/imagezoom/index"
import NotFound from "../containers/404";

class RouterMap extends Component {

  loginCheck(cb, props){
    const current = (new Date()).getTime();
    const isover = Math.sign(+endTime - +current) !== 1
    
    if(isover) {
      const Code = window.location.href.split("=")[1];
      if (!Code) {
        window.location.href = URL;
      } else {
        localStorage.clear()
        getAccess_token(Code.replace(/#\//g, ""))
      }
    }
    cb();
  }
  render() {
    return (
      <HashRouter>
        <div>
          <Route component={Root} path="/" enterFilter={ this.loginCheck.bind(this) }>
            <Route index component={Index} path="/index">
              <Route index cache component={Home} />
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
            <Route cache component={Favorites} path="/favorites" />
            <Route component={Post} path="/post" />
            <Route component={ImageZoom} path="/imageZoom" />
            <Route miss component={NotFound} />
          </Route>
        </div>
      </HashRouter>
    );
  }
}

export default RouterMap;
