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
          <span class="hh">{{time.hour}}</span> :
          <span class="mm">{{time.min}}</span> :
          <span class="ss">{{time.sec}}</span>
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
        <span v-cloak> {{order.content}}（{{order.doctor.name||''}}）</span>
      </div>

    </div>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Watch } from "vue-property-decorator";
  @Component
  export default class WxPay extends Vue {
    order!: Order.OrderInfo;
    // = {
    //   id: 1000000433602663,
    //   patient: {
    //     id: 1,
    //     name: "潘振东"
    //   },
    //   phase: 1,
    //   price: 0.01,
    //   content: "运动处方：1次",
    //   addTime: 1540177160000,
    //   depositPrice: 0,
    //   wxPayInfoEntity: {
    //     id: 1,
    //     title: "关爱心脏康复，请帮我付费",
    //     subtitle: "我正在进行心脏康复运动，需要你的关心，快帮我付款吧！",
    //     urlTemplate:
    //       "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc1755ba87a7baa57&redirect_uri=http://www.creyond.com/ppay/wxpay?order_id={id}&response_type=CODE&scope=snsapi_base&url=http://tmxz.viphk1.ngrok.org",
    //     addTime: null,
    //     updateTime: null
    //   },
    //   doctor: {
    //     id: 23,
    //     name: "姚梦"
    //   },
    //   type: 1
    // };
    counttime!: number;
    time: {
      hour: string;
      min: string;
      sec: string;
    } = {
      hour: "00",
      min: "00",
      sec: "00"
    };
    //-ui-----
    loadding: boolean = false;
    /**
     * 监听倒计时变化页面
     */
    @Watch("counttime")
    countimeUpdate() {
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
    created() {
      this.countDown(this.order.addTime);
      this.loadding = true;
    }
    /**
     * 倒计时
     */
    countDown(time: number) {
      this.counttime = (time + 86400000 - new Date().getTime()) / 1000;
      if (this.counttime <= 0) {
        this.counttime = 0;
      } else {
        let Interval = setInterval(() => {
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
    pay() {}
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