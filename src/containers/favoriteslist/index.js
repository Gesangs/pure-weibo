import React, { Component } from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin'
import WeiboFlow from "../weiboflow/index"

class Favorites extends Component {
    constructor(props, context){
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
     render(){
         return(
             <WeiboFlow getNewWeiBo={"getFavoritesWeiBo"} apistr={"data.favorites[0].status"} />
         )
     }
}

export default Favorites;