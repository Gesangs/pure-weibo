import React, { Component } from "react";
import { connect } from "react-redux";
import PureRenderMixin from "react-addons-pure-render-mixin";
import "./style.css";
class Tip extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
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
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Tip);
