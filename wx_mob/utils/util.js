function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds();


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function reqAjax(opts){
  wx.request({
    // url: 'http://api.v3.iqianggou.com/api/appconfig?platform=3', //测试
    url: 'http://m.api.haoshiqi.net/common/index', //测试
    data: {
    },
    header: {
      'Content-Type': 'application/json'
    },
    success: function(res) {
      console.log(res.data);
      // self.setData({
      //   list: res.data,
      // })
    },
    fail: function(err){
      console.log(err);
    },
    complete: function() {
      console.log('请求完成');
    }
  })
}

module.exports = {
  formatTime: formatTime,
  ajax: reqAjax,
}
