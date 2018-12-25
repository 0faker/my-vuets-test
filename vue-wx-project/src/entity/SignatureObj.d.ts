/**
 * 微信签名config
 */
export class SignatureObj {
   debug?: boolean;
   appId?: string;
   timestamp?: number; // 必填，生成签名的时间戳
   nonceStr?: string; // 必填，生成签名的随机串
   signature?: string; // 必填，签名
   jsApiList?: string[]; // 必填，需要使用的JS接口列表
}
/**
 * 签名接口返回值
 */
export class WeChatSignature  {
   timeStamp?: number; // 必填，生成签名的时间戳
   nonceStr?: string; // 必填，生成签名的随机串
   signature?: string; // 必填，签名
   url?: string;
}
