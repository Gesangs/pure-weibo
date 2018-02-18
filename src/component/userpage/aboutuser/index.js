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
      { lable: "签名", content: userinfo.description },
      { lable: "微博认证", content: userinfo.verified_reason },
      { lable: "所在地", content: userinfo.location },
      { lable: "性别", content: userinfo.gender },
      { lable: "注册时间", content: userinfo.create_time }
    ];
    return (
      <React.Fragment>
        {list.map((item, index) => {
          return item.content 
            ? <div className="userinfo" key={index}>
            <span className="infoLable">{item.lable}</span>
            <p className="infoContent">{item.content}</p>
          </div> : ""
      })}
      </React.Fragment>
    );
  }
}

export default AboutUser;
