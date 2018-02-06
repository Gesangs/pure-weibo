import React, { Component } from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from "react-redux";
import { Control } from "react-keeper";
import * as api from "../../api/comment"
import "./style.css"

class Post extends Component{
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            value: "",
            dataUrl: '',
            pic: null,
            file: null,
        }
    }
    handleChange(e) {
        if(this.state.value.length !== 140){
            this.setState({
                value:e.target.value,
            })
        } 
    }
    Submit(){
        const value = this.state.value
        const id = Control.state.id;
        api.create_comment(value, id).then((res) => {
            console.log(res);
        })
    }
    selectImg() {
        this.refs.inputer.click();
    }
    closeImage() {
        this.imgPreview(null)
    }
    imgPreview(file) {
        let self = this;
        // 看支持不支持FileReader
        if (!file || !window.FileReader) {
            this.setState({
                dataUrl: ""
            })
            return
        }
        var reader = new FileReader()
        // 将图片将转成 base64 格式
        reader.readAsDataURL(self.state.file)
        // 读取成功后的回调
        reader.onloadend = function () {
            self.setState({
                dataUrl: this.result
            })
        }
    }
    imageChange(e) {
        let inputDOM = this.refs.inputer;
        this.state.file = inputDOM.files[0];
        this.imgPreview(this.state.file)
    }
    render() {
        const user = this.props.userinfo.userinfo;
        const {value, dataUrl} = this.state;
        return(
            <div className="post">
                <div className="postHead">
                    <img src={user.head_pic} />
                    <div>
                    <span>{Control.state.title}</span>
                    <div style={{fontSize: 11}}>{user.name}</div>
                    </div>
                </div>
                <form>
                    <textarea 
                     value={value} 
                     onChange={this.handleChange.bind(this)}
                     placeholder={Control.state.preText} 
                      />
                </form>
                <div className="status-image">
                    {dataUrl 
                    ? <div className="image-img">
                        <div  className="img" style={{backgroundImage :`url(${dataUrl})`}}>
                            <div  onClick={this.closeImage.bind(this)} className="image-close">
                                <svg className="close-icon" viewBox="0 0 46 72" style={{display: "inline-block", fill: "currentcolor", position: "relative", userSelect: "none", verticalAlign: "text-bottom"}}><g><path d="M27.243 36l14.879-14.879a2.998 2.998 0 0 0 0-4.242 2.998 2.998 0 0 0-4.242 0L23 31.758 8.122 16.879a2.998 2.998 0 0 0-4.242 0 2.998 2.998 0 0 0 0 4.242L18.758 36 3.879 50.879A2.998 2.998 0 0 0 6.001 56a2.99 2.99 0 0 0 2.121-.879L23 40.242l14.879 14.879A2.991 2.991 0 0 0 40 56a2.998 2.998 0 0 0 2.121-5.121L27.243 36z"></path></g></svg>
                            </div>
                        </div> 
                        <div className="image-select" onClick={this.selectImg.bind(this)}></div>
                      </div> 
                    : ""}
                    <input type="file" style={{display:"none"}} onChange={this.imageChange.bind(this)}  ref="inputer" accept="image/*" />
                </div>
                <div className="footBar">
                    <label htmlFor="cBox"><input type="checkbox" id="cBox" />同时转发到我的微博</label>
                    <div className="left-bar">
                        {value.length}/140
                        <span>公开</span>
                    </div>
                </div>
                <div className="postFoot">
                    <div onClick={this.selectImg.bind(this)}>图片</div>
                    <div>表情</div>
                    <div onClick={this.Submit.bind(this)}>发布</div>
                </div>
            </div>
        )
    }

}


function mapStateToProps(state) {
    return {
      userinfo: state.userinfo
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
    }
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Post)

// export default Post