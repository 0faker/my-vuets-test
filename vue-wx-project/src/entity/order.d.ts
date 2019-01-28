// 订单信息
declare namespace Order {
 //订单信息 
 export interface OrderInfo {
  id: number;
  patient: {
   id: number,
   name: string
  };
  phase: number;// 0: 待支付；1: 支付成功；2: 取消支付；3: 失效；
  price: number; // 价格
  content: string;
  addTime: number;
  depositPrice: number;
  wxPayInfoEntity: WxPayInfoEntity;
  type: number;// 1 代表服务订单 3代表重领设备订单
  doctor: {
   id: number,
   name: string
  };
 }
 export interface WxPayInfoEntity {
  id: number;
  title: string;
  // 标题
  subtitle: string;
  // 副标题
  urlTemplate: string;
  // 代付链接
  addTime: string;
  updateTime: string;

 }
}