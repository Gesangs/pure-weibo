import React, { Component } from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ListImg  from "./listimg";
import Content from "./content";
import {goToAny} from "../../router/route"
import "./style.css";


class Weibo extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  goToUser(user, e) {
    goToAny(`/user/${user.id}`, { user }, e)
  }
  goToDetail(weibo, e) {
    goToAny(`/detail/${weibo.id}`, { weibo }, e)
  }
  goToPost(id, e) {
    goToAny(`/post`, {
      id,
      title: "发评论",
      preText: "说点什么吧..."
    }, e)
  }
  render() {
    const { weibo } = this.props;
    return (
      <div className="list" onClick={this.goToDetail.bind(this, weibo)}>
        <div className="listHead">
          <img alt="head" src={weibo.user.head_pic} className="listPic" onClick={this.goToUser.bind(this, weibo.user)} />
          <div className="listNameS">
            <span className="listName" onClick={this.goToUser.bind(this, weibo.user)}>{weibo.user.name}</span>
            <div className="listSource">
              {weibo.time}
              {weibo.source ? "  来自  " : ""}
              {weibo.source}
            </div>
          </div>
        </div>
        <div className="listContent">
          <Content con={weibo.content} />
          {weibo.pic_urls ? <ListImg imgs={weibo.pic_urls} /> : ""}
        </div>
        {/* 转发的微博 */}
        {weibo.retweeted_status ? (
          <div className="retWeibo" onClick={this.goToDetail.bind(this, weibo.retweeted_status)}>
            <div className="retContent">
              <div>
                <a onClick={this.goToUser.bind(this, weibo.retweeted_status.user)}>@{weibo.retweeted_status.user.name}</a>:{" "}
                <Content con={weibo.retweeted_status.content} />
              </div>
              {weibo.retweeted_status.pic_urls ? (
                <ListImg imgs={weibo.retweeted_status.pic_urls} />
              ) : (
                ""
              )}
            </div>
            <div className="retFoot">
              转发{weibo.retweeted_status.reposts_count} |{" "}
              评论{weibo.retweeted_status.comments_count} |{" "}
              点赞{weibo.retweeted_status.attitudes_count}
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="listFoot">
          <div>
            <span className="iconfont icon-zhuanfa"></span>
            {weibo.reposts_count}
          </div>
          <div onClick={this.goToPost.bind(this, weibo.id)}>
            <span className="iconfont icon-comment"></span>
            {weibo.comments_count}
          </div>
          <div>
            <span className="iconfont icon-dianzan"></span>
            {weibo.attitudes_count}
          </div>
        </div>
      </div>
    );
  }
}

export default Weibo;
