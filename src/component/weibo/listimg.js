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
    return (
      <div className="listImg">
        {imgs.map((item, index) => {
          let imgUrl = `${item.thumbnail_pic || item}`.replace('\/thumbnail\/', "/orj360/")
          .replace(/wx\d\./, "wx2.");
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
