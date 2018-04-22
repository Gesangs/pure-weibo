import React, { Component } from "react";
import PropTypes from 'prop-types'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Weibo from "../component/weibo/index";

class WeiboList extends Component{
  static propTypes = {
    weiboList: PropTypes.array
  }
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    const weiboList = this.props.weiboList;
    return(
      <div style={{ paddingTop: 1}}>
        {weiboList.map((item, index) => 
          item ? (<Weibo weibo={item} key={item.id} />) : ""
        )}
      </div>
    )
  }
}

export default WeiboList