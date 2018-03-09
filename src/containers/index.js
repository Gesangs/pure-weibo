import React, { Component } from "react";
import { Control } from "react-keeper";
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
            </div>
        )
    }
}

export default Root