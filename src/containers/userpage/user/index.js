import React, { Component } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import { Control } from "react-keeper";
import {goBack, goToAny} from "../../../router/route"
import "./style.css";
class User extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  SwitchTab() {
    const switchs = this.props.SwitchTab;
    switchs();
  }
  goToImageZoom(imgs, e) {
    goToAny(() => {
      Control.go("/imageZoom", { imagelist: imgs });
    }, e)
  }
  render() {
    const userinfo = this.props.userinfo;
    return (
      <div>
        {userinfo ? (
          <div className="User">
            <div className="headBar" onClick={(e) => {goBack(e)}}>
              返回
            </div>
            <div className="userHeader">
              <div
                className="coverImg"
                style={{ backgroundImage: `url(${userinfo.pic_urls[0]})` }}
                onClick={this.goToImageZoom.bind(this, userinfo.pic_urls)}
              />
              <div className="head_pic">
                <img src={userinfo.head_pic} />
              </div>
              <span>{userinfo.name}</span>
              <span className="countNum">
                <span>关注 {userinfo.friends_count}</span>
                 | 
                <span>粉丝 {userinfo.followers_count}</span>
              </span>
              <span />
              <div className="tabBar">
                <span onClick={this.SwitchTab.bind(this)}>关于</span>
                <span onClick={this.SwitchTab.bind(this)}>
                  微博({userinfo.statuses_count})
                </span>
              </div>
            </div>
            <div
              style={{
                backgroundColor: "rgb(240, 240, 240)",
                width: "100%",
                height: 20
              }}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default User;
