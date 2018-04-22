import React, { Component } from "react";
import PropTypes from 'prop-types'
import { Logout,Logoutt } from "../../api/user";
import { Control, Link } from "react-keeper";
import { Key, reUri } from "../../config/config"
import "./style.css";

class Foot extends Component {
    static propTypes = {
        setHeadText: PropTypes.func.isRequired
    }
    _logout() {
        Logout().then((res) => {
            Logoutt().then((res) => {
                localStorage.clear();
                window.location.href = `https://api.weibo.com/oauth2/authorize?client_id=${Key}&response_type=code&redirect_uri=${reUri}`;
            })
        });
      }
    render() {
        const fun = this.props.setHeadText;
        return(
            <div>
                <div style={{ "bottom": -3 }} className="js-foot">
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
                  ? <div className="js-qiuqiu">
                        <span className="iconfont icon-bi"></span>
                    </div> 
                  : "" }
            </div>
        )
    }
}

export default Foot