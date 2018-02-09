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
            <img alt="loading" className="load-image" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517995223181&di=4747329cc4938512e32b5adea8a3494f&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01110e57bbc1400000012e7ec358d8.gif" />
        )
    }
}

export default Loading