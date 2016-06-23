<?php
require_once "jssdk.php";
//请填写您的 appId appSecret
$jssdk = new JSSDK("您的 appId ", "您的 appSecret ");


//这里必须和页面地址相同,如果，设置 'http://.../jssdk/',
//省略了 index.html，那么访问此路径是 OK 的，
//但访问带index.html的路径，则会报错 config:invalid signature
//$url = "http://test.luoshan.ren/jssdk/";
//$url = "http://test.luoshan.ren/jssdk/";

$url = $_GET['url'];
$signPackage = $jssdk->GetSignPackage($url);

/*
appId: '<?php echo $signPackage["appId"];?>',
timestamp: <?php echo $signPackage["timestamp"];?>,
nonceStr: '<?php echo $signPackage["nonceStr"];?>',
signature: '<?php echo $signPackage["signature"];?>',
*/

$response = json_encode($signPackage);

//$api = '{"appId": }';
//$html=file_get_contents($api);
echo $response;

?>
