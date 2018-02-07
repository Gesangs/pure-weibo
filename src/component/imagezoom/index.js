import React, { Component } from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ImageView from './react-imageviewer/index'
import { Control } from "react-keeper";

class ImageZoom extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            imglist: [],
            current: Control.state.current || 0
        }
    }
    componentWillMount(){
        const List = [];
        const imagelist = Control.state.imagelist;
        if(imagelist[0].thumbnail_pic) {
            console.log()
            imagelist.map((item) =>{
                let imgurl = item.thumbnail_pic.replace("thumbnail", "large")
                List.push(imgurl);
            })
            this.setState({
                imglist: List
            })
        } else {
            this.setState({
                imglist: imagelist
            })
        }
    }
    close() {
        Control.go(-1);
    }
    render() {
        const {imglist, current} = this.state
        console.log(imglist)
        return (
            <ImageView imagelist={imglist} current={current} close={this.close.bind(this)} />
        )
    }
    
}

export default ImageZoom;