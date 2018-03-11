import React, { Component } from "react";
import { Logout,Logoutt } from "../../api/user";
import { Control, Link } from "react-keeper";
import { goToAny } from "../../router/route"
import { Key, reUri } from "../../config/config"
import "./style.css";

class Foot extends Component {
    _logout() {
        Logout().then((res) => {
            Logoutt().then((res) => {
                localStorage.clear();
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
        const fun = this.props.setHeadText;
        return(
            <div>
                <div style={{ "bottom": -3 }} className="foot">
                    <Link type="div" to={'/index'} activeClassName="activeFoot">
                        <span className="iconfont icon-weibo" onClick={() => fun("全部微博")}></span>
                    </Link>
                    <Link type="div" to={'/index/massage'} activeClassName="activeFoot">
                        <span className="iconfont icon-xiaoxi" onClick={() => fun("消息")}></span>
                    </Link>
                    <Link type="div" to={'/index/hot'} activeClassName="activeFoot">
                        <span className="iconfont icon-remen" onClick={() => fun("热门")}></span>
                    </Link>
                </div>
                { Control.path === "/" || Control.path === "/index"
                  ? <div className="qiuqiu" onClick={this._logout.bind(this)}>
                        <span className="iconfont icon-bi"></span>
                    </div> 
                  : "" }
            </div>
        )
    }
}

export default Foot