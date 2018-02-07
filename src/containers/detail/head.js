import React, { Component } from "react";
import { goBack } from "../../router/route";
import "./style.css"
class Head extends Component {
    constructor() {
        super()
    }
    render() {
        return(
            <div style={{ top: 0 }} className="detailHead">
               <div onClick={(e) => {goBack(e)}}>
                 返回
               </div>
               <div>微博正文</div>
             </div>
        )
    }
}

export default Head;