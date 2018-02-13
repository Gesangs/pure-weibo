import {jsonp} from './jsonp'
import { access_token } from "../config/config"
import axios from "axios";

export function getAccess_token(Code) {
  axios
    .get("/api/shouquan", {
      params: Code
    })
    .then(res => {
      const data =  JSON.parse(res.data);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("uid", data.uid);

      // 计算access_token过期时间
      const time = data.expires_in;
      const currentTime = new Date().getTime();
      const endTime = currentTime + time;
      localStorage.setItem("endTime", endTime);
      console.log("ss")
    });
}



// 根据用户Uid/screen_name获取用户信息
// http://open.weibo.com/wiki/2/users/show
export function getUserMsg() {
    const url = 'https://api.weibo.com/2/users/show.json'
    const data = {
      access_token,
      uid: localStorage.getItem('uid')
    }
    return jsonp(url, data)
  }


  // 退出登录
  // http://open.weibo.com/wiki/2/account/end_session
  export function Logout() {
    const url = 'https://api.weibo.com/2/account/end_session.json'
    const data = {
      access_token,
    }
    return jsonp(url, data)
  }
  export function Logoutt() {
    const url = 'https://api.weibo.com/oauth2/revokeoauth2'
    const data = {
      access_token,
    }
    return jsonp(url, data)
  }
