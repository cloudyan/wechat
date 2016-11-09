//index.js
var util = require('../../utils/util.js')
Page({
  data: {
    background: ['green', 'red', 'yellow'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 3000,
    duration: 1200
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeVertical: function (e) {
    this.setData({
      vertical: !this.data.vertical
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  onLoad: function(){
    console.log(util);
  },
})


// Page({
//   data: {
//     motto: 'Hello World',
//     userInfo: {}
//   },
//   //事件处理函数
//   bindViewTap: function() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   bindGoNext: function(e){
//     console.log(e);
//     var dataset = e.currentTarget.dataset,
//         pageType = dataset.page;
//     switch(pageType){
//       case 'slider2':
//         wx.navigateTo({
//           url: '../slider/slider2',
//         })
//         console.log('无效页面跳转')
//         break;
//       default:
//         wx.navigateTo({
//           url: '../'+ pageType +'/' + pageType,
//         })
//     }
//   },
//   onLoad: function () {
//     console.log('onLoad')
//     var that = this
//   	//调用应用实例的方法获取全局数据
//     app.getUserInfo(function(userInfo){
//       //更新数据
//       that.setData({
//         userInfo:userInfo
//       })
//       that.update()
//     })
//   }
// })
