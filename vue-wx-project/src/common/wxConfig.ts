
const wx = require('weixin-js-sdk');
const userappId = '111111111';
export default function wxConfig(SignatureObj: any) {
 wx.config({
  debug: true,
  appId: userappId,
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
