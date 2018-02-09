import React, { Component } from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Content from "../../component/weibo/content"
import { goToAny } from "../../router/route"
import "./style.css"
class Comment extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    goToUser(user, e) {
        goToAny(`/user/${user.id}`, { user }, e)
      }
    render() {
        const comments = this.props.commentList;
        return(
            <div style={{zIndex:4}}>
            {comments.map((item, index) => (
                <div className="commentList" key={index}>
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
                    </div>
                    <Content con={item.content} />
                    {item.reply_content 
                    ? <div className="reply_comment">
                        <Content con={item.reply_content} />
                    </div> 
                    : ""}
                </div>
            ))}
            </div>
        )
    }
}

export default Comment

