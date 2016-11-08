
var loadUrl = location.href.split('#')[0];
var jsUrlDom = document.querySelector('#jsapi_url');
var loadUrlDom = document.querySelector('#load_url');
var localUrlDom = document.querySelector('#local_url');
var isUpdateUrlDom = document.querySelector('#isUpdateUrl');

var paramsNum = 0;
var concatParam = '?';
var isUpdate = false;  //true 代表更新 url，false 为不更新 url 方式注册

function isUpdateUrl(){
  isUpdate = !isUpdate;
  isUpdateUrlDom.innerHTML = isUpdate.toString();
}

function updateUrl(opt){
  paramsNum++;
  var href = location.href;
  if(href.indexOf('params=') != -1){
    href = href.replace(/params=[\d]+/,('params=' + paramsNum) )
  }else{
    concatParam = '?'
    if(href.indexOf('?') != -1){
      concatParam = '&';
    }
    href = href + '?params=' + paramsNum;
  }

  //!!! 使用 replaceState 更新 url，不能使用新的 url 注入JSSDK配置信息
  //!   还要使用 replaceState 操作之前的老 url 才可以
  var title = document.title;

  var jsApiUrl = isUpdate ? href : loadUrl;
  localUrlDom.innerHTML = href;

  switch(opt.status){
    case 'replaceState':
      history.replaceState(null, title, href);
      break;
    case 'pushState':
      history.pushState({ title: title }, title, href);
      break;
    case 'go':
      if(href.indexOf('code=') == -1){
        location.href = 'test.html?jumpurl=' + encodeURIComponent(href);
      }else{
        history.go(-2);
      }
      return;
      break;
    case 'href':
      location.href = href;
      break;
    case 'replace':
      location.replace(href);
      break;
    default:
     break;
  }
  ajaxJssdk(jsApiUrl);
}

// alert('提示：go 回来的话，会和重新加载页面一样，此时加载的 js 也会初始化执行，当前 loadURl 为最新的 url ');
ajaxJssdk();

window.addEventListener("popstate", function() {
    var currentState = history.state;
    paramsNum = paramsNum <= 0 ? 0 : paramsNum-1;
    console.log(currentState);
});

function ajaxJssdk(url){
  var href = url || loadUrl;

  $.ajax({
      type: 'GET',
      url: './api.php',
      data: {
        url: href
      },
      timeout: 3000,
      dataType: 'json',
      contentType: 'application/json',
      success: function(data,status){
        console.log(data)
        jssdkConfig(data);
        jsUrlDom.innerHTML = href;
      },
      error: function(xhr, type){
        console.log('Ajax error!')
      },
      complete: function(){

      }
  });
}

// ajaxJssdk();

loadUrlDom.innerHTML = location.href;
localUrlDom.innerHTML = location.href;
jsUrlDom.innerHTML = '当前还未注册';  //location.href.split('#')[0];

  /*
   * 注意：
   * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
   * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
   * 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
   *
   * 开发中遇到问题详见文档“附录5-常见错误及解决办法”解决，如仍未能解决可通过以下渠道反馈：
   * 邮箱地址：weixin-open@qq.com
   * 邮件主题：【微信JS-SDK反馈】具体问题
   * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
   */

/*
appId: "wxaa8d6f34c8d0a56b"
nonceStr: "aeGfuIONeiwd7Siy"
rawString: "jsapi_ticket=bxLdikRXVbTPdHSM05e5u10-4B-Ysf1YpOqQMlMFW9dsCuZRaQelkjQyNnHijl7ghW8vXN74L0n6fN_QssXQUw&noncestr=aeGfuIONeiwd7Siy&timestamp=1436788572&url=http://test.shgszr.com/php/api.php"
signature: "107adb90af08cb0b939909316c9339d6a6856609"
timestamp: 1436788572
url: "http://test.shgszr.com/php/api.php"
*/

