import React, { Component } from "react";

class Root extends Component {
    constructor() {
        super();
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