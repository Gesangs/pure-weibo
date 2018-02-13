import React, { Component } from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin'
import "./style.css"

class Dialog extends Component{
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return(
        <div className="dialogBag">
            <div className="dialog">
                <div>收藏</div>
                <div>查看原微博</div>
                <div>回复</div>
                <div>转发</div>
            </div>
        </div>
    )
  }
}

export default Dialog