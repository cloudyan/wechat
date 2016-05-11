
//HTML5 Mobile头像上传裁切


$(function(){

  var zoomObj;

  var clipImageBtn = $('#clipImageBtn');
  var dragContainer = $('.pinch-zoom-container');
  var clipImage = $('.clipImage')[0];
  var clipResult = $('.clipResult');
  var cilpedFile;


  $('div.pinch-zoom').each(function () {
    zoomObj = new RTP.PinchZoom($(this), {
        clipArea: true,
        dragOffset: true,
        maxZoom: 10,
        minZoom: 0.4
    });
  });

  //var resizer = RTP;
  //console.log(zoomObj)
  window.zoomObj = zoomObj;
  zoomObj.image = clipImage;
  
  clipImageBtn.click(function(){
    if( !(Uint8Array&&HTMLCanvasElement&&atob&&Blob) ){
      var tip = "<p>Your browser doesn't support these feature:</p><ul><li>canvas</li><li>Blob</li><li>Uint8Array</li><li>FormData</li><li>atob</li></ul>";
      tip = "<p>您的浏览器不支持裁剪图片的功能</p>";
      clipResult.html( tip );
      return false;
    }
    zoomObj.clipImage();
  })
  

  zoomObj.doneCallback = function(file){
      cilpedFile=file;
  };
  $('input[type=file]').change(function(event){
      var file=this.files[0];
      
      clipResult.find('canvas').detach();

      var reader=new FileReader();
      reader.onload=function(){
          zoomObj.image.src=reader.result;
          reader=null;
      };
      reader.readAsDataURL(file);
  });


  zoomObj.clipImage = function(){

    //此处注意，裁剪区域和图片区域要一样大小，因为缩放是盒子，裁剪的却是图片 
    //this.image = $('.clipImage')[0];
    this.clipArea = this.container.find('.clipArea');
    console.log(this);
    var nh=this.image.naturalHeight,
        nw=this.image.naturalWidth,
        size=nw>nh?nh:nw;

    var width = this.clipArea.offset().width;
    size=size>1000?1000:size;
    size= (size>width ? width : 240)*2;

    var canvas=$('<canvas width="'+size+'" height="'+size+'"></canvas>')[0],
        ctx=canvas.getContext('2d'),
        scale=nw/this.el.width();
        
    var clipAreaOffset = {
      top: this.clipArea.offset().top - this.el.offset().top,
      left: this.clipArea.offset().left - this.el.offset().left,
      size: this.clipArea.offset().width
    }

    var x=clipAreaOffset.left*scale,
        y=clipAreaOffset.top*scale,
        w=clipAreaOffset.size*scale,
        h=clipAreaOffset.size*scale;

    ctx.drawImage(this.image,x,y,w,h,0,0,size,size);
    var src=canvas.toDataURL();
    this.canvas=canvas;
    clipResult.find('canvas').detach();
    clipResult.append(canvas);
    //this.addClass('uploading');
    //this.removeClass('have-img');

/*
这时我们要获取 canvas 中图片的信息，用 toDataURL 就可以转换成上面用到的 DataURL 。
然后取出其中 base64 信息，再用 window.atob 转换成由二进制字符串。
但 window.atob 转换后的结果仍然是字符串，直接给 Blob 还是会出错。
所以又要用 Uint8Array 转换一下。

注意：超过6M 的照片，blob/dataURL 不会输出，这是 IOS system limitation
详情：http://stackoverflow.com/questions/26152652/ios-html5-canvas-todataurl

dataURL 的格式为 “data:image/png;base64,****”,逗号之前都是一些说明性的文字，我们只需要逗号之后的就行了
canvas.toDataURL 返回的默认格式就是 image/png
 */

    src=src.split(',')[1];
    if(!src)return this.doneCallback(null);
    src=window.atob(src);
    
    var ia = new Uint8Array(src.length);
    for (var i = 0; i < src.length; i++) {
        ia[i] = src.charCodeAt(i);
    };
    
    this.doneCallback(new Blob([ia], {type:"image/png"}));
    //console.log(size);
  }

  var fd=new FormData();

  $('#submitImage').click(function(){
      //curl https://api.linkface.cn/v0/stats?api_user=duoweidu_test&api_key=4b0eb75530db48878fd4ce12e23fdc20
      var url= 'https://api.linkface.cn/v0/stats?api_user=duoweidu_test&api_key=4b0eb75530db48878fd4ce12e23fdc20';
      if(!cilpedFile)return;
      var fd=new FormData();
      fd.append('file',cilpedFile);
      $.ajax({
          type: 'POST',
          url: url,
          data: fd,
          dataType: 'json',    // return data
          processData: false,  // 告诉 ajax 不要去处理发送的数据
          //contentType: false,  // 告诉 ajax 不要去设置Content-Type请求头
          timeout: 1000,
          success: function(data){
            console.log(data);
          },
          error: function(xhr, type){
            console.log('Ajax error!')
          }
      });
  });

})