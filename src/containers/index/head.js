import React, { Component } from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { goToAny } from "../../router/route";
import {Control} from "react-keeper"
import "./style.css";
class Head extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     path: Control.path
  //   }
  // }
  goToUser(e) {
    const user = this.props.userinfo.userinfo;
    goToAny(`/user/${user.id}`,{user}, e);
  }
  render() {
    return (
        <div className="head">
          <div onClick={this.goToUser.bind(this)}>
            <span className="iconfont icon-user"></span>
          </div>
          <div>
            {this.props.headText}
          </div>
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