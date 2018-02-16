import React, { Component } from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Logout,Logoutt } from "../../api/user";
import { Control, Link } from "react-keeper";
import {goToAny} from "../../router/route"
import { Key, reUri } from "../../config/config"
import "./style.css";

class Foot extends Component {
    // constructor() {
    //     super();
    //     this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    //   }
    _logout() {
        Logout().then((res) => {
            Logoutt().then((res) => {
                localStorage.removeItem("access_token");
                window.location.href = `https://api.weibo.com/oauth2/authorize?client_id=${Key}&response_type=code&redirect_uri=${reUri}`;
            })
        });
      }
      goToPost(e){
        goToAny("/post", {
                title: "发微博",
                preText: "说点什么吧..."
            }, e)
      }
    render() {
        return(
            <div>
                <div style={{ "bottom": -3 }} className="foot">
                    <Link type="div" to={'/index/home'}>主页</Link>
                    <Link type="div" to={'/index/massage'}>消息</Link>
                    <Link type="div" to={'/index/hot'}>热门</Link>
                </div>
                { Control.path === "/" || Control.path === "/index/home"
                  ? <div className="qiuqiu" onClick={this.goToPost.bind(this)}></div> 
                  : "" }
            </div>
        )
    }
}

export default Foot