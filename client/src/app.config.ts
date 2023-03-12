export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/create/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '拼团团',
    navigationBarTextStyle: 'black'
  },
  tabBar:{
    color: "#999",
    selectedColor: "#cc0000",
    list:[
      {pagePath: "pages/index/index", text: "首页",},
      {pagePath: "pages/create/index", text: "我的",},
    ]
  }
})
