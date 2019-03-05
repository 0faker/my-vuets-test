<template>
  <div
    class="wx_pay"
    v-if="loadding"
  >
    <span class="top">我正在进行心脏康复/预防运动，需要你的关心，快帮我付款吧！</span>
    <main>
      <div class="main_t">
        <img
          src="../assets/pay_request_man_running.png"
          alt=""
        >
        <div>代付金额:</div>
        <div v-cloak>￥{{order.price}}</div>
        <div>
          <span></span>

        </div>
      </div>
      <div class="time_out">
        <span>剩余支付时间：</span>
        <span>
          <span
            v-cloak
            class="hh"
          >{{time.hour}}</span> :
          <span
            v-cloak
            class="mm"
          >{{time.min}}</span> :
          <span
            v-cloak
            class="ss"
          >{{time.sec}}</span>
        </span>
      </div>
      <div
        class="help"
        @click="pay"
      >
        帮忙支付
      </div>
    </main>
    <div class="msgs">
      <div>说明：</div>
      <div>1.付款前务必和好友再次确认，避免是诈骗行为;</div>
      <div>2.如果发生退款，钱将退到你的微信账户里。</div>
    </div>
    <div class="shopnews">
      <div>服务内容：
        <span v-cloak> {{order.content}}</span>
        <span v-cloak>（{{order.doctor.name||''}}）</span>
      </div>

    </div>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Watch } from "vue-property-decorator";
  import common from "../common/common";
  import { SignatureObj, WeChatSignature } from "../entity/SignatureObj";
  import wxApi from "../common/wxConfig";
  declare var wx: any;
  @Component
  export default class WxPay extends Vue {
    public order!: Order.OrderInfo;
    orderId!: number;
    openId!: number;
    public SignatureObj?: SignatureObj; // 微信签名
    public url: string = location.href;

    public counttime!: number;
    public time: {
      hour: string;
      min: string;
      sec: string;
    } = {
      hour: "00",
      min: "00",
      sec: "00"
    };
    // -ui-----
    public loadding: boolean = false;
    /**
     * 监听倒计时变化页面
     */
    @Watch("counttime")
    public countimeUpdate() {
      this.time.hour = Math.floor(this.counttime / 3600) + "";
      if (+this.time.hour < 10) {
        this.time.hour = "0" + this.time.hour;
      }
      this.time.min = Math.floor((this.counttime / 60) % 60) + "";
      if (+this.time.min < 10) {
        this.time.min = "0" + this.time.min;
      }
      this.time.sec = Math.floor(this.counttime % 60) + "";
      if (+this.time.sec < 10) {
        this.time.sec = "0" + this.time.sec;
      }
    }
    public created() {
      this.getOrder();
      this.orderId = +this.$route.query.order_id;
      this.getOpenid();
    }
    /**
     * 获取openid
     */
    getOpenid() {
      const Code: string = this.$route.query.code.toString();
      this.$server.GetOpenid(Code).then((res: any) => {
        this.openId = res.result;
        this.countDown(this.order.addTime);
        this.loadding = true;
      });
    }
    /**
     * 获取订单信息
     */
    getOrder() {
      this.$server.GetOrderNews(this.orderId).then(res => {
        this.order = res.result;
        // 异常订单
        if (this.order.phase != 0) {
          {
            this.$router.replace({
              path: `/unusual/${this.order.phase}`
            });
          }
        }
      });
    }
    /**
     * 倒计时
     */
    public countDown(time: number) {
      this.counttime = (time + 86400000 - new Date().getTime()) / 1000;
      if (this.counttime <= 0) {
        this.counttime = 0;
      } else {
        const Interval = setInterval(() => {
          if (this.counttime <= 0) {
            clearInterval(Interval);
          }
          this.counttime--;
        }, 1000);
      }
    }
    /**
     * 支付
     */
    public pay() {
      // if (common.getPhoneType() !== "ios") {
      this.$server.getWxConfig(this.url).then((res: WeChatSignature) => {
        this.SignatureObj = {
          debug: false,
          nonceStr: res.nonceStr,
          signature: res.signature,
          timeStamp: res.timeStamp,
          jsApiList: []
        };
        wxApi.wxConfig(this.SignatureObj);
        this.chooseWXPay();
      });
      // } else {
      //   this.chooseWXPay();
      // }
    }
    /**
     * 微信支付
     */
    chooseWXPay() {
      this.$server
        .GetWxPaySignature(this.orderId, this.openId)
        .then((res: any) => {
          const paySign = JSON.parse(res.result);
          wx.chooseWXPay({
            // appid: "wxc1755ba87a7baa57",
            timestamp: paySign.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: paySign.nonceStr, // 支付签名随机串，不长于 32 位
            package: paySign.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: paySign.sign, // 支付签名
            success: (respose: any) => {
              // 支付成功后的回调函数
              this.$router.push({ path: "/wxpaysuccess" });
            },
            fail: (error: any) => {
              this.$router.push({ path: "/wxpayfail" });
              //
            }
          });
        });
    }
  }
</script>
<style lang='scss' scoped>
  .wx_pay {
    color: #353536;
    width: 100%;
    min-height: 100%;
    padding: 1rem;
    .top {
      font-size: 1.25rem;
      text-align: left;
      display: block;
      color: #262e4f;
      line-height: 1.5;
    }
    main {
      width: 70%;
      margin: 2.4rem auto;

      > .main_t {
        text-align: center;
        min-height: 11rem;

        position: relative;
        color: #fff;
        padding: 0.8rem;
        // padding-bottom: 2rem;
        font-size: 1.25rem;
        flex-direction: column;
        background: linear-gradient(-90deg, #fd8273 0%, #fa695e 100%);
        border-radius: 0.7rem;
        > img {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 5.12rem;
          // height: 2.12rem;
        }
        > div:nth-of-type(1) {
          // flex: 2;
          color: #fff;
          padding: 0.4rem;
          text-align: left;
        }
        > div:nth-of-type(2) {
          // flex: 3;
          color: #fff;

          padding: 0.2rem;
          font-size: 2.67rem;
          line-height: 1.5;
        }
        > div:nth-of-type(3) {
          color: #fff;
          padding: 0.1rem 0.1rem 0;
          // flex: 2;
          text-align: right;
        }
      }
      > .time_out {
        margin: 1.8rem 0 2.75rem;
        font-size: 1.25rem;
        color: #212121;
        > span {
          > span {
            font-size: 1rem;
            color: #ffffff;
            letter-spacing: 0;
            min-width: 1.25rem;
            background-color: #212121;
            padding: 0 0.2rem;
            border-radius: 4px;
          }
        }
      }
      > .help {
        width: 100%;
        background-image: linear-gradient(153deg, #83d888 0%, #4caf50 95%);
        border-radius: 10rem;
        color: #fff;
        font-size: 1.25rem;
        padding: 0.6rem;
        text-align: center;
      }
    }
    .msgs {
      color: #979797;
      padding: 1rem 0;
      > div {
        text-align: left;
        font-size: 1.25rem;
      }
    }
    .shopnews {
      // margin-top: 2rem;
      padding: 0.6rem 0;
      line-height: 1.2rem;
      border-top: 1px solid #f0f0f0;
      border-bottom: 1px solid #f0f0f0;
      > div {
        text-align: left;
        font-size: 1.25rem;
        color: #353536;
        letter-spacing: 0;
        > span {
          color: #171718;
          font-weight: 600;
        }
      }
    }
  }
  .service {
    display: inline-block;
    font-weight: 600;
  }
  .server {
    font-weight: normal;
    vertical-align: top;
    font-style: normal;
  }
</style>