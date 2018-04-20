import React, { Component } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import MsgList from "../../component/msglist/index";
import { getAtCommentsAndWeibo } from "../../api/comment"

class AtMeComment extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
  }
  render() {
    const fun = getAtCommentsAndWeibo("comments")
    return <MsgList getNewData={fun} />;
  }
}

export default AtMeComment;
