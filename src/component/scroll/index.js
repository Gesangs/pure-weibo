import React, { Component } from "react";
import PropTypes from 'prop-types'
import PureRenderMixin from "react-addons-pure-render-mixin";
import LoadMore from "../loadmore/index"
import { scrollDisplay } from "../../utils/pullToRefresh";
import "./style.css";

class Scroll extends Component {
  static propTypes = {
    onPullDownRefresh: PropTypes.func,
    onReachBottom: PropTypes.func,
    load_tip: PropTypes.bool,
    children: PropTypes.element
  }

  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.startY = 0;
    this.deltaY = 0;
    this.loadMore = null;
    this.refresh = null;
    this.islock = null;

    this.currentTop = 0;
    this.direction = null;
  }
  componentDidMount() {
    window.addEventListener("scroll", this._isUporDown, false);
    scrollDisplay()
    this.islock = false;
  }

  // 判断滑动方向
  // this.direction > 0 ? "上滑" : "下滑"
  _isUporDown() {
    const scrollY = window.scrollY;
    this.direction = scrollY - this.currentTop;
    this.currentTop = scrollY;
  }



  _handleTouchStart(e) {
    const touch = e.touches[0];
    this.startY = touch.pageY;
  }
  // 下拉刷新
  _onPullDownRefresh() {
    clearTimeout(this.timer);
    this.props.onPullDownRefresh && this.props.onPullDownRefresh();
    this.timer = setTimeout(() => {
      this.refresh.style.transform = `translate3d(-50%,-120px,0)`;
      this.islock = false;
    }, 800);
  }
  _handleTouchMove(e) {
    if(this.direction > 0) return
    const touch = e.touches[0];
    const fun = this.props.onPullDownRefresh;
    if (fun && !this.islock) {
      if (window.scrollY === 0) {
        this.deltaY = (touch.pageY - this.startY) * 0.6;
        if (this.deltaY > 100) this.deltaY = 100;
        if (this.deltaY > 20) {
          this.refresh.style.transform = `translate3d(-50%,${this.deltaY -
            30}px,0)`;
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
    this.refresh.style.transition = `all 0.6s ease`;
    if (this.deltaY !== 100) {
      this.refresh.style.transform = `translate3d(-50%,-120px,0)`;
    }
  }
  render() {
    const { load_tip, onReachBottom } = this.props;
    return (
      <div
        onTouchStart={this._handleTouchStart.bind(this)}
        onTouchMove={this._handleTouchMove.bind(this)}
        onTouchEnd={this._handleTouchEnd.bind(this)}
        className="wrapper"
      >
        <img
          src={`${process.env.PUBLIC_URL}/loading.gif`}
          ref={refresh => {
            this.refresh = refresh;
          }}
          alt="loading"
          className="js-refresh"
        />
        {this.props.children}
        <LoadMore isLoadingMore={ load_tip } loadMoreFn={ onReachBottom } />
      </div>
    );
  }
}

export default Scroll;
