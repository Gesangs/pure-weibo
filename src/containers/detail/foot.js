import React, { Component } from "react";
import { Control } from "react-keeper";
import "./style.css"
class Foot extends Component {
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
            <div className="detailFoot">
               <span>笔</span>
               <div>说点什么吧...</div>
             </div>
        )
    }
}

export default Foot;