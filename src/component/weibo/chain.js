import React, { Component } from "react";
import PropTypes from 'prop-types'
import PureRenderMixin from "react-addons-pure-render-mixin";
import { handleChain } from "../../api/weibo"
import { stopPro } from "../../router/route"

class Chain extends Component {
  static propTypes = {
    url: PropTypes.array
  }
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      longChain: "",
      shortUrl: props.url
    }
  }

  _loadchain(e){
    stopPro(e)
    const shortUrl = this.state.shortUrl;
    const patt = /miaopai/g;
    const pattt = /https:\/\/www\.miaopai\.com\/show\/([a-zA-Z0-9_-]+)\.htm/g
    handleChain(shortUrl).then((res) => {
        const longChain = res.data.urls["0"];
        const url_long = longChain.url_long;
        // 如果链接可用
          if(longChain.result) {
            // 如果是秒拍视频
            if(patt.test(url_long)) {
              const result = `http://gslb.miaopai.com/stream/${url_long.replace(pattt, "$1")}.mp4`
              this.setState({
                longChain: result
              })
            } else {
              window.open(url_long)
            }
          }
        })
    return false
  }
  

  render() {
    const { longChain, shortUrl } = this.state;
    return (
      <React.Fragment>
        { longChain 
          ? <video controls autoplay name="media" style={{ width: '100%' }} onClick={(e) => {stopPro(e);return false}}>
              <source src={ longChain } type="video/mp4"></source>
            </video> 
          : <a src={ shortUrl } onClick={this._loadchain.bind(this)}> 查看链接</a> }
      </React.Fragment>
    )
  }

}



export default Chain;