export const format = date => {
  return getDateDiff(new Date(date));
};

function getDateDiff(dateTimeStamp) {
  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let now = new Date().getTime();
  let diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    return;
  }
 
  let dayC = diffValue / day;
  let hourC = diffValue / hour;
  let minC = diffValue / minute;
  let result = "";
  if (dayC >= 7) {
    result = dateTimeStamp.toLocaleDateString().replace(/\//g, "-");
  } else if (dayC >= 1) {
    result = "" + Number.parseInt(dayC, 10) + "天前";
  } else if (hourC >= 1) {
    result = "" + Number.parseInt(hourC, 10) + "小时前";
  } else if (minC >= 1) {
    result = "" + Number.parseInt(minC, 10) + "分钟前";
  } else {
    result = "刚刚";
  }
  return result;
}
