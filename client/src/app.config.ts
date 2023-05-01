export default defineAppConfig({
  pages: [
    "pages/user/index",
    "pages/index/index",
    "pages/index/detail/index",
    "pages/create/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "拼团团",
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
