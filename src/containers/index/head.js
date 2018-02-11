import React, { Component } from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { goToAny } from "../../router/route";
import {Control} from "react-keeper"
import "./style.css";
class Head extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  goToUser(e) {
    const user = this.props.userinfo.userinfo;
    goToAny(`/user/${user.id}`,{user}, e);
  }
  render() {
    return (
        <div className="head">
          <div onClick={this.goToUser.bind(this)}>
            用户
          </div>
          <div>全部微博</div>
        </div>
    );
  }
}


function mapStateToProps(state) {
    return {
      userinfo: state.userinfo
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
    }
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Head)