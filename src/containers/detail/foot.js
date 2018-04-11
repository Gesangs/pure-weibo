import React, { Component } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import {goToAny} from "../../router/route"
import "./style.css"
class Foot extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
      }
      goToPost(e) {
        const id = this.props.id;
        goToAny(`/post`, {
          id,
          title: "发评论",
          preText: "说点什么吧...",
          fun: "create_comment"
        }, e)
      }
    render() {
        return(
            <div className="detailFoot" onClick={this.goToPost.bind(this)}>
               <span className="iconfont icon-tianxie"></span>
               <span>说点什么吧...</span>
            </div>
        )
    }
}

export default Foot;