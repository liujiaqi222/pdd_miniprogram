export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/create/index',
    'pages/detail/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '拼团团',
    navigationBarTextStyle: 'black'
  },
  tabBar:{
    color: "#999",
    selectedColor: "#3b82f6",
    list:[
      {pagePath: "pages/index/index", text: "首页",iconPath:'./assets/home.png',selectedIconPath:'./assets/home-active.png'},
      {pagePath: "pages/create/index", text: "发布",iconPath:'./assets/post.png',selectedIconPath:'./assets/post-active.png'},

    ]
  }
})
