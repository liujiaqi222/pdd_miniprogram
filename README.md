# 拼多多百亿补贴团购微信小程序

拼多多百亿补贴里面有些拼团需要多个人拼单才能购买成功，所以打算做一个免费开源的小程序，用来帮助大家拼团购买。



## 已实现功能

1. 查看所有拼单，支持搜索和筛选仅差一人的拼单，前端支持无限加载滚动
2. 复制拼单链接，或者直接进入拼多多小程序
3. 上传识别拼单二维码，发布拼单
4. 根据拼单ID，像拼多多服务器发请求，获取订单信息
5. 获取微信小程序用户的唯一的openId，并在发布拼单的时候绑定到拼单信息上
6. 查看自己发布的拼单
7. 定时任务：定时更新拼单剩余多少人，如果拼满或者过期的订单都将移动到另外一个存放过期订单的集合中。

## 进度

- [x] 域名备案，[服务器部署后端](https://juejin.cn/post/7208968811390058554)，[域名SSL加密](https://juejin.cn/post/7227444929948106813)
- [x] 基本功能完成
- [ ] 充分自测后上线

## 截图

查看拼单界面：

<img src="https://raw.githubusercontent.com/liujiaqi222/warehouse/main/image-20230503233003395.png" alt="image-20230503233003395" style="zoom: 33%;" />

发布界面：

<img src="https://raw.githubusercontent.com/liujiaqi222/warehouse/main/image-20230503233141521.png" alt="image-20230503233141521" style="zoom:33%;" />

我的界面：

<img src="https://raw.githubusercontent.com/liujiaqi222/warehouse/main/image-20230503233219963.png" alt="image-20230503233219963" style="zoom:33%;" />

查看自己发布的拼团：

<img src="https://raw.githubusercontent.com/liujiaqi222/warehouse/main/image-20230503233318367.png" alt="image-20230503233318367" style="zoom: 33%;" />

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
我是百分之一万后悔没有使用tailwind



### 后端

node + express + ts + mongodb + mongoose

后端的部署真的是第一次体验，另外第一次自己实操使用mongodb和mongoose。我的操作很不熟练，接下来要看看mongodb的聚合管道的教程。

## 未来优化

1. 很多地方可以优化体验，比如搜索后没有删除按钮，之所以还没有做因为没有用组件库，自己写就有点费时间，另外很多样式不统一。
2. 没有做权限校验，任何拿到api的人都能直接发送请求
3. 接入多多客