function jssdkConfig(data){
  wx.config({
    debug: true,
    appId: data.appId,
    timestamp: data.timestamp,
    nonceStr: data.nonceStr,
    signature: data.signature,
    jsApiList: [
      // 所有要调用的 API 都要加到这个列表中
      'checkJsApi',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'hideMenuItems',
      'showMenuItems',
      'hideAllNonBaseMenuItem',
      'showAllNonBaseMenuItem',
      'translateVoice',
      'startRecord',
      'stopRecord',
      'onRecordEnd',
      'playVoice',
      'pauseVoice',
      'stopVoice',
      'uploadVoice',
      'downloadVoice',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage',
      'getNetworkType',
      'openLocation',
      'getLocation',
      'hideOptionMenu',
      'showOptionMenu',
      'closeWindow',
      'scanQRCode',
      'chooseWXPay',
      'openProductSpecificView',
      'addCard',
      'chooseCard',
      'openCard'
    ]
  });
}


// var urlObj = getUrlParam();
// document.querySelector('#getCode').onclick = function () {
//   if(!urlObj.code){
//     var jumpurl = location.origin + location.pathname;
//     location.href = jumpWechatUrl('snsapi_base', jumpurl);
//   }
// };
// document.querySelector('#apiWxPay').onclick = function () {
//   if(!urlObj.code){
//     document.querySelector('#getCode').onclick()
//   }else{
//     //10.0.0.129:8000
//     var apiUrl = 'http://dev.iqianggou.lab:8181/api/payment/wxpay';
//     var apiUrl = 'http://10.0.0.129:8000/api/payment/wxpay';
//     $.ajax({
//       type: 'POST',
//       url: apiUrl,
//       data: {
//         order_id: urlObj.order_id,
//         code: urlObj.code
//       },
//       timeout: 3000,
//       dataType: 'json',
//       // contentType: 'application/json',
//       success: function(data,status){
//         console.log(data)
//         debugger;
//         alert(JSON.stringify(data));

//       },
//       error: function(xhr, type){
//         console.log('Ajax error!')
//       },
//       complete: function(){

//       }
//     });
//   }
// };

