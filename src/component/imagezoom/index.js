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
        let imagelist = Control.state.imagelist;
        imagelist = imagelist.map((item) => {
            return item.replace('\/orj360\/', "/large/").replace(/wx\d\./, "wx4.")
        })
        this.setState({
            imglist: imagelist
        })
    }
    close = () => {
        Control.go(-1);
    }
    render() {
        const {imglist, current} = this.state
        return (
            <ImageView imagelist={imglist} current={current} close={this.close} />
        )
    }
    
}

export default ImageZoom;