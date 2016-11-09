//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindGoNext: function(e){
    console.log(e);
    var dataset = e.currentTarget.dataset,
        pageType = dataset.page;
    switch(pageType){
      case 'slider2':
        wx.navigateTo({
          url: '../slider/slider2',
        })
        console.log('无效页面跳转')
        break;
      default:
        wx.navigateTo({
          url: '../'+ pageType +'/' + pageType,
        })
    }
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
  	//调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
      that.update()
    })
  }
})