wx.ready(function () {
  // 在这里调用 API
  // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
  document.querySelector('#checkJsApi').onclick = function () {
    wx.checkJsApi({
      jsApiList: [
        'getNetworkType',
        'previewImage'
      ],
      success: function (res) {
        alert(JSON.stringify(res));
      }
    });
  };
  // 2. 分享接口
  // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
  document.querySelector('#onMenuShareAppMessage').onclick = function () {
    wx.onMenuShareAppMessage({
      title: '互联网之子',
      desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
      link: 'http://movie.douban.com/subject/25785114/',
      imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
      trigger: function (res) {
        // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
        alert('用户点击发送给朋友');
      },
      success: function (res) {
        alert('已分享');
      },
      cancel: function (res) {
        alert('已取消');
      },
      fail: function (res) {
        alert(JSON.stringify(res));
      }
    });
    alert('已注册获取“发送给朋友”状态事件');
  };

  // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
  document.querySelector('#onMenuShareTimeline').onclick = function () {
    wx.onMenuShareTimeline({
      title: '互联网之子',
      link: 'http://movie.douban.com/subject/25785114/',
      imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
      trigger: function (res) {
        // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
        alert('用户点击分享到朋友圈');
      },
      success: function (res) {
        alert('已分享');
      },
      cancel: function (res) {
        alert('已取消');
      },
      fail: function (res) {
        alert(JSON.stringify(res));
      }
    });
    alert('已注册获取“分享到朋友圈”状态事件');
  };

  // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
  document.querySelector('#onMenuShareQQ').onclick = function () {
    wx.onMenuShareQQ({
      title: '互联网之子',
      desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
      link: 'http://movie.douban.com/subject/25785114/',
      imgUrl: 'http://img3.douban.com/view/movie_poster_cover/spst/public/p2166127561.jpg',
      trigger: function (res) {
        alert('用户点击分享到QQ');
      },
      complete: function (res) {
        alert(JSON.stringify(res));
      },
      success: function (res) {
        alert('已分享');
      },
      cancel: function (res) {
        alert('已取消');
      },
      fail: function (res) {
        alert(JSON.stringify(res));
      }
    });
    alert('已注册获取“分享到 QQ”状态事件');
  };

  // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
  document.querySelector('#onMenuShareWeibo').onclick = function () {
    wx.onMenuShareWeibo({
      title: '互联网之子',
      desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
      link: 'http://movie.douban.com/subject/25785114/',
      imgUrl: 'http://img3.douban.com/view/movie_poster_cover/spst/public/p2166127561.jpg',
      trigger: function (res) {
        alert('用户点击分享到微博');
      },
      complete: function (res) {
        alert(JSON.stringify(res));
      },
      success: function (res) {
        alert('已分享');
      },
      cancel: function (res) {
        alert('已取消');
      },
      fail: function (res) {
        alert(JSON.stringify(res));
      }
    });
    alert('已注册获取“分享到微博”状态事件');
  };


  // 3 智能接口
  var voice = {
    localId: '',
    serverId: ''
  };
  // 3.1 识别音频并返回识别结果
  document.querySelector('#translateVoice').onclick = function () {
    if (voice.localId == '') {
      alert('请先使用 startRecord 接口录制一段声音');
      return;
    }
    wx.translateVoice({
      localId: voice.localId,
      complete: function (res) {
        if (res.hasOwnProperty('translateResult')) {
          alert('识别结果：' + res.translateResult);
        } else {
          alert('无法识别');
        }
      }
    });
  };

  // 4 音频接口
  // 4.2 开始录音
  document.querySelector('#startRecord').onclick = function () {
    wx.startRecord({
      cancel: function () {
        alert('用户拒绝授权录音');
      }
    });
  };

  // 4.3 停止录音
  document.querySelector('#stopRecord').onclick = function () {
    wx.stopRecord({
      success: function (res) {
        voice.localId = res.localId;
      },
      fail: function (res) {
        alert(JSON.stringify(res));
      }
    });
  };

  // 4.4 监听录音自动停止
  wx.onVoiceRecordEnd({
    complete: function (res) {
      voice.localId = res.localId;
      alert('录音时间已超过一分钟');
    }
  });

  // 4.5 播放音频
  document.querySelector('#playVoice').onclick = function () {
    if (voice.localId == '') {
      alert('请先使用 startRecord 接口录制一段声音');
      return;
    }
    wx.playVoice({
      localId: voice.localId
    });
  };

  // 4.6 暂停播放音频
  document.querySelector('#pauseVoice').onclick = function () {
    wx.pauseVoice({
      localId: voice.localId
    });
  };

  // 4.7 停止播放音频
  document.querySelector('#stopVoice').onclick = function () {
    wx.stopVoice({
      localId: voice.localId
    });
  };

  // 4.8 监听录音播放停止
  wx.onVoicePlayEnd({
    complete: function (res) {
      alert('录音（' + res.localId + '）播放结束');
    }
  });

  // 4.8 上传语音
  document.querySelector('#uploadVoice').onclick = function () {
    if (voice.localId == '') {
      alert('请先使用 startRecord 接口录制一段声音');
      return;
    }
    wx.uploadVoice({
      localId: voice.localId,
      success: function (res) {
        alert('上传语音成功，serverId 为' + res.serverId);
        voice.serverId = res.serverId;
      }
    });
  };

  // 4.9 下载语音
  document.querySelector('#downloadVoice').onclick = function () {
    if (voice.serverId == '') {
      alert('请先使用 uploadVoice 上传声音');
      return;
    }
    wx.downloadVoice({
      serverId: voice.serverId,
      success: function (res) {
        alert('下载语音成功，localId 为' + res.localId);
        voice.localId = res.localId;
      }
    });
  };

  // 5 图片接口
  // 5.1 拍照、本地选图
  var images = {
    localId: [],
    serverId: []
  };
  document.querySelector('#chooseImage').onclick = function () {
    wx.chooseImage({
      success: function (res) {
        images.localId = res.localIds;
        alert('已选择 ' + res.localIds.length + ' 张图片');
      }
    });
  };

  // 5.2 图片预览
  document.querySelector('#previewImage').onclick = function () {
    wx.previewImage({
      current: 'http://img5.douban.com/view/photo/photo/public/p1353993776.jpg',
      urls: [
        'http://img3.douban.com/view/photo/photo/public/p2152117150.jpg',
        'http://img5.douban.com/view/photo/photo/public/p1353993776.jpg',
        'http://img3.douban.com/view/photo/photo/public/p2152134700.jpg'
      ]
    });
  };

  // 5.3 上传图片
  document.querySelector('#uploadImage').onclick = function () {
    if (images.localId.length == 0) {
      alert('请先使用 chooseImage 接口选择图片');
      return;
    }
    var i = 0, length = images.localId.length;
    images.serverId = [];
    function upload() {
      wx.uploadImage({
        localId: images.localId[i],
        success: function (res) {
          i++;
          alert('已上传：' + i + '/' + length);
          images.serverId.push(res.serverId);
          if (i < length) {
            upload();
          }
        },
        fail: function (res) {
          alert(JSON.stringify(res));
        }
      });
    }
    upload();
  };

  // 5.4 下载图片
  document.querySelector('#downloadImage').onclick = function () {
    if (images.serverId.length === 0) {
      alert('请先使用 uploadImage 上传图片');
      return;
    }
    var i = 0, length = images.serverId.length;
    images.localId = [];
    function download() {
      wx.downloadImage({
        serverId: images.serverId[i],
        success: function (res) {
          i++;
          alert('已下载：' + i + '/' + length);
          images.localId.push(res.localId);
          if (i < length) {
            download();
          }
        }
      });
    }
    download();
  };

  // 6 设备信息接口
  // 6.1 获取当前网络状态
  document.querySelector('#getNetworkType').onclick = function () {
    wx.getNetworkType({
      success: function (res) {
        alert(res.networkType);
      },
      fail: function (res) {
        alert(JSON.stringify(res));
      }
    });
  };

  // 7 地理位置接口
  // 7.1 查看地理位置
  document.querySelector('#openLocation').onclick = function () {
    wx.openLocation({
      latitude: 23.099994,
      longitude: 113.324520,
      name: 'TIT 创意园',
      address: '广州市海珠区新港中路 397 号',
      scale: 14,
      infoUrl: 'http://weixin.qq.com'
    });
  };

  // 7.2 获取当前地理位置
  document.querySelector('#getLocation').onclick = function () {
    wx.getLocation({
      success: function (res) {
        alert(JSON.stringify(res));
      },
      cancel: function (res) {
        alert('用户拒绝授权获取地理位置');
      }
    });
  };

  // 8 界面操作接口
  // 8.1 隐藏右上角菜单
  document.querySelector('#hideOptionMenu').onclick = function () {
    wx.hideOptionMenu();
  };

  // 8.2 显示右上角菜单
  document.querySelector('#showOptionMenu').onclick = function () {
    wx.showOptionMenu();
  };

  // 8.3 批量隐藏菜单项
  document.querySelector('#hideMenuItems').onclick = function () {
    wx.hideMenuItems({
      menuList: [
        'menuItem:readMode', // 阅读模式
        'menuItem:share:timeline', // 分享到朋友圈
        'menuItem:copyUrl' // 复制链接
      ],
      success: function (res) {
        alert('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
      },
      fail: function (res) {
        alert(JSON.stringify(res));
      }
    });
  };

  // 8.4 批量显示菜单项
  document.querySelector('#showMenuItems').onclick = function () {
    wx.showMenuItems({
      menuList: [
        'menuItem:readMode', // 阅读模式
        'menuItem:share:timeline', // 分享到朋友圈
        'menuItem:copyUrl' // 复制链接
      ],
      success: function (res) {
        alert('已显示“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
      },
      fail: function (res) {
        alert(JSON.stringify(res));
      }
    });
  };

  // 8.5 隐藏所有非基本菜单项
  document.querySelector('#hideAllNonBaseMenuItem').onclick = function () {
    wx.hideAllNonBaseMenuItem({
      success: function () {
        alert('已隐藏所有非基本菜单项');
      }
    });
  };

  // 8.6 显示所有被隐藏的非基本菜单项
  document.querySelector('#showAllNonBaseMenuItem').onclick = function () {
    wx.showAllNonBaseMenuItem({
      success: function () {
        alert('已显示所有非基本菜单项');
      }
    });
  };

  // 8.7 关闭当前窗口
  document.querySelector('#closeWindow').onclick = function () {
    wx.closeWindow();
  };

  // 9 微信原生接口
  // 9.1.1 扫描二维码并返回结果
  document.querySelector('#scanQRCode0').onclick = function () {
    wx.scanQRCode();
  };
  // 9.1.2 扫描二维码并返回结果
  document.querySelector('#scanQRCode1').onclick = function () {
    wx.scanQRCode({
      needResult: 1,
      desc: 'scanQRCode desc',
      success: function (res) {
        alert(JSON.stringify(res));
      }
    });
  };

  // 10 微信支付接口
  // 10.1 发起一个支付请求
  document.querySelector('#chooseWXPay').onclick = function () {
    // 注意：此 Demo 使用 2.7 版本支付接口实现，建议使用此接口时参考微信支付相关最新文档。
    var param = '{"appId":"wxaa8d6f34c8d0a56b","nonceStr":"i3t6goa5su2kss3fot1bu3vqtb5t6vaa","package":"prepay_id=wx201511051647029f1942de210752848011","signType":"MD5","timeStamp":"1446713222","paySign":"4F488517783ADC80838A14A0139B4062"}';
    param = JSON.parse(param);
    wx.chooseWXPay(param);
    // wx.chooseWXPay({
    //   timestamp: 1414723227,
    //   nonceStr: 'noncestr',
    //   package: 'addition=action_id%3dgaby1234%26limit_pay%3d&bank_type=WX&body=innertest&fee_type=1&input_charset=GBK&notify_url=http%3A%2F%2F120.204.206.246%2Fcgi-bin%2Fmmsupport-bin%2Fnotifypay&out_trade_no=1414723227818375338&partner=1900000109&spbill_create_ip=127.0.0.1&total_fee=1&sign=432B647FE95C7BF73BCD177CEECBEF8D',
    //   signType: 'SHA1', // 注意：新版支付接口使用 MD5 加密
    //   paySign: 'bd5b1933cda6e9548862944836a9b52e8c9a2b69'
    // });
  };


  // 11.3  跳转微信商品页
  document.querySelector('#openProductSpecificView').onclick = function () {
    wx.openProductSpecificView({
      productId: 'pDF3iY_m2M7EQ5EKKKWd95kAxfNw'
    });
  };

  // 12 微信卡券接口
  // 12.1 添加卡券
  document.querySelector('#addCard').onclick = function () {
    wx.addCard({
      cardList: [
        {
          cardId: 'pDF3iY9tv9zCGCj4jTXFOo1DxHdo',
          cardExt: '{"code": "", "openid": "", "timestamp": "1418301401", "signature":"f54dae85e7807cc9525ccc127b4796e021f05b33"}'
        },
        {
          cardId: 'pDF3iY9tv9zCGCj4jTXFOo1DxHdo',
          cardExt: '{"code": "", "openid": "", "timestamp": "1418301401", "signature":"f54dae85e7807cc9525ccc127b4796e021f05b33"}'
        }
      ],
      success: function (res) {
        alert('已添加卡券：' + JSON.stringify(res.cardList));
      }
    });
  };

  // 12.2 选择卡券
  document.querySelector('#chooseCard').onclick = function () {
    wx.chooseCard({
      cardSign: '97e9c5e58aab3bdf6fd6150e599d7e5806e5cb91',
      timestamp: 1417504553,
      nonceStr: 'k0hGdSXKZEj3Min5',
      success: function (res) {
        alert('已选择卡券：' + JSON.stringify(res.cardList));
      }
    });
  };

  // 12.3 查看卡券
  document.querySelector('#openCard').onclick = function () {
    alert('您没有该公众号的卡券无法打开卡券。');
    wx.openCard({
      cardList: [
      ]
    });
  };

  var jssdkHref = location.href;
  var shareData = {
    title: '微信JS-SDK Demo',
    desc: '微信JS-SDK,帮助第三方为用户提供更优质的移动web服务',
    link: jssdkHref,
    // link: 'http://demo.open.weixin.qq.com/jssdk/',
    imgUrl: 'http://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRt8Qia4lv7k3M9J1SKqKCImxJCt7j9rHYicKDI45jRPBxdzdyREWnk0ia0N5TMnMfth7SdxtzMvVgXg/0'
  };
  wx.onMenuShareAppMessage(shareData);
  wx.onMenuShareTimeline(shareData);
});

wx.error(function (res) {
  alert(res.errMsg);
});
