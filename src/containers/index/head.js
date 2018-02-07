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
    const patt=/(\/massage|\/hot|^\/$)/g;
    return (
      <div style={{ display: `${patt.test(Control.path) ? "block" : "none"}` }}>
        <div className="head">
          <div onClick={this.goToUser.bind(this, )}>
            用户
          </div>
          <div>全部微博</div>
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