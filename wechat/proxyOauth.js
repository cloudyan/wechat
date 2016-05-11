
/*
通过调用微信的接口，回跳到此页面，获得 code 再转到指定的开发环境 url，避免了微信授权页面redirect_uri只能指定同一域问题（子域都不行）

https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaa8d6f34c8d0a56b&redirect_uri=http%3A%2F%2Fm.iqianggou.com%2Fwechat%2Fafterlogin%3Fusertype%3Dsnsapi_userinfo%26bindtype%3Dbindwechat&response_type=code&scope=snsapi_userinfo&state=1440050901004&connect_redirect=1#wechat_redirect

h5.m.iqianggou.com
 */
if(!window._){
  window._ = {};
}

;(function(){
  // url参数
  
  var urlObj = getUrlParam();

  //微信跳转的地址
  var searchParam,
      wechat_oauth_host = 'http://m.iqianggou.com',
      urlpath = '/tests/wechat/code.html'
      bindtype = urlObj.bindtype || 'snsapi_base',
      jumpurl = urlObj.jumpurl,
      code = urlObj.code;

  var getRedirectUrl = function(type){
    var redirectUrl = wechat_oauth_host + urlpath + '?usertype=' + type;
    if(bindtype){
	  redirectUrl = redirectUrl + '&bindtype=' + bindtype;
    }
    if(jumpurl){
	  redirectUrl = redirectUrl + '&jumpurl=' + encodeURIComponent(jumpurl);
    }
    return encodeURIComponent(redirectUrl);
  }

  var jumpWechatUrl = function(usertype, tempurl){
    if(tempurl){
      jumpurl = tempurl;
    }
    var time = new Date().getTime();
    var scope = usertype === 'snsapi_userinfo' ? 'snsapi_userinfo' : 'snsapi_base';
    var wechat_login_redirect = getRedirectUrl(scope);

    return 'https://open.weixin.qq.com/connect/oauth2/authorize'+
        '?appid=wxaa8d6f34c8d0a56b' +
        '&redirect_uri=' + wechat_login_redirect +
        '&response_type=code'+
        '&scope=' + scope +
        '&state=' + time +
        '#wechat_redirect'
  }

  _.geturl = _.urlGenerator = jumpWechatUrl

  //生成一个可测试的中转地址：
  //getRedirectUrl("snsapi_userinfo", "http://10.0.0.119/wechat/index.html")
  
  console.log(location.href);
  console.log('使用下面方法生成一个可测试的中转地址：');
  console.log('_.urlGenerator("snsapi_userinfo", "http://10.0.0.119/wechat/index.html")')
  console.log('_.urlGenerator("snsapi_base", "http://10.0.0.119/wechat/index.html")')

  var defaultUrl = '<a href="' + _.geturl('snsapi_base') + '">无 code，请点击此处</a>';
  var codeBox = document.getElementById('code');
  codeBox.innerHTML = code || defaultUrl;
  /*
  生成的地址类似下面这种
  https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaa8d6f34c8d0a56b&redirect_uri=http%3A%2F%2Fm.iqianggou.com%2Ftests%2Fwechat%2Fcode.html%3Fusertype%3Dsnsapi_userinfo%26bindtype%3Dsnsapi_base%26jumpurl%3Dhttp%253A%252F%252F10.0.0.119%252Fwechat%252Findex.html&response_type=code&scope=snsapi_userinfo&state=1440067187699&connect_redirect=1#wechat_redirect
   */

  if(code){
    searchParam = location.search;
  }
  if(searchParam && jumpurl){
    var temp = '&jumpurl=' + jumpurl;
    url = decodeURIComponent(jumpurl);
    var urlfix = '?'
    if( url.indexOf("?") !== -1 ){
      urlfix = '&'
    }
    debugger;
    url = url + urlfix + searchParam.replace(temp, '').replace('?','');
    console.log(url)
    //这里要注意，跳转之后，要把当前这两个页面过滤掉，
    //一个是微信授权页面，一个是此页面，在 afterlogin back操作之前去掉
    location.href = url;
  }

})();


