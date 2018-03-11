import React, { Component } from "react";
import { connect } from 'react-redux'
import { goToAny } from "../../router/route";
import "./style.css";
class Head extends Component {
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