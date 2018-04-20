import {jsonp, param} from './jsonp'
import { access_token } from "../config/config"
import {commnetCount} from "../config/config"
import axios from 'axios'
// 根据微博ID返回某条微博的评论列表
// http://open.weibo.com/wiki/2/comments/show

export function getComments(id, page = 1) {
    const url = 'https://api.weibo.com/2/comments/show.json'
    const data = {
        access_token,
        id,
        count: commnetCount,
        page
    }
    return jsonp(url, data)
}

// 利用YQL获取不支持jsonp的数据
function handleurl(url, data){
  return url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
}

// 获取最新的提到登录用户的微博列表，即@我的微博
// http://open.weibo.com/wiki/2/statuses/mentions

// 获取最新的提到当前登录用户的评论，即@我的评论
// http://open.weibo.com/wiki/2/comments/mentions

export const getAtCommentsAndWeibo = (fun) => (page = 1) => {
  const postData = {
      access_token,
      count: commnetCount,
      page
  }
  let url = `https://api.weibo.com/2/${fun}/mentions.json`
  url = handleurl(url, postData)
  return axios.get('/api/comments/info',{
    params: url
  })
}


// 获取当前登录用户所发出的评论列表
// http://open.weibo.com/wiki/2/comments/by_me

// 获取当前登录用户所接收到的评论列表
// http://open.weibo.com/wiki/2/comments/to_me

export const getCommentsByAndToMe = (fun) => (page = 1) => {
  const postData = {
      access_token,
      count: commnetCount,
      page
  }
  let url = `https://api.weibo.com/2/comments/${fun}_me.json`
  url = handleurl(url, postData)
  return axios.get('/api/comments/info',{
    params: url
  })
}







// 评论一条微博
// http://open.weibo.com/wiki/2/comments/create
export function create_comment(comment, id){
    const data = {
      access_token,
      comment,
      id
    }
  
    return axios.get('/api/comments',{
      params: data
    })
  }


// 回复一条评论
// http://open.weibo.com/wiki/2/comments/reply
  export function reply_comment(comment, id, cid){
    const data = {
      access_token,
      comment,
      id,
      cid
    }
  
    return axios.get('/api/comments',{
      params: data
    })
  }

  