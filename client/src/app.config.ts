export default defineAppConfig({
  pages: [
    "pages/coupon/index",
    "pages/index/index",
    "pages/index/detail/index",
    "pages/create/index",
    "pages/user/index",
    "pages/user/pages/introduction/index",
    "pages/user/pages/orders/index",
    "pages/user/pages/tutorial/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "百亿拼购",
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
      {
        pagePath: "pages/coupon/index",
        text: "优惠券",
        iconPath: "./assets/coupon.png",
        selectedIconPath: "./assets/coupon.png",
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

