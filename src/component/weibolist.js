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
      <div style={{ paddingTop: 1}} id="weibolist">
        {weiboList.map((item, index) => 
          item ? (<Weibo weibo={item} key={item.id} />) : ""
        )}
      </div>
    )
  }
}

export default WeiboList