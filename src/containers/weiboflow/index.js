import React, { Component } from "react";
import PropTypes from 'prop-types'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import * as api from "../../api/weibo";
import { handleWeiboList, uniqueWeibo } from "../../utils/class/weibo";

import Scroll from "../../component/scroll/index";
import WeiboList from "../../component/weibolist";

class WeiboFlow extends Component {
  static propTypes = {
    getNewWeiBo: PropTypes.func.isRequired
  }
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      weiboList: [],
    };
    this.fun = null;
    this.page = 2;
  }
  componentWillMount() {
    this.fun = api[this.props.getNewWeiBo];
    this._getNewWeiBo();
  }

  _getNewWeiBo = () => {
    this.fun().then(res => {
      this.setState({
        weiboList: handleWeiboList(res.data.statuses)
      });
    });
  }

  _getMoreWeiBo = () => {
    this.fun(this.page).then(res => {
      let weiboList = handleWeiboList(res.data.statuses);
      this.setState({
        weiboList: uniqueWeibo(this.state.weiboList, weiboList),
      });
      this.page++;
    });
  }

  render() {
    const { weiboList } = this.state;
    return (
      <div className="weiboList">
        <Scroll
          onPullDownRefresh={this._getNewWeiBo}
          onReachBottom={this._getMoreWeiBo}
          load_tip={true}
        >
          <WeiboList weiboList={weiboList} />
        </Scroll>
      </div>
    );
  }
}

export default WeiboFlow


