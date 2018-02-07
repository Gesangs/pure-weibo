import React, { Component } from "react";
import { Logout,Logoutt } from "../../api/user";
import { Control, Link } from "react-keeper";
import {goToAny} from "../../router/route"
import { Key, access_token, reUri } from "../../config/config"
import "./style.css";

class Foot extends Component {
    constructor() {
        super()
    }
    _logout() {
        Logout().then((res) => {
            Logoutt().then((res) => {
                localStorage.removeItem("access_token");
                window.location.href = `https://api.weibo.com/oauth2/authorize?client_id=${Key}&response_type=code&redirect_uri=${reUri}`;
            })
        });
      }
      goToPost(e){
        goToAny(() => {
            Control.go("/post", {
                title: "发微博",
                preText: "说点什么吧..."
            })
          }, e)
      }
    render() {
        const patt=/(\/massage|\/hot|^\/$)/g;
        return(
            <div style={{ display: `${patt.test(Control.path) ? "block" : "none"}` }} >
                <div style={{ "bottom": -3 }} className="foot">
                    <Link type="div" to={'/'}>主页</Link>
                    <Link type="div" to={'/massage'}>消息</Link>
                    <Link type="div" to={'/hot'}>热门</Link>
                </div>
                {Control.path === "/home" ?<div className="qiuqiu" onClick={this.goToPost.bind(this)}></div> : ""}
            </div>
        )
    }
}

export default Foot