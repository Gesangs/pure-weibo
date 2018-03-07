import React, { Component } from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin'
import "./style.css"

class Dialog extends Component{
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      visiable: true,
    }
  }
  render() {
    const { visiable } = this.state;
    return 
      { visiable ? <div className="dialog">
        {}
      </div> : ""}
  }
}

export default Dialog