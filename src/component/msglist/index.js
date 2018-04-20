import React, { Component } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import Scroll from "../scroll/index";
import Loading from "./loading/index"
import Comment from "../comment/index";
import { handleCommentList } from "../../utils/class/comment";
import { handleWeiboList } from "../../utils/class/weibo"
import { commnetCount } from "../../config/config"

class MsgList extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      data: "",
      isMore: true
    };
    this.handlefun = this.props.getNewData === "getAtMeWeibo" ? handleWeiboList : handleCommentList
  }
  componentDidMount() {
    this._getNewData();
  }
  _getNewData() {
    const fun = this.props.getNewData;
    fun().then(res => {
      const data = res.data;
      const list = data.comments || data.statuses;
      if (!data.total_number) {
        this.setState({
          data: [],
          isMore: false
        });
      } else {
        this.setState({
          data: this.handlefun(list),
          isMore: data.total_number > commnetCount
        });
      }
    });
  }
  _getMoreData = () => {
    let page = 2;
    const fun = this.props.getNewData;
    return fun(page).then(res => {
      const data = res.data.query.results.json;
      const list = data.comments || data.statuses;
      this.setState({
        data: [...this.state.data, ...this.handlefun(list)],
        isMore: data.total_number > commnetCount * page
      });
      page++;
    });
  }
  render() {
    const { data, isMore } = this.state;
    return (
      <Scroll
        onReachBottom={this._getMoreData}
        load_tip={isMore}>
        {data ? <Comment commentList={data} /> : <Loading />}
      </Scroll>
    );
  }
}

export default MsgList;
