import React, { Component } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import Scroll from "../scroll/index";
import Comment from "../comment/index";
import * as api from "../../api/comment";
import { handleCommentList } from "../../utils/class/comment";
class MsgList extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
    this.state = {
      data: [],
      isMore: true
    };
  }
  componentDidMount() {
    this._getNewData();
  }
  _getNewData() {
    const fun = api[this.props.getNewData];
    fun().then(res => {
      const data = res.data.query.results.json;
      const list = data.comments || data.statuses;
      if (!data.total_number) {
        this.setState({
          isMore: false
        });
      } else {
        this.setState({
          data: handleCommentList(list),
          isMore: data.total_number > 50
        });
      }
    });
  }
  _getMoreData() {
    let page = 2;
    const fun = api[this.props.getNewData];
    return fun(page).then(res => {
      const data = res.data.query.results.json;
      const list = data.comments || data.status;
      this.setState({
        data: [...this.state.comments, ...handleCommentList(list)],
        isMore: data.total_number > 50 * page
      });
      page++;
    });
  }
  render() {
    const { data } = this.state;
    return (
      <Scroll
        onReachBottom={this._getMoreData.bind(this)}
        load_tip={this.state.isMore}
      >
        <Comment commentList={data} />
      </Scroll>
    );
  }
}

export default MsgList;
