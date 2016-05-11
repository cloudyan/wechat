(function(){
  // 微信登录获取 code
  // 如果是测试，跳中转业面，返回当前页，否则直接跳当前页面

  var wechat_oauth_host = 'http://m.iqianggou.com'
  var debug = false;
  var hostname = location.hostname
  var codeDebug = hostname.match(/^m\.iqianggou\.com$/) ? false : true,
    codeDebugPath = '/tests/wechat/code.html';
  //var wechat_login_host = location.origin;
  var bindtype = '',jumpurl = '';

  var getRedirectUrl = function(type, jumpurl){
    var redirectUrl;

    if(codeDebug){
      //途径中转页面
      redirectUrl = wechat_oauth_host + codeDebugPath + '?usertype=' + type;
      redirectUrl = redirectUrl + '&jumpurl=' + encodeURIComponent(jumpurl);
    }else{
      //直接跳转当前页面
      redirectUrl = jumpurl + '?usertype=' + type;
    }
    return encodeURIComponent(redirectUrl);
  }

  var jumpWechatUrl = function(type, url){
    var time = +new Date(),
      url = url || (location.origin + location.pathname);

    var scope = type === 'snsapi_userinfo' ? 'snsapi_userinfo' : 'snsapi_base';
    var wechat_login_redirect = getRedirectUrl(scope, url);

    return 'https://open.weixin.qq.com/connect/oauth2/authorize'+
      '?appid=wxaa8d6f34c8d0a56b' +
      '&redirect_uri=' + wechat_login_redirect +
      '&response_type=code'+
      '&scope=' + scope +
      '&state=' + time +
      '#wechat_redirect'
  }

  window.jumpWechatUrl = jumpWechatUrl;
})();