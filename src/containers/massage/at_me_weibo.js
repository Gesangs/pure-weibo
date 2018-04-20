import React, { Component } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import MsgList from "../../component/msglist/index";
import { getAtCommentsAndWeibo } from "../../api/comment"

class AtMeWeibo extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
  }
  render() {
    const fun = getAtCommentsAndWeibo("statuses")
    return <MsgList getNewData={fun} />;
  }
}

export default AtMeWeibo;
