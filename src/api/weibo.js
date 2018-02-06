import {jsonp} from './jsonp';
import { access_token } from "../config/config"
import axios from 'axios'
// 获取当前登录用户及其所关注（授权）用户的最新微博
// http://open.weibo.com/wiki/2/statuses/home_timeline
export function getNewWeiBo(page = 1) {
  const url = 'https://api.weibo.com/2/statuses/home_timeline.json';

  const  data = {
      access_token,
      page,
      count:10
    }
  
  return jsonp(url, data)
}

// 根据微博ID获取单条微博内容
// http://open.weibo.com/wiki/2/statuses/show
export function getWeiBoDetail(id) {
  const url = 'https://api.weibo.com/2/statuses/show.json';

  const data = {
      access_token,
      id
    }
  return jsonp(url, data)
}

// 获取登录用户最新发表的微博列表
// http://open.weibo.com/wiki/2/statuses/user_timeline
export function getUserWeiBo(uid) {
  const url = 'https://api.weibo.com/2/statuses/user_timeline.json'
  const data = {
    access_token,
    uid
  }
  return jsonp(url, data)
}




// 返回最新的公共微博
// http://open.weibo.com/wiki/2/statuses/public_timeline
export function getPublicWeiBo(page = 1) {
  const url = 'https://api.weibo.com/2/statuses/public_timeline.json'
  const data = {
    access_token,
    page
  }
  return jsonp(url, data)
}

// http://open.weibo.com/wiki/2/emotions
// 获取微博官方表情的详细信息
export function getEmotions() {
  const url = 'https://api.weibo.com/2/emotions.json'
  const data = {
    access_token
  }
  return jsonp(url, data)
}

// http://open.weibo.com/wiki/2/short_url/expand
// 长链转短链
export function shortToLong(urls) {
  const data = {
    url: urls,
    access_token
  }
  return axios.get('/api/toLong',{
    params: data
  })
}
// http://gslb.miaopai.com/stream/.mp4
// const audioUrl = handleUrl(text.match(/(http:\/\/t.cn\/\w+)/g))

// 发布一条微博
// http://open.weibo.com/wiki/2/statuses/update
export function post_text(status){
  
  const data = {
    access_token,
    status
}

  return axios.get('/api/post_text',{
    params: data
  })
}
// 发布一条图文微博
// http://open.weibo.com/wiki/2/statuses/upload
export function post_image(status, file){
  const reader = new FileReader()
  reader.readAsBinaryString(file)
  reader.onloadend = function (){
    let form = new FormData()
    form.append('access_token', access_token)
    form.append('status', status)
    form.append('pic', this.result)

    return axios.get('/api/post_image',{
      params: form,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

// 转发一条微博
// http://open.weibo.com/wiki/2/statuses/repost
export function repost(id, status ,is_comment){
  var data = {
    access_token,
    id,
    status,
    is_comment
  }

  return axios.get('/api/repost',{
    params: data
  })

}