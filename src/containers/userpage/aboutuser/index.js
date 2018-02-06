import React, { Component } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import "./style.css";
class AboutUser extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    const userinfo = this.props.userinfo;
    const list = [
      { lable: "签名", content: userinfo.description || "无" },
      { lable: "微博认证", content: userinfo.verified_reason || "无" },
      { lable: "所在地", content: userinfo.location || "无" },
      { lable: "性别", content: userinfo.gender || "无" },
      { lable: "注册时间", content: userinfo.create_time || "无" }
    ];
    return (
      <div>
        {list.map((item, index) => (
          <div className="userinfo" key={index}>
            <span className="infoLable">{item.lable}</span>
            <p className="infoContent">{item.content}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default AboutUser;
