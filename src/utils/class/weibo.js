import { format } from "../date-utils";
import { handleUser } from "./user"
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

function handleRetWeibo(weibo) {
  return new Weibo({
    id: weibo.id,
    user: handleUser(weibo.user),
    content: handleContent(weibo.text),
    pic_urls: handleImgUrl(weibo),
    reposts_count: weibo.reposts_count,
    comments_count: weibo.comments_count,
    attitudes_count: weibo.attitudes_count
  });
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
      ? handleRetWeibo(weibo.retweeted_status)
      : ""
  });
}

export function handleWeiboList(weibos) {
  weibos = weibos || [];
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
      arr.push(item.thumbnail_pic.replace('\/thumbnail\/', "/orj360/").replace(/wx\d\./, "wx2."))
    })
  } else {
    if(weibo.original_pic){
      arr.push(weibo.original_pic.replace('\/thumbnail\/', "/orj360/").replace(/wx\d\./, "wx2."))
    } else {
      return null;
    }
  }
  return arr;
}