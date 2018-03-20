import React, { Component } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import { goToAny } from "../../router/route";

const windowInnerHeight =
      window.screen.height ||
      window.innerHeight ||
      document.documentElement.clientHeight;

class ListImg extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      isvisiable: false
    }
    this.imgArea = null;
    this.callback = null;
  }
  _lazyimg(){
    if (this.state.isvisiable) {
      return
    }
    const top = this.imgArea.getBoundingClientRect().top;
    if (top && top < windowInnerHeight) {
      this.setState({
        isvisiable: true
      })
    }
  }
  _debounce(fn, duration) {
    let timer = null;
    return () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn()
      }, duration)
    }
  }
  componentDidMount(){
    this._lazyimg()
    this.callback = this._debounce(this._lazyimg.bind(this), 100);
    window.addEventListener("scroll", this.callback, false);
  }
  componentWillUnmount(){
    window.removeEventListener("scroll", this.callback);
  }
  
  goToImageZoom(imgs, index, e) {
    goToAny("/imageZoom", { imagelist: imgs, current: index }, e)
  }
  render() {
    const { imgs } = this.props;
    const { isvisiable } = this.state;
    return (
      <div className="listImg" ref={(img) => {this.imgArea = img;}}>
        {imgs.map((item, index) => {
          return (
            <div
              className="weiboImg"
              key={index}
              style={{ backgroundImage: `url(${isvisiable ? item : ""})` }}
              onClick={this.goToImageZoom.bind(this, imgs, index)}
            />
          );
        })}
      </div>
    );
  }
}

export default ListImg;
