import React, { Component } from "react";
import { connect } from 'react-redux'
import { HashRouter, Route } from "react-keeper";

import { getAccess_token } from "../api/user"
import { URL, endTime } from "../config/config";
import * as scrollUtils from "../utils/scroll-position";

import Root from "../containers/index"
import Home from "../containers/home/index";
import NotFound from "../containers/404";

import Massage from '../containers/massage/index';
import AtMeComment from '../containers/massage/at_me_comment'
import AtMeWeibo from '../containers/massage/at_me_weibo'
import CommentByMe from '../containers/massage/comment_by_me'
import CommentToMe from '../containers/massage/comment_to_me'

import UserPage from '../containers/userpage/index.js'
import Detail from '../containers/detail/index'
import HotPage from '../containers/hotpage/index'
import Favorites from '../containers/favoriteslist/index'


const Index = (cb)=>{
  import(/* webpackChunkName: "home" */ '../containers/index/index').then((Index)=>{
    cb(Index.default)
  })
}
const Post = (cb)=>{
  import(/* webpackChunkName: "postpage" */ '../component/postpage/post').then((Post)=>{
    cb(Post.default)
  })
}
const ImageZoom = (cb)=>{
  import(/* webpackChunkName: "imagezoom" */ '../component/imagezoom/index').then((ImageZoom)=>{
    cb(ImageZoom.default)
  })
}



class RouterMap extends Component {

  constructor(){
    super()
    this.indexScroll = null;
  }

  enterIndex(cb, props){
    const Y = this.indexScroll
    if(Y)
      setTimeout(() => {
        scrollUtils.setScrollTop(+Y)
      },50)
    cb()
  }

  leaveIndex(cb, props){
    const Y = scrollUtils.getScrollTop();
    if(Y > 0)
      this.indexScroll = Y;    
    cb()
  }

  loginCheck(cb, props){
    const user = this.props.userinfo.userinfo;
    if(!user) {
      const current = (new Date()).getTime();
      const isover = endTime ? Math.sign(+endTime - +current) !== 1 : true;
      
      if(isover) {
        const Code = window.location.href.split("=")[1];
        if (!Code) {
          window.location.href = URL;
        } else {
          localStorage.clear()
          getAccess_token(Code.replace(/#\//g, ""))
        }
      }
    }
    cb();
  }
  
  render() {
    return (
      <HashRouter>
        <div>
          <Route component={Root} path="/" enterFilter={ this.loginCheck.bind(this) }>
            <Route index loadComponent={Index} path="/index" enterFilter={ this.enterIndex.bind(this) } leaveFilter={ this.leaveIndex.bind(this) }>
              <Route index cache component={Home} />
              <Route component={Massage} path="/massage">
                <Route index cache='parent' Component={CommentToMe} />
                <Route cache='parent' Component={AtMeComment} path="/at_me_comment" />
                <Route cache='parent' Component={AtMeWeibo} path="/at_me_weibo" />
                <Route cache='parent' Component={CommentByMe} path="/comment_by_me" />
              </Route>
              <Route component={HotPage} cache='parent' path="/hot" /> 
            </Route>
            <Route component={ UserPage } path='/user/:id' />
            <Route component={ Detail } path="/detail/:id" />
            <Route loadComponent={ Post } path="/post" />
            <Route loadComponent={ ImageZoom } path="/imageZoom" />
            <Route cache component={ Favorites } path="/favorites" />
            <Route miss component={ NotFound } />
          </Route>
        </div>
      </HashRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    userinfo: state.userinfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouterMap)

