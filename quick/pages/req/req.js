//测试请求数据
var util = require('../../utils/util.js')

function ajax(options) {
  options = options || {};
  options.type = (options.type || "GET").toUpperCase();
  options.dataType = options.dataType || "json";
  var params = formatParams(options.data);

  //创建 - 非IE6 - 第一步
  if (window.XMLHttpRequest) {
    var xhr = new XMLHttpRequest();
  } else { //IE6及其以下版本浏览器
    var xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }

  //接收 - 第三步
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var status = xhr.status;
      if (status >= 200 && status < 300) {
        options.success && options.success(xhr.responseText, xhr.responseXML);
      } else {
        options.fail && options.fail(status);
      }
    }
  }

  //连接 和 发送 - 第二步
  if (options.type == "GET") {
    xhr.open("GET", options.url + "?" + params, true);
    xhr.send(null);
  } else if (options.type == "POST") {
    xhr.open("POST", options.url, true);
    //设置表单提交时的内容类型
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(params);
  }
}
//格式化参数
function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push(("v=" + Math.random()).replace(".",""));
    return arr.join("&");
}
Page({
  data: {
    list: [],
    hidden: true,
  },
  bindViewReq: function(e){
    // var target =
    console.log(e);
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '当前页面'
    })

    this.ajaxData();

    var self = this;
    this.setData({
      hidden: false
    })
    setTimeout(function(){
      self.requestData();
    }, 500)
  },
  ajaxData: function(){
    //onShow时，可以修改授权域，于是可以请求 http 请求数据了
    //
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

    //想搞 ajax 请求，抱歉没有 window 对象
    //   ajax({
    //      url: "https://www.v2ex.com/api/nodes/all.json",              //请求地址
    //      type: "GET",                       //请求方式
    //      data: { },        //请求参数
    //     //  dataType: "json",
    //      success: function (response, xml) {
    //         // 此处放成功后执行的代码
    //         console.log(response);
    //      },
    //      fail: function (status) {
    //         // 此处放失败后执行的代码
    //         console.log(status);
    //      }
    //  });
  },
  requestData: function(){
    var self = this;

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
