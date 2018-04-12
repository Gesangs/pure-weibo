import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as tipActionsFromOtherFile from "../../store/action/tip";
import PureRenderMixin from "react-addons-pure-render-mixin";
import "./style.css";
class Tip extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  componentWillReceiveProps(newprops){
    if(newprops.tip.tip){
      setTimeout(() => {
        this.props.tipActions.setText({
            tip: ""
        });
        console.log("ssss")
      }, 3000);
    } 
  }
  render() {
    const tip = this.props.tip.tip;
    return <div className={`${tip ? "Tip Tip-animation" : "Tip"}`}>
            {tip}
           </div>;
  }
}

function mapStateToProps(state) {
  return {
    tip: state.tip
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tipActions: bindActionCreators(tipActionsFromOtherFile, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Tip);
