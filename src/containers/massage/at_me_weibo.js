import React, { Component } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import MsgList from "../../component/msglist/index";
class AtMeWeibo extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
  }
  render() {
    return <MsgList getNewData={"getAtMeWeibo"} />;
  }
}

export default AtMeWeibo;
