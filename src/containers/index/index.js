import React, { Component } from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getEmotions } from "../../api/weibo";
import { getUserMsg } from "../../api/user";
import { handleUser } from "../../utils/class/user";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userinfoActionsFromOtherFile from "../../action/userinfo";
import * as emotionActionsFromOtherFile from "../../action/emotion";

import Head from "./head";
import Foot from "./foot";

class Index extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      currentTag: ""
    }
  }
  componentDidMount() {
    getEmotions().then(res => {
      this.props.emotionActions.update({
        emotion: res.data
      });
    });
    getUserMsg().then((res) => {
      this.props.userinfoActions.update({
        userinfo: handleUser(res.data) 
      });
    })
  }
  render() {
    return (
      <div className="Index">
        <Head />
        {this.props.children}
        <Foot />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    emotionActions: bindActionCreators(emotionActionsFromOtherFile, dispatch),
    userinfoActions: bindActionCreators(userinfoActionsFromOtherFile, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);
