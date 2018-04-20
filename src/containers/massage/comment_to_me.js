import React, { Component } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import MsgList from "../../component/msglist/index";
import { getCommentsByAndToMe } from "../../api/comment"

class CommentToMe extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
  }
  render() {
    const fun = getCommentsByAndToMe("to")
    return <MsgList getNewData={fun} />;
  }
}

export default CommentToMe;
