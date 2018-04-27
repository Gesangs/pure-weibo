import React, { Component } from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { handleWeibo } from "../../utils/class/weibo"
import { weiboCount } from "../../config/config"
import * as api from "../../api/weibo"
import Head from "./head"
import Scroll from "../../component/scroll/index"
import WeiboList from "../../component/weibolist"
import "./style.css"

class Favorites extends Component {
    constructor(props, context){
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            weiboList: [],
            tags: [],
            total_number: ''
        }
    }
    componentDidMount(){
        this._getAll()
        this._getTags()
    }
    _getAll = () => {
        api.getFavoritesWeiBo().then((res) => {
            this.setState({
                weiboList: this._handleList(res.data.favorites),
                total_number: res.data.total_number,
                isMore: res.data.total_number > weiboCount
            })
        })
    }
    _getMore = () => {
        let page = 2;
        return api.getFavoritesWeiBo(page).then(res => {
        const weiboList = this._handleList(res.data.favorites);
        this.setState({
            weiboList: [...this.state.weiboList, ...weiboList],
            isMore: res.data.total_number > page * weiboCount
        });
        page++;
        });
    }
    _getTags(){
        api.getFavoritesTag().then((res) => {
            this.setState({
                tags: res.data.tags
            })
        })
    }
    _getWeibiByTag(tid){
        api.getFavoritesByTag(tid).then((res) =>{
            this.setState({
                weiboList: this._handleList(res.data.favorites)
            })
        })
    }
    _handleList(weibos){
        weibos = weibos || [];
        const List = [];
        weibos.forEach((item, index) => {
            const weibo = handleWeibo(item.status);
            List.push(weibo);
        });
        return List;
    }
     render(){
         const { weiboList, tags, isMore, total_number } = this.state;
         return(
             <div className="favorite">
                <Head />
                <Scroll
                    onPullDownRefresh={this._getAll}
                    onReachBottom={this._getMore}
                    load_tip={isMore}>
                    <div onClick={this._getAll} className="Tags">
                        全部({total_number})
                    </div>
                    {tags.map((item, index) => 
                        <div onClick={this._getWeibiByTag.bind(this, item.id)} className="favoriteTags">
                            {item.tag}({item.count})
                        </div>
                    )}
                    <WeiboList weiboList={weiboList} />
                </Scroll>
             </div>
         )
     }
}

export default Favorites;