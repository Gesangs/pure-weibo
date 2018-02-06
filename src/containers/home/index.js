import React, { Component } from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin'
import WeiboList from "../weiboflow/index"

class Home extends Component {
    constructor(props, context){
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
     render(){
         return(
             <WeiboList getNewWeiBo={"getNewWeiBo"} />
         )
     }
}

export default Home;