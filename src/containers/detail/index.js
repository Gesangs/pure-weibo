import React, { Component } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import { getWeiBoDetail } from "../../api/weibo";
import { getComments } from "../../api/comment";
import { handleCommentList } from "../../utils/class/comment";
import { handleWeibo } from "../../utils/class/weibo";
import { Control } from "react-keeper";

import Head from "./head";
import Foot from "./foot";
import Weibo from "../../component/weibo/index";
import Comment from "../../component/comment/index";
import Scroll from "../../component/scroll/index";

class Detail extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
    this.state = {
      weibo: Control.state.weibo || {},
      commentList: [],
      isMore: true
    };
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
  _getComments() {
    const id = this.props.params.id;
    getComments(id).then(res => {
      const data = res.data;
      this.setState({
        commentList: handleCommentList(data.comments),
        isMore: data.total_number > 50
      });
    });
  }
  _getMoreComments() {
    if(!this.state.isMore) return
    let page = 2;
    const id = this.props.params.id;
    return getComments(id, page).then(res => {
      const commentList = handleCommentList(res.data.comments);
      this.setState({
        commentList: [...this.state.commentList, ...commentList],
        isMore: res.data.total_number > page * 50
      });
      page++;
    });
  }
  render() {
    const { commentList, weibo, isMore } = this.state;
    return (
      <div className="detail">
        <Head />
        <Scroll
          onPullDownRefresh={this._getComments.bind(this)}
          onReachBottom={this._getMoreComments.bind(this)}
          load_tip={isMore}
        >
          <Weibo weibo={this.state.weibo} />
          <div
            style={{
              backgroundColor: "rgb(240, 240, 240)",
              width: "100%",
              height: 20
            }}
          />
          <Comment commentList={commentList} />
        </Scroll>
        <Foot />
      </div>
    );
  }
}

export default Detail;
