import React, { Component } from "react";
import { connect } from 'react-redux'
import { Control } from "react-keeper";
import "./style.css";
class Head extends Component {
  constructor() {
    super();
  }
  goToUser() {
    const user = this.props.userinfo.userinfo;
    Control.go(`/user/${user.id}`,{user, show: true})
    setTimeout(() => {
      document.getElementsByClassName("Index")[0].style.display = 'none';
    },200)
  }
  render() {
    return (
        <div style={{ top: 0 }} className="head">
          <div onClick={this.goToUser.bind(this, )}>
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