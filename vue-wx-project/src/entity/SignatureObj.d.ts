/**
 * 微信签名config
 */
export class SignatureObj {
   public debug?: boolean;
   public appId?: string;
   public timeStamp?: number; // 必填，生成签名的时间戳
   public nonceStr?: string; // 必填，生成签名的随机串
   public signature?: string; // 必填，签名
   public jsApiList?: string[]; // 必填，需要使用的JS接口列表
}
/**
 * 签名接口返回值
 */
export class WeChatSignature  {
   public timeStamp?: number; // 必填，生成签名的时间戳
   public nonceStr?: string; // 必填，生成签名的随机串
   public signature?: string; // 必填，签名
   public url?: string;
}
