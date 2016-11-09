Page({
  data: {
    list: [],
    hidden: true,
  },
  bindViewReq: function(e){
    //点击发起请求

    this.requestData();
  },
  onLoad: function () {
    var self = this;
  },
  requestData: function(){
    var self = this;
    this.setData({
      hidden: false,
    })
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
        self.setData({
          hidden: true
        })
      }
    })
  },
})
