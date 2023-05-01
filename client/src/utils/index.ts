// 小程序不支持toLocaleString
// 转换日期为 年/月/日 时:分:秒
export const formatDate=(date: Date) =>{
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
}


