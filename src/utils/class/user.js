
import { numFormat } from "../num-utils"
export default class User {
  constructor({
    id,
    name, // 昵称
    gender, // 性别
    create_time, // 注册时间
    head_pic, // 头像
    pic_urls, // 背景图
    followers_count, // 粉丝数
    friends_count, // 关注数
    statuses_count, // 微博数
    verified_reason, // 认证原因
    location, // 用户所在地
    description // 签名
  }) {
    this.id = id
    this.name = name
    this.gender = gender
    this.create_time = create_time
    this.head_pic = head_pic
    this.pic_urls = pic_urls
    this.followers_count = followers_count
    this.friends_count = friends_count
    this.statuses_count = statuses_count
    this.verified_reason = verified_reason
    this.location = location
    this.description = description
  }
}

export function handleUser(user) {
  return new User({
    id: user.id,
    name: user.screen_name,
    gender: user.gender === "m" ? "男" : "女",
    create_time: new Date(user.created_at).toISOString().slice(0,10),
    head_pic: user.avatar_large,
    pic_urls: handlePic(user.cover_image || user.cover_image_phone),
    friends_count:numFormat(user.friends_count),
    followers_count:numFormat(user.followers_count),
    statuses_count:numFormat(user.statuses_count),
    verified_reason:user.verified_reason,
    location:user.location,
    description:user.description
  });
}

function handlePic(imgs){
  if(imgs) {
    return imgs.replace(/(;http[^;]+.(jpg|png))/g, "");
  } else {
    return ""
  }
}