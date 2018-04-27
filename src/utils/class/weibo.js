import { format } from "../date-utils";
import { handleUser } from "./user";
import { shortToLong } from "../../api/weibo"
export default class Weibo {
  constructor({
    id,
    user,
    name,
    head_pic,
    mid,
    time,
    source, // 来自
    content,
    pic_urls,
    favorited, // 是否收藏
    reposts_count, // 转发数
    comments_count, // 评论数
    attitudes_count, // 点赞数
    retweeted_status // 被转发的原微博
  }) {
    this.id = id;
    this.user = user;
    this.name = name;
    this.head_pic = head_pic;
    this.mid = mid;
    this.time = time;
    this.source = source;
    this.content = content;
    this.pic_urls = pic_urls;
    this.favorited = favorited;
    this.reposts_count = reposts_count;
    this.comments_count = comments_count;
    this.attitudes_count = attitudes_count;
    this.retweeted_status = retweeted_status;
  }
}
export function handleContent(text) {
  text = text
    .replace(/(@[^\s|\/|:|：|@|，|。]+)/g, "<user>$1</user>")
    .replace(/\[([^\[\]]+)\]/g, "<icon>[$1]</icon>")
    .replace(/(#[^#]+#)/g, "<topic>$1</topic>")
    .replace(/...全文.+/g, "...<all> 查看全文</all>")
    .replace(/(http:\/\/t.cn\/\w+)/g, "<url>$1</url> ")
    .replace(/\u200B/g, "");
  if (text == text) text = `${text}<p></p>`;
  return text;
}

export function handleWeibo(weibo) {
  if(weibo.deleted === "1") return
  return new Weibo({
    id: weibo.id,
    mid: weibo.mid,
    user: handleUser(weibo.user),
    time: format(weibo.created_at),
    source: weibo.source.replace(/<[^>]+>/g, ""),
    content: handleContent(weibo.text),
    pic_urls: handleImgUrl(weibo),
    favorited: weibo.favorited,
    reposts_count: weibo.reposts_count,
    comments_count: weibo.comments_count,
    attitudes_count: weibo.attitudes_count,
    retweeted_status: weibo.retweeted_status
      ? handleWeibo(weibo.retweeted_status)
      : ""
  });
}

export function handleWeiboList(weibos = []) {
  const List = [];
  weibos.forEach((item, index) => {
    const weibo = handleWeibo(item);
    List.push(weibo);
  });
  return List;
}




function handleImgUrl(weibo){
  const arr = [];
  if(weibo.pic_urls && weibo.pic_urls[0]) {
    weibo.pic_urls.map((item) => {
      arr.push(item.thumbnail_pic)
    })
  } else {
    if(weibo.original_pic){
      arr.push(weibo.original_pic)
    } else {
      return null;
    }
  }
  return arr;
}

// 在下一次加载前，如果有新微博，上一次的数据后几条 会与 下一次加载的数据前几条 重复
// 如[1, 2, 3, 4, 5]
//   [0, 1, 2, 3, 4] [5, 6, 7, 8, 9]
export const uniqueWeibo = (pre, next) => {
  let i = pre.length - 1;
  for(; i > 0; i--){
      if(pre[i].id === next[0].id){
          pre.splice(i)
          break;
      }
  }
  return [...pre, ...next]
}