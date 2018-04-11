import React, { Component } from "react";
import { Control } from "react-keeper";
import Tip from "./tip/index"
import "../iconfont/iconfont.css"

class Root extends Component {
    constructor() {
        super();
    }
    componentDidMount(){
        Control.go("/index")
    }
    render() {
        return (
            <div>
                {this.props.children}
                <Tip />
            </div>
        )
    }
}

export default Root