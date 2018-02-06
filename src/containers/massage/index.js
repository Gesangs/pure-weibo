import React, { Component } from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link } from "react-keeper"
import "./style.css"

class Massage extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
      }
    render() {
        return (
            <div className="Massage">
                <div className="MassageBar">
                    <Link type="div" to="/massage/at_me_weibo" activeClassName="activeClass">@我的微博</Link>
                    <Link type="div" to="/massage/at_me_comment" activeClassName="activeClass">@我的评论</Link>
                    <Link type="div" to="/massage" activeClassName="activeClass">收到的评论</Link>
                    <Link type="div" to="/massage/comment_by_me" activeClassName="activeClass">发出的评论</Link>
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default Massage