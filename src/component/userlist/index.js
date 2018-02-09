import React, { Component } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";

class UserList extends Component{
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            
        }
    }
    render(){
        return(
            <div>
                {<div className="listHead">
                    <img alt="head" src={user.head_pic} className="listPic" onClick={this.goToUser.bind(this, user)} />
                    <div className="listNameS">
                        <span className="listName" onClick={this.goToUser.bind(this, weibo.user)}>{user.name}</span>
                        <div className="listSource">
                            {user.description}
                        </div>
                    </div>
                </div>}
            </div>
        )
    }
}

export default UserList