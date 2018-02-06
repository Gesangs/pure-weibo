import React, { Component } from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Weibo from "../component/weibo/index";

class WeiboList extends Component{
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    const weiboList = this.props.weiboList;
    return(
      <div style={{ paddingTop: 1}}>
        {weiboList.map((item, index) => (
          <Weibo weibo={item} key={index} />
        ))}
      </div>
    )
  }
}

export default WeiboList