import React, { Component } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import { stopPro } from "../../utils/stopPro";
import { Control } from "react-keeper";
class ListImg extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
    this.state = {
      isFull: false
    };
  }
  goToImageZoom(imgs, index, e) {
    stopPro(e);
    Control.go("/imageZoom", { imagelist: imgs, current: index });
  }
  render() {
    const imgs = this.props.imgs;
    return (
      <div className="listImg">
        {imgs.map((item, index) => {
          const imgUrl = item.thumbnail_pic
            .replace(/wx1\./, "wx2.")
            .replace(/thumbnail/, "orj360");
          return (
            <div
              className="weiboImg"
              key={index}
              style={{ backgroundImage: `url(${imgUrl})` }}
              onClick={this.goToImageZoom.bind(this, imgs, index)}
            />
          );
        })}
      </div>
    );
  }
}

export default ListImg;
