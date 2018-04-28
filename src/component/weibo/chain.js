import React, { Component } from "react";
import PropTypes from 'prop-types'
import PureRenderMixin from "react-addons-pure-render-mixin";
import { getVideo } from "../../api/weibo"
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
    getVideo(shortUrl).then((res) => {
        const videoUrl = res.data.video;
        // 如果是视频链接
          if(videoUrl) {
            this.setState({
              longChain: videoUrl
            })
          } else {
              window.open(res.data)
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
          : <a src={ shortUrl } onClick={this._loadchain.bind(this)}> 查看链接 </a> }
      </React.Fragment>
    )
  }

}



export default Chain;