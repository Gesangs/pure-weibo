import React, { Component } from "react";
import { connect } from 'react-redux'
import { HashRouter, Route } from "react-keeper";

import { getAccess_token } from "../api/user"
import { URL, endTime } from "../config/config";
import * as scrollUtils from "../utils/scroll-position";

import Root from "../containers/index"
import Index from "../containers/index/index";
import Home from "../containers/home/index"
import NotFound from "../containers/404";


const Massage = (cb)=>{
  import(/* webpackChunkName: "massage" */ '../containers/massage/index').then((Massage)=>{
    cb(Massage.default)
  })
}
const AtMeComment = (cb)=>{
  import(/* webpackChunkName: "at_me_comment" */ '../containers/massage/at_me_comment').then((AtMeComment)=>{
    cb(AtMeComment.default)
  })
}
const AtMeWeibo = (cb)=>{
  import(/* webpackChunkName: "at_me_weibo" */ '../containers/massage/at_me_weibo').then((AtMeWeibo)=>{
    cb(AtMeWeibo.default)
  })
}
const CommentByMe = (cb)=>{
  import(/* webpackChunkName: "comment_by_me" */ '../containers/massage/comment_by_me').then((CommentByMe)=>{
    cb(CommentByMe.default)
  })
}
const CommentToMe = (cb)=>{
  import(/* webpackChunkName: "comment_to_me" */ '../containers/massage/comment_to_me').then((CommentToMe)=>{
    cb(CommentToMe.default)
  })
}


const HotPage = (cb)=>{
  import(/* webpackChunkName: "hotpage" */ '../containers/hotpage/index').then((HotPage)=>{
    cb(HotPage.default)
  })
}
const Favorites = (cb)=>{
  import(/* webpackChunkName: "favoriteslist" */ '../containers/favoriteslist/index').then((Favorites)=>{
    cb(Favorites.default)
  })
}
const Detail = (cb)=>{
  import(/* webpackChunkName: "detail" */ '../containers/detail/index').then((Detail)=>{
    cb(Detail.default)
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

const UserPage = (cb)=>{
  import(/* webpackChunkName: "userpage" */ '../containers/userpage/index.js').then((UserPage)=>{
    cb(UserPage.default)
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
            <Route index component={Index} path="/index" enterFilter={ this.enterIndex.bind(this) } leaveFilter={ this.leaveIndex.bind(this) }>
              <Route index cache component={Home} />
              <Route loadComponent={Massage} path="/massage">
                <Route index cache='parent' loadComponent={CommentToMe} />
                <Route cache='parent' loadComponent={AtMeComment} path="/at_me_comment" />
                <Route cache='parent' loadComponent={AtMeWeibo} path="/at_me_weibo" />
                <Route cache='parent' loadComponent={CommentByMe} path="/comment_by_me" />
              </Route>
              <Route loadComponent={HotPage} cache='parent' path="/hot" /> 
            </Route>
            <Route loadComponent={ UserPage } path='/user/:id' />
            <Route loadComponent={Detail} path="/detail/:id" />
            <Route cache loadComponent={Favorites} path="/favorites" />
            <Route loadComponent={Post} path="/post" />
            <Route loadComponent={ImageZoom} path="/imageZoom" />
            <Route miss component={NotFound} />
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

