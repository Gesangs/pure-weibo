import React, { Component } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import { goBack } from "../../router/route";
import "./style.css"
class Head extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
      }
    render() {
        return(
            <div style={{ top: 0 }} className="Head">
               <div onClick={(e) => {goBack(e)}}>
                 返回
               </div>
               <div>我的收藏</div>
             </div>
        )
    }
}

export default Head;