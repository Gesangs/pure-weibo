export const Key = "1654230425"

export const access_token = localStorage.getItem('access_token');

export const reUri = 'http://127.0.0.1:3000'

// export const reUri = 'https://weibo.gesangs.com'

export const URL = `https://api.weibo.com/oauth2/authorize?client_id=${Key}&response_type=code&redirect_uri=${reUri}`;

export const endTime = localStorage.getItem("endTime")

// 每次请求返回的微博条数
export const weiboCount = 10;

// 每次请求返回的评论条数
export const commnetCount = 30;