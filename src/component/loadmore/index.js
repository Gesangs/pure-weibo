import React from 'react'
import PropTypes from 'prop-types'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { windowInnerHeight } from "../../utils/scroll-position"

import './style.css'

class LoadMore extends React.Component {
    static defaultProps = {
        isLoadingMore: true, 
    }

    static propTypes = {
        isLoadingMore: PropTypes.bool,
        loadMoreFn: PropTypes.func
    }

    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.load = null
    }
    render() {
        return (
            <div className="load-more" ref={(load) => this.load = load}>
                {
                    this.props.isLoadingMore
                    ? <span>加载中...</span>
                    : <span onClick={this.loadMoreHandle}>没有了~</span>
                }
            </div>
        )
    }
    loadMoreHandle = () => {
        // 执行传输过来的
        this.props.loadMoreFn();
    }
    componentDidMount() {
        // 使用滚动时自动加载更多
        let timeoutId
        const loadMoreFn = this.props.loadMoreFn
        const callback = () => {
            const top = this.load ? this.load.getBoundingClientRect().top : '';
            if (top && top < windowInnerHeight) {
                // 证明 wrapper 已经被滚动到暴露在页面可视范围之内了
                loadMoreFn()
            }
        }
        window.addEventListener('scroll', () => {
            if (!this.props.isLoadingMore) return
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(callback, 50)
        }, false);
    }
}

export default LoadMore