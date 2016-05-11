// 获取url参数
// 这个方法还是有问题？什么问题？
// 问题如下：针对下面格式的代码，没有正确解析 code 参数
// http://m.iqianggou.com/wechat/code.html?usertype=snsapi_userinfo&bindtype=bindwechat&jumpurl=http%3A%2F%2F10.0.0.119%3A8000%2Fwechat%2Fafterlogin%3Fbindtype%3Dbindwechat&code=0318f4f9425b94e272a68e58c81e0b5f&state=1440125203301
// 
// 
/**
 * @method getQuery
 * @desc 增强getQuery方法 getQuery('from') 处理框架无法取带两个encode参数的from
 * @param query {string} 链接中的query.
 * @param *surl {string} 目标链接，如果不存在，hybrid模式下取hash, web模式下取search
 * @param *urlfix {string} 结束标识，如果不存在，默认设置为 “&”
 *
 * @returns {string} 返回链接中的query值. 
 */
function getQuery(query, url, urlfix) {
  url = url || location.search;
  // if(Lizard.isHybrid){
  //   url = url || decodeURIComponent(location.hash);
  // } else{
  //   url = url || location.search;
  // }
  var param = "";
  var paramStart = url.indexOf(query + "=");
  if (paramStart < 0) {
    return param;
  } else {
    paramStart += query.length + 1;
    urlfix = urlfix || "&";
    var paramEnd = url.substr(paramStart).indexOf(urlfix);
    if (paramEnd > 0) {
      param = url.substring(paramStart, paramStart + paramEnd);
    } else {
      param = url.substr(paramStart);
    }
  }
  return decodeURIComponent(param);
}
//叶小钗的方法
function getUrlParam(key, url, urlfix) {
  if (!url) url = window.location.href;
  urlfix = urlfix || "&";

  var searchReg = /([^&=?]+)=([^&]+)/g;
  var urlReg = /\/+.*\?/;
  var arrayReg = /(.+)\[\]$/;
  var urlParams = {};
  var match, name, value, isArray;

  //这里为什么要 decode？导致上面示例无法正常取 code 值
  //window.location.href;这里默认本身就是 decode 好的数值，
  //再 decode 会导致 jumpurl 参数被 decode,导致反常
  //url = decodeURIComponent(url); 
  
  while (match = searchReg.exec(url)) {
    name = match[1];
    value = match[2];
    isArray = name.match(arrayReg);
    //处理参数为url这种情况
    if (urlReg.test(value)) {
      urlParams[name] = url.substr(url.indexOf(value));
      break;
    } else {
      if (isArray) {
        name = isArray[1];
        urlParams[name] = urlParams[name] || [];
        urlParams[name].push(value);
      } else {
        urlParams[name] = value;
      }
    }
  }

  return key ? urlParams[key] : urlParams;
};
( function(){
    function LoadJS( jsUrl ) {
      var oHead = document.getElementsByTagName('BODY').item(0);
      //var oHead = document.getElementById('tongji')
      var oScript= document.createElement("script"); 
      oScript.type = "text/javascript"; 
      oScript.src=jsUrl; 
      oHead.appendChild( oScript); 
    };

    var time;
    time = new Date().getTime() || 2;
    var stamp = !time ? '' : ('?t=' + time);
    
    var debug = getUrlParam('debug');
    if(debug){
      LoadJS('proxyOauth.js' + stamp);
    }else{
      LoadJS('proxyOauth.js');
    }
     
    setTimeout(function(){
      //LoadJS('./js/clipPhoto.js' + stamp);
    },300)
    
    // 
    
} )();