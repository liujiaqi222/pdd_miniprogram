export default defineAppConfig({
  pages: [
    'pages/create/index',
    'pages/index/index',
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
      {pagePath: "pages/create/index", text: "我的",},
      {pagePath: "pages/index/index", text: "首页",},
    ]
  }
})
