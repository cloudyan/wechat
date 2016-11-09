//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // __wxConfig.appid = 'wx23802513017ca425';
    __wxConfig.projectConfig.Network.RequestDomain = __wxConfig.projectConfig.Network.RequestDomain.concat([
      'http://m.api.haoshiqi.net',
      'http://api.v3.iqianggou.com',
      'http://cway-openapi.devapi.haoshiqi.net',
      'http://m.betaapi.baoshiqi.net',  //找不到 dns
      'https://www.v2ex.com',
    ]);
  },
  getUserInfo:function(cb){
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  globalData:{
    userInfo:null
  }
})
