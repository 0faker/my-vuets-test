// import 'http://res2.wx.qq.com/open/js/jweixin-1.4.0.js';
declare var wx: any;
class wxApi {
 /**
  * 微信签名
  * @param SignatureObj 
  */
 public wxConfig(SignatureObj: any) {
  wx.config({
   debug: false,
   appId: 'wxc1755ba87a7baa57',
   timestamp: SignatureObj.timeStamp, // 必填，生成签名的时间戳
   nonceStr: SignatureObj.nonceStr, // 必填，生成签名的随机串
   signature: SignatureObj.signature, // 必填，签名
   jsApiList: [
    'scanQRCode', // 扫码
    'chooseWXPay', // 支付
    'closeWindow', // 关闭微信
    'getLocation', // 定位
   ], // 必填，需要使用的JS接口列表
  });
  wx.ready();

 }
 /**
  * 微信支付签名
  * type 代付:pay  购买:shop
  * SignatureObj :支付签名
  */
 wxPayConfig(type: string, SignatureObj: any) {
  wx.chooseWXPay({
   // appid: "wxc1755ba87a7baa57",
   timestamp: SignatureObj.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
   nonceStr: SignatureObj.nonceStr, // 支付签名随机串，不长于 32 位
   package: SignatureObj.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
   signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
   paySign: SignatureObj.sign, // 支付签名
   success: (res: any) => {
    // 支付成功后的回调函数
    // alert("just");
   },
   fail: (error: any) => {
   }
  });
 }

}
export default new wxApi();
