import React, { Component } from "react";
import PropTypes from 'prop-types'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Content from "../../component/weibo/content"
import { goToAny } from "../../router/route"
import "./style.css"
class Comment extends Component {

    static propTypes = {
        id: PropTypes.number.isRequired,
        commentList: PropTypes.array.isRequired,
    }
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.UserId = localStorage.getItem("uid")
    }
    goToUser(user, e) {
        goToAny(`/user/${user.id}`, { user }, e)
    }
    goToReply(name, cid, e){
        const id = this.props.id;
        goToAny("/post", {
            id,
            cid,
            title: "回复评论",
            preText: `回复${name}`,
            fun: "reply_comment"
        }, e)
    }
    goToDetail(weibo, e) {
        goToAny(`/detail/${weibo.id}`, { weibo }, e)
    }
    render() {
        const comments = this.props.commentList;
        return(
            <div>
                {comments.map((item, index) => {
                    const isUserId = this.UserId == item.user.id;
                    return <div className="commentList" key={item.id}  onClick={this.goToDetail.bind(this, item.status)}>
                        <div className="listHead">
                            <img alt="head" src={item.user.head_pic} className="listPic" onClick={this.goToUser.bind(this, item.user)} />
                            <div className="listNameS">
                                <span className="listName" onClick={this.goToUser.bind(this, item.user)}>{item.user.name}</span>
                                <div className="listSource">
                                {item.create_time}
                                {item.source ? "  来自  " : ""}
                                {item.source}
                                </div>
                            </div>
                            {isUserId
                             ? ""
                             : <div className="reply" onClick={this.goToReply.bind(this, item.user.name, item.id)}>
                                  <span className="iconfont icon-comment"></span>
                               </div>
                            }
                        </div>
                        <Content con={item.content} />
                        {item.reply_content 
                        ? <div className="reply_comment">
                            <Content con={item.reply_content} />
                        </div> 
                        : ""}
                    </div>
                })}
            </div>
        )
    }
}

export default Comment

