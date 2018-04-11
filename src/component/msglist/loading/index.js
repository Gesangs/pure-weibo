import React, { Component } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import "./style.css"
class Loading extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
      }
    render() {
        return (
            <img alt="loading" className="load-image" src={`${process.env.PUBLIC_URL}/timg.gif`} />
        )
    }
}

export default Loading