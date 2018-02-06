import React, { Component } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import MsgList from "../../component/msglist/index";
class CommentToMe extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
  }
  render() {
    return <MsgList getNewData={"getCommentsToMe"} />;
  }
}

export default CommentToMe;
