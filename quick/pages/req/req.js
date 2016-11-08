//测试请求数据
var util = require('../../utils/util.js')
Page({
  data: {
    list: [],
    hidden: true,
  },
  onLoad: function () {
    var self = this;
    wx.setNavigationBarTitle({
      title: '当前页面'
    })
    // this.setData({
    //   hidden: false
    // })
    wx.request({
      url: 'https://api.github.com/users/vuejs-templates/repos', //测试
      data: {
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res.data);
        self.setData({
          list: res.data,
        })
      },
      fail: function(err){
        console.log(err);
      },
      complete: function() {
        console.log('请求完成');
        // self.setData({
        //   hidden: true
        // })
      }
    })
  }
})
