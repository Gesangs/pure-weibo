import React, { Component } from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { scrollDisplay } from "../../utils/pullToRefresh";
import "./style.css";

const windowInnerHeight =
      window.screen.height ||
      window.innerHeight ||
      document.documentElement.clientHeight;

class Scroll extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
      this.startY = 0
      this.deltaY = 0
      this.loadMore = null;
      this.refresh = null;
      this.islock = null;
  }
  componentDidMount() {
    scrollDisplay();
    this.islock = false;
  }

  _handleTouchStart(e) {
    const touch = e.touches[0];
    this.startY = touch.pageY
  }
  // 下拉刷新
  _onPullDownRefresh() {
    clearTimeout(this.timer);
    this.props.onPullDownRefresh();
    this.timer = setTimeout(() => {
      this.refresh.style.transform = `translate3d(-50%,-120px,0)`;
      this.islock = false;
    }, 800);
  }
  // 上拉加载
  _onReachBottom() {
    if(!this.props.onReachBottom) return
    const top = this.loadMore.getBoundingClientRect().top;
    if (top && top < windowInnerHeight && this.props.load_tip) {
      this.props.onReachBottom();
    }
  }
  _handleTouchMove(e) {
    const touch = e.touches[0];
    const fun = this.props.onPullDownRefresh;
    if(fun && !this.islock) {
      if(window.scrollY === 0){
        this.deltaY = (touch.pageY - this.startY) * 0.6;
        if (this.deltaY > 100) this.deltaY = 100;
        if (this.deltaY > 20) {
          this.refresh.style.transform = `translate3d(-50%,${this.deltaY - 30}px,0)`;
          this.refresh.style.transition = `all 0s ease`;
        }
        if (this.deltaY === 100) {
          this.islock = true;
          this._onPullDownRefresh();
        }
      }
    }
  }
  _handleTouchEnd(e) {
    if(this.deltaY > 10) this._onReachBottom();
    this.refresh.style.transition = `all 0.6s ease`;
    if (this.deltaY !== 100) {
      this.refresh.style.transform = `translate3d(-50%,-120px,0)`;
    }
  }
  render() {
    return (
      <div
        onTouchStart={this._handleTouchStart.bind(this)}
        onTouchMove={this._handleTouchMove.bind(this)}
        onTouchEnd={this._handleTouchEnd.bind(this)}
        className="wrapper">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517909301015&di=e5569ac662b38490d775e512d06bf3cb&imgtype=0&src=http%3A%2F%2Fwww.carmenor.com%2Fqqwebhimgs%2Fuploads%2Fbd4064715.jpg"
             ref={(refresh) => {this.refresh = refresh}}
             className="refresh" />
        {this.props.children}
        <div
          className="loadMore"
          ref={(loadMore) => {this.loadMore = loadMore}}
          onClick={this._onReachBottom.bind(this)}>
          {this.props.load_tip ? "加载更多" : "没有更多了~"}
        </div>
      </div>
    );
  }
}

export default Scroll;
