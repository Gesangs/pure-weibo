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
    this.img = null;
  }
  _lazyimg(){
    const top = this.img.getBoundingClientRect().top;
    if (top && top < windowInnerHeight) {
      this.setState({
        isvisiable: true
      })
    }
  }
  componentDidMount(){
    const callback = this._lazyimg.bind(this);
    callback();
    let timeoutId;
    window.addEventListener("scroll", function () {
      if (this.state.isvisiable) {
          return
      }
      if (timeoutId) {
          clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(callback, 100)
    }.bind(this), false);
  }
  goToImageZoom(imgs, index, e) {
    goToAny("/imageZoom", { imagelist: imgs, current: index }, e)
  }
  render() {
    const { imgs } = this.props;
    const { isvisiable } = this.state;
    return (
      <div className="listImg">
        {imgs.map((item, index) => {
          return (
            <div
              className="weiboImg"
              ref={(img) => {this.img = img;}}
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
