import React, { Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { windowInnerHeight, windowInnerWidth } from "../../../utils/scroll-position"

const PRELOADNUM = 3;

export class CenterImage extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            loading: true,
            error: false,
            loaded: false
        }
      }

    render(){
        const { loading, error } = this.state,
            { index, current, lazysrc, ...childProps } = this.props,
            img = (<img onLoad={this.onImgLoad.bind(this)}  alt={index} src={lazysrc} {...childProps} />);

        // init first image, others have been preloaded
        if( index === current ){ return img }
        if(loading){ return <Loading /> }
        if(error){ return <Error /> }

        return img;
    }

    componentWillMount() {
        this.loadImg();
    }

    componentWillReceiveProps(nextProps){
        !this.state.loaded && this.loadImg();
    }

    loadImg() {
        const { index, current, lazysrc } = this.props;

        if( lazysrc && index <= current + PRELOADNUM && index >= current - PRELOADNUM ){
            let img = new Image();

            img.src = lazysrc;
            img.onload = () => {
                this.setState({
                    loading: false
                })
            };
            img.onerror = () => {
                this.setState({
                    loading: false,
                    error: true
                })
            };
        }
    }

    onImgLoad(e) {

        this.setState({ loaded: true });

        const target = e.target,
            h = target.naturalHeight,
            w = target.naturalWidth,
            r = h / w,
            height = windowInnerHeight,
            width = windowInnerWidth,
            rate = height / width;
        let top;

        if( r < rate){
            top = height / 2 - (h * width / w) / 2
        }

        target.setAttribute('style', `width:${width}px; top:${top}px;`);
        target.setAttribute('rate', 1/r);
    }
}

const Loading = () => {
    return (
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
    )
}

const Error = () => {
    return (
        <div className="errorpage">加载失败</div>
    )
}
