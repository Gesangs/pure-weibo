import React, { Component } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
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
    goToAny("/imageZoom", { imagelist: imgs }, e)
  }
  goToFavorites(e) {
    goToAny("/favorites", {}, e)
  }
  render() {
    const {userinfo, isUserId} = this.props;
    return (
      <React.Fragment>
        {userinfo ? (
          <div className="User">
            <div className="headBar" onClick={(e) => {goBack(e)}}>
              <span className="iconfont icon-fanhui"></span>
            </div>
            <div className="userHeader">
              <div
                className="coverImg"
                style={{ backgroundImage: `url(${userinfo.pic_urls[0]})` }}
                onClick={this.goToImageZoom.bind(this, userinfo.pic_urls)}
              />
              <div className="head_pic">
                <img alt="head" src={userinfo.head_pic} />
              </div>
              <span>{userinfo.name}</span>
              <span className="countNum">
                <span>关注 {userinfo.friends_count}</span>
                 {" | "}
                <span>粉丝 {userinfo.followers_count}</span>
                {isUserId
                 ? <div className="favoritesBtn" onClick={this.goToFavorites.bind(this)}>我的收藏</div>
                 : ""}
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
      </React.Fragment>
    );
  }
}

export default User;
