# 拼多多百亿补贴团购微信小程序

拼多多百亿补贴里面有些拼团需要多个人拼单才能购买成功，所以打算做一个免费开源的小程序，用来帮助大家拼团购买。

目前还未上线，还没有完全写完，然后域名也没有备案。

## 技术栈

运行：

```bash
npm run install 
npm run dev
npm run build
```

### 前端

react + taro.js + ts


这次我没有用tailwindcss，因为有同事说我已经不会写原生的css了，确实是忘记了一些属性。但是用scss+css module写css真是太痛苦了，比如想class的名称，还有css和html是在2个文件中编写都是很麻烦的。



### 后端

node + express + ts + mongodb




## 未来优化

1. 增加`我的`页面，用户可以登录后，然后统计历史拼单数据
2. 用户可以关闭自己发布的拼团
3. 接入多多客


