import React, { Component } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import { getUserWeiBo } from "../../api/weibo";
import { handleWeiboList } from "../../utils/class/weibo";
import { Control } from "react-keeper";

import User from "../../component/userpage/user/index";
import AboutUser from "../../component/userpage/aboutuser/index";
import WeiboList from "../../component/weibolist";

class UserPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      weiboList: [],
      userinfo: Control.state.user || {},
      showList: false
    };
    this.isUserId = localStorage.getItem("uid") == Control.state.user.id;
  }
  componentDidMount() {
    const id = this.state.userinfo.id;
    if (this.isUserId) {
      getUserWeiBo(id).then(res => {
        this.setState({
          weiboList: handleWeiboList(res.data.statuses)
        });
      });
    }
  }
  SwitchTab = () => {
    if (!this.isUserId) return;
    this.setState({
      showList: !this.state.showList
    });
  }
  render() {
    const { weiboList, userinfo, showList } = this.state;
    return (
      <div className="UserPage">
        <User userinfo={userinfo} isUserId={this.isUserId} SwitchTab={this.SwitchTab} />
        {showList ? (
          <WeiboList weiboList={weiboList} />
        ) : (
          <AboutUser userinfo={userinfo} />
        )}
      </div>
    );
  }
}

export default UserPage;
