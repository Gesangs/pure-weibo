import React, { Component } from "react";
import PropTypes from 'prop-types'
import PureRenderMixin from "react-addons-pure-render-mixin";
import { getComments } from "../../api/comment";
import { handleCommentList } from "../../utils/class/comment";
import { Control } from "react-keeper";
import {commnetCount} from "../../config/config"

// import { getWeiBoDetail } from "../../api/weibo";
// import { handleWeibo } from "../../utils/class/weibo";

import Head from "./head";
import Foot from "./foot";
import Weibo from "../../component/weibo/index";
import Comment from "../../component/comment/index";
import Scroll from "../../component/scroll/index";

class Detail extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired
  }
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      weibo: Control.state.weibo || {},
      commentList: [],
      isMore: true
    };
    this.page = 2;
  }
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  componentDidMount() {
    // const id = this.props.params.id;
    // getWeiBoDetail(id).then((res) => {
    //     this.setState({
    //         weibo: handleWeibo(res.data.statuses)
    //     })
    //     console.log(res.data)
    // })
    this._getComments();
  }
  _getComments = () => {
    const id = this.props.params.id;
    getComments(id).then(res => {
      const data = res.data;
      this.setState({
        commentList: handleCommentList(data.comments),
        isMore: data.total_number > commnetCount
      });
    });
  }
  _getMoreComments = () => {
    if(!this.state.isMore) return
    const id = this.props.params.id;
    getComments(id, this.page).then(res => {
      const commentList = handleCommentList(res.data.comments);
      this.setState({
        commentList: [...this.state.commentList, ...commentList],
        isMore: res.data.total_number > this.page * commnetCount
      });
      this.page++;
    });
  }
  render() {
    const { commentList, weibo, isMore } = this.state;
    return (
      <div className="detail">
        <Head />
        <Scroll
          onPullDownRefresh={this._getComments}
          onReachBottom={this._getMoreComments}
          load_tip={isMore}
        >
          <Weibo weibo={weibo} />
          <div
            style={{
              backgroundColor: "rgb(240, 240, 240)",
              width: "100%",
              height: 20
            }}
          />
          <Comment commentList={commentList} id={weibo.id} />
        </Scroll>
        <Foot id={weibo.id} />
      </div>
    );
  }
}

export default Detail;
