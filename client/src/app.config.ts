export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/user/index",
    "pages/user/pages/orders/index",
    "pages/coupon/index", // 这是拼多多优惠券页面，如果不需要可以注释
    "pages/create/index",
    "pages/index/detail/index",
    "pages/user/pages/introduction/index",
    "pages/user/pages/tutorial/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "百亿拼GO",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#999",
    selectedColor: "#3b82f6",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "./assets/home.png",
        selectedIconPath: "./assets/home-active.png",
      },
      // 这是拼多多优惠券页面，如果不需要可以注释下面的
      {
        pagePath: "pages/coupon/index",
        text: "领券",
        iconPath: "./assets/coupon.png",
        selectedIconPath: "./assets/coupon-active.png",
      },
      {
        pagePath: "pages/create/index",
        text: "发布",
        iconPath: "./assets/post.png",
        selectedIconPath: "./assets/post-active.png",
      },
      {
        pagePath: "pages/user/index",
        text: "我的",
        iconPath: "./assets/user.png",
        selectedIconPath: "./assets/user-active.png",
      },
    ],
  },
});
