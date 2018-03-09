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
            <div style={{ top: 0 }} className="detailHead">
               <div onClick={(e) => {goBack(e)}}>
                <span className="iconfont icon-fanhui"></span>
               </div>
               <div>微博正文</div>
             </div>
        )
    }
}

export default Head;