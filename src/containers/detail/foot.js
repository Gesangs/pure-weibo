import React, { Component } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import "./style.css"
class Foot extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
      }
    render() {
        return(
            <div className="detailFoot">
               <span className="iconfont icon-tianxie"></span>
               <span>说点什么吧...</span>
            </div>
        )
    }
}

export default Foot;