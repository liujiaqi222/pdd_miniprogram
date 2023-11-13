# 拼多多百亿补贴多人团拼团微信小程序

拼多多百亿补贴里面的多人团需要多个人拼单才能购买成功，所以做了一个免费开源的小程序，用来帮助大家拼团购买。

目前已经做了2个大版本，具体可以看下面的截图展示部分。

扫码体验：小程序名《百亿拼团 GO》

![gh_d90acd8d17ce_258.jpg](https://raw.githubusercontent.com/liujiaqi222/warehouse/main/gh_d90acd8d17ce_258.jpg)

## 核心功能

1. 支持搜索和筛选多人团拼单
2. 拼团详情页面可跳转到拼多多拼团，若团已满/过期，支持根据当前团开一个新的团并自动发布
3. 支持用户手动上传二维码发布拼团，支持查看自己已发布的拼单
4. 支持用户前往拼多多开新团后，自动同步到本小程序
5. 定时任务：定时更新拼团详情，删除过期拼单，自动开新团
6. 接入了多多客，做了优惠券页面，和相应开团的推广位配置
7. 配置了管理面（JWT登录认证），方便进行对已上线的小程序进行控制



## 截图

### 版本二

版本二主要是在23年10月开始开发的，功能点有1.增加了管理面 2.支持以团开团自动发布拼团 3.页面大优化，后端性能优化

首页、拼团详情页、加群滑窗(群二维码支持后端配置)
<div>
<img src='https://raw.githubusercontent.com/liujiaqi222/warehouse/main/img/20231113220934.png' style="width: 32%;" />
<img src='https://raw.githubusercontent.com/liujiaqi222/warehouse/main/img/20231113221057.png' style="width: 32%;" />
<img src='https://raw.githubusercontent.com/liujiaqi222/warehouse/main/img/20231113221219.png' style="width: 32%;" />

</div>

领券页面、发布拼团页面、我的页面、我发布的拼团

<div>
<img src='https://raw.githubusercontent.com/liujiaqi222/warehouse/main/img/20231113221316.png' style="width: 32%;" />
<img src='https://raw.githubusercontent.com/liujiaqi222/warehouse/main/img/20231113221400.png' style="width: 32%;" />
<img src='https://raw.githubusercontent.com/liujiaqi222/warehouse/main/img/20231113221447.png' style="width: 32%;" />
<img src='https://raw.githubusercontent.com/liujiaqi222/warehouse/main/img/20231113221530.png' style="width: 32%;" />

</div>

**管理面**,能进行更换链接，图片等操作:

<img src="https://raw.githubusercontent.com/liujiaqi222/warehouse/main/img/20231113221629.png" alt="image-20230503233318367" style="width: 500px;" />
<img src="https://raw.githubusercontent.com/liujiaqi222/warehouse/main/img/20231113221850.png" alt="image-20230503233318367" style="width: 500px;" />



### 版本一

这个是23年10月前的版本，目前已经存放在archive-1分支了。

多人团拼单界面（图1图2）优惠券页面（图3）

<div>
<img src="https://raw.githubusercontent.com/liujiaqi222/warehouse/main/20230522223404.png" alt="image-20230503233003395" style="width: 33%;" />
<img src="https://raw.githubusercontent.com/liujiaqi222/warehouse/main/20230522222705.png" alt="image-20230503233003395" style="width: 33%;" />
<img src="https://raw.githubusercontent.com/liujiaqi222/warehouse/main/20230522223141.png" alt="image-20230503233003395" style="width: 32%;" />
</div>

发布界面(图1) 我的页面(图2) 查看自己发布的拼团（图3）


<div>
<img src="https://raw.githubusercontent.com/liujiaqi222/warehouse/main/image-20230503233141521.png" alt="image-20230503233141521" style="width:32%;" />
<img src="https://raw.githubusercontent.com/liujiaqi222/warehouse/main/image-20230503233219963.png" alt="image-20230503233219963" style="width:32%;" />
<img src="https://raw.githubusercontent.com/liujiaqi222/warehouse/main/image-20230503233318367.png" alt="image-20230503233318367" style="width: 32%;" />
</div>




## 技术栈

运行：

```bash
npm run install
npm run dev
npm run build
```
建议 node 版本大于等于 18，因为项目使用了 node 原生的 fetch 功能。如果你的 node 小于 18，则可以用`node-fetch`这个开源 npm 包平替。

> 前端

小程序：
react + taro.js + ts +tailwindcss

css因为一开始没有使用tailwindcss，导致部分css是用scss写的

管理员面：
react + ts + ant-design v5

> 后端
> 
node + express + ts + mongodb + mongoose



### 环境变量

项目在前端和后端都使用了一些环境变量，如果想要运行本项目，请去掉`.example`后缀。

如`.env.example` -> `.env`
如`.env.production.example` -> `.env.production`

## 部署

1. 支持 docker 部署
2. 使用 github actions 自动更新部署后端到服务器
3. 如果不想使用docker可以参考我写的[服务器部署后端](https://juejin.cn/post/7208968811390058554)
4. 我写的[域名 SSL 加密](https://juejin.cn/post/7227444929948106813)
