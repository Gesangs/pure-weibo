import React, { Component } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import { goToAny } from "../../router/route";
class ListImg extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  goToImageZoom(imgs, index, e) {
    goToAny("/imageZoom", { imagelist: imgs, current: index }, e)
  }
  render() {
    const imgs = this.props.imgs;
    console.log(imgs)
    return (
      <div className="listImg">
        {imgs.map((item, index) => {
          return (
            <div
              className="weiboImg"
              key={index}
              style={{ backgroundImage: `url(${item})` }}
              onClick={this.goToImageZoom.bind(this, imgs, index)}
            />
          );
        })}
      </div>
    );
  }
}

export default ListImg;
