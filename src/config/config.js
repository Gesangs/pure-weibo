export const Key = "1654230425"

export const access_token = localStorage.getItem('access_token');

export const reUri = 'http://127.0.0.1:3000'

export const URL = `https://api.weibo.com/oauth2/authorize?client_id=${Key}&response_type=code&redirect_uri=${reUri}`;

export const endTime = Number.parseInt(localStorage.getItem("endTime"))
