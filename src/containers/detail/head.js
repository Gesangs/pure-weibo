import React, { Component } from "react";
import { Control } from "react-keeper";
import "./style.css"
class Head extends Component {
    constructor() {
        super()
    }
    goBack() {
        Control.go(-1);
        setTimeout(() => {
          document.getElementsByClassName("Index")[0].style.display = "block";
        }, 200);
      }
    render() {
        return(
            <div style={{ top: 0 }} className="detailHead">
               <div onClick={this.goBack.bind(this)}>
                 返回
               </div>
               <div>微博正文</div>
             </div>
        )
    }
}

export default Head;