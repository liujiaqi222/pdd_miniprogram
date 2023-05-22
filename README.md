# 拼多多百亿补贴团购微信小程序

拼多多百亿补贴里面有些拼团需要多个人拼单才能购买成功，所以打算做一个免费开源的小程序，用来帮助大家拼团购买。



## 已实现功能

1. 查看所有拼单，支持搜索和筛选仅差一人的拼单，前端支持无限加载滚动
2. 拼团详情页面支持跳转到拼多多拼团，支持分享拼团
3. 上传识别拼单二维码，发布拼单，发布拼团后自动跳转到拼团页面
4. 获取微信小程序用户的唯一的openId，并在发布拼单的时候绑定到拼单信息上
5. 查看自己发布的拼单，正在拼团的拼单支持跳转到拼团详情页面
6. 定时任务：定时更新拼单详情，删除过期拼单等
7. 接入了多多客，做了优惠券页面

## 进度

- [x] 域名备案，[服务器部署后端](https://juejin.cn/post/7208968811390058554)，[域名SSL加密](https://juejin.cn/post/7227444929948106813)
- [x] 基本功能完成
- [x] 充分自测后上线

扫码体验：小程序名《百亿拼团GO》

![gh_d90acd8d17ce_258.jpg](https://raw.githubusercontent.com/liujiaqi222/warehouse/main/gh_d90acd8d17ce_258.jpg)

## 截图

拼单界面：

<img src="https://raw.githubusercontent.com/liujiaqi222/warehouse/main/20230522223404.png" alt="image-20230503233003395" style="width: 33%;" />
<img src="https://raw.githubusercontent.com/liujiaqi222/warehouse/main/20230522222705.png" alt="image-20230503233003395" style="width: 33%;" />


优惠券（调多多客的api）：

<img src="https://raw.githubusercontent.com/liujiaqi222/warehouse/main/20230522223141.png" alt="image-20230503233003395" style="width: 32%;" />


发布界面：

<img src="https://raw.githubusercontent.com/liujiaqi222/warehouse/main/image-20230503233141521.png" alt="image-20230503233141521" style="width:33%;" />


我的界面：

<img src="https://raw.githubusercontent.com/liujiaqi222/warehouse/main/image-20230503233219963.png" alt="image-20230503233219963" style="width:33%;" />

查看自己发布的拼团：

<img src="https://raw.githubusercontent.com/liujiaqi222/warehouse/main/image-20230503233318367.png" alt="image-20230503233318367" style="width: 33%;" />

## 技术栈

运行：

```bash
npm run install 
npm run dev
npm run build
```

### 前端

react + taro.js + ts + scss


这次我没有用tailwindcss，因为有同事说我已经不会写原生的css了，确实是忘记了一些属性。但是用scss+css module写css真是太痛苦了，比如想class的名称，还有css和html是在2个文件中编写都是很麻烦的。

我是百分之一万后悔没有使用tailwind，所以项目写了一大半，还是用回了tailwindcss，没有tailwind是活不下去的。


### 后端

node + express + ts + mongodb + mongoose

后端的部署真的是第一次体验

## 未来优化


1. 支持docker部署
2. 将express.js 换成nest.js，这个可能懒得做，已经能跑的项目为啥要换一个框架
3. 后端完善防重放校验

