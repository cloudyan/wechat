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
      var oHead = document.getElementsByTagName('HEAD').item(0);
      //var oHead = document.getElementById('tongji')
      var oScript= document.createElement("script"); 
      oScript.type = "text/javascript"; 
      oScript.src=jsUrl; 
      oHead.appendChild( oScript); 
    };

    var time;
    time = new Date().getTime() || 2;
    var stamp = !time ? '' : ('?t=' + time);
    
    // LoadJS('./js/pinchzoom.js' + stamp);
    // LoadJS('./component.js' + stamp);
    LoadJS('./js/demo.js' + stamp);
    LoadJS('./js/jumpWechatUrl.js' + stamp);
    // LoadJS('./photo.js' + stamp);
     
    // setTimeout(function(){
    //   LoadJS('./js/clipPhoto.js' + stamp);
    // },300)
    
    // 
    
} )();