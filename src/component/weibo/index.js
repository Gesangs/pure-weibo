import React, { Component } from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ListImg  from "./listimg";
import Content from "./content";
import { stopPro } from "../../utils/stopPro"
import { Control } from "react-keeper";
import "./weibo.css";


class Weibo extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  goToUser(user, e) {
    stopPro(e)
    Control.go(`/user/${user.id}`, { user })
    setTimeout(() => {
      document.getElementsByClassName("Index")[0].style.display = 'none';
    },200)
  }
  goToDetail(weibo, e) {
    stopPro(e)
    Control.go(`/detail/${weibo.id}`, { weibo })
    setTimeout(() => {
      document.getElementsByClassName("Index")[0].style.display = 'none';
    },200)
  }
  goToPost(id, e) {
    stopPro(e)
    Control.go(`/post`, { id })
    setTimeout(() => {
      document.getElementsByClassName("Index")[0].style.display = 'none';
    },200)
  }
  render() {
    const { weibo } = this.props;
    return (
      <div className="list" onClick={this.goToDetail.bind(this, weibo)}>
        <div className="listHead">
          <img src={weibo.user.head_pic} className="listPic" onClick={this.goToUser.bind(this, weibo.user)} />
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
          {weibo.pic_urls.length ? <ListImg imgs={weibo.pic_urls} /> : ""}
        </div>
        {/* 转发的微博 */}
        {weibo.retweeted_status ? (
          <div className="retWeibo" onClick={this.goToDetail.bind(this, weibo.retweeted_status)}>
            <div className="retContent">
              <div>
                <a onClick={this.goToUser.bind(this, weibo.retweeted_status.user)}>@{weibo.retweeted_status.user.name}</a>:{" "}
                <Content con={weibo.retweeted_status.content} />
              </div>
              {weibo.retweeted_status.pic_urls.length ? (
                <ListImg imgs={weibo.retweeted_status.pic_urls} />
              ) : (
                ""
              )}
            </div>
            <div className="retFoot">
              {weibo.retweeted_status.reposts_count} |{" "}
              {weibo.retweeted_status.comments_count} |{" "}
              {weibo.retweeted_status.attitudes_count}
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="listFoot">
          <div>{weibo.reposts_count}</div>
          <div onClick={this.goToPost.bind(this, weibo.id)}>{weibo.comments_count}</div>
          <div>{weibo.attitudes_count}</div>
        </div>
      </div>
    );
  }
}

export default Weibo;
