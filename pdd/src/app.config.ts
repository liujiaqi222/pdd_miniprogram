export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/user/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '拼团团',

    navigationBarTextStyle: 'black'
  },
  tabBar:{
    color: "#999",
    selectedColor: "#333",
    list:[
      {pagePath: "pages/index/index", text: "首页",},
      {pagePath: "pages/user/index", text: "我的",},
    ]
  }
})
