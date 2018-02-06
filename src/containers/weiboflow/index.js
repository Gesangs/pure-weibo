import React, { Component } from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin'
import * as api from "../../api/weibo";
import { handleWeiboList } from "../../utils/class/weibo";

import Scroll from "../../component/scroll/index";
import WeiboList from "../../component/weibolist";

class WeiboFlow extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      weiboList: [],
    };
    this.fun = null;
  }
  componentWillMount() {
    this.fun = api[this.props.getNewWeiBo];
    this._getNewWeiBo();
  }

  _getNewWeiBo() {
    this.fun().then(res => {
      this.setState({
        weiboList: handleWeiboList(res.data.statuses)
      });
      console.log(res.data.statuses);
    });
  }
  _getMoreWeiBo() {
    let page = 2;
    return this.fun(page++).then(res => {
      const weiboList = handleWeiboList(res.data.statuses);
      this.setState({
        weiboList: [...this.state.weiboList, ...weiboList],
      });
      console.log(this.state.weiboList);
    });
  }

  render() {
    const weiboList = this.state.weiboList;
    return (
      <div className="weiboList">
        <Scroll
          onPullDownRefresh={this._getNewWeiBo.bind(this)}
          onReachBottom={this._getMoreWeiBo.bind(this)}
          load_tip={true}
        >
          <WeiboList weiboList={weiboList} />
          {/* <div style={{ height: 3000 }}></div> */}
        </Scroll>
      </div>
    );
  }
}

export default WeiboFlow


