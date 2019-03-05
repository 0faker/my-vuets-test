<template>
  <div
    class='login'
    v-if='loadding'
  >
    <header>
      登录
    </header>
    <div
      v-if='warn'
      class='warn'
    >验证码已发送，有效期为五分钟，请尽快输入。</div>
    <div class='tel'>
      <input
        type='tel'
        placeholder='请输入您的手机号'
        v-model='showTel'
        maxlength=13
        @input='verifyPhone'
      >
      <div
        class="clear"
        v-if='showClear'
        @click="clear"
      >
        <img
          src="../assets/delete.png"
          alt=""
        >
      </div>
    </div>
    <div class='code'>
      <input
        type='text'
        pattern='[0-9]*'
        maxlength=4
        placeholder='输入验证码'
        @input='verifyCode'
        v-model='code'
      >
      <input
        type="button"
        class='get-code'
        :style='{backgroundColor:activeCodeColor}'
        :disabled='isCanGetCode'
        @click='sendSMSCode'
        v-model="codeMsg"
      >
      <div
        class='wrongCodeMsg'
        v-if='showWrongCodeMsg'
        v-cloak
      >
        {{wrongCodeMsg}}
      </div>
    </div>

    <button
      class='load'
      :disabled='isCanLogin'
      :style='{backgroundColor:activeLoginColor}'
      @click="login"
    >
      登录
    </button>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Watch } from "vue-property-decorator";
  import Common from "../common/common";
  import * as ls from "local-storage";
  import Axios from "axios";
  import wxApi from "../common/wxConfig";
  import { SignatureObj, WeChatSignature } from "../entity/SignatureObj";
  @Component
  export default class LoginComponent extends Vue {
    public SignatureObj?: SignatureObj; // 微信签名
    private wxCode?: string; // 微信code
    private tel: string = ""; // 号码
    private showTel: string = ""; // 输入框中显示的号码
    private clearable: boolean = true; // 清空按钮
    private warn: boolean = false; // 提示语
    private code: string = ""; // 验证码
    private isSendedCode: boolean = false; // 是否已发送验证码
    private wrongCodeMsg?: string = ""; // 验证码错误提示
    private showWrongCodeMsg?: boolean; // 验证码错误提示显示
    // ----ui-----
    private isCanGetCode: boolean = true; // 获取验证码可点击
    private codeMsg: string = "获取验证码"; // 验证码内文字
    public isSendCode: boolean = false; // 是否可再发送验证码
    private activeCodeColor?: string; // 获取验证码按钮颜色
    private isCanLogin: boolean = true; // 登录按钮可用状态
    private activeLoginColor?: string; // 登录按钮颜色
    private loadding: boolean = false;
    showClear: boolean = false;
    public url: string = location.href;

    unionId!: number;
    openId!: number;
    created() {
      this.wrongCodeMsg = "验证码有误，请重新输入！";
      this.showWrongCodeMsg = false;
      this.activeCodeColor = "#6d726d";
      // this.codeMsg = "获取验证码";
      this.isCanLogin = true;
      this.activeLoginColor = "#6d726d";
      // this.warn = true;

      this.wxCode = this.$route.query.code.toString();
      console.log(this.wxCode);
      /**
       * ios微信签名
       */
      if (Common.getPhoneType() == "ios") {
        console.log(1234);
        this.$server.getWxConfig(this.url).then((res: any) => {
          this.SignatureObj = res.weChatSignature;
          wxApi.wxConfig(this.SignatureObj);
        });
      }
      this.getAuth();
    }
    /**
     * 登录第一步
     */
    private getAuth() {
      this.$server
        .getAuth({
          //  登陆类型
          logonEquipmentType: 2,
          // 用户登陆ip
          logonIp: "127.0.0.1",
          // 登陆设备编号
          equipmentId: "fromh5",
          logonMac: "o.o.o.o",
          origin: 2,
          code: this.wxCode
        })
        .then(res => {
          // 判断是否已登录(返回有token)
          if (res.Authorization) {
            if (res.wx) {
              ls.set("headImg", res.wx.headImgUrl);
            }
            // 保存token
            ls.set("Authorization", res.Authorization);
            Axios.defaults.headers = {
              Authorization: res.Authorization
            };
            this.$router.replace({ path: `user/${res.patient.id}` });
          } else {
            // 显示登录页面

            this.loadding = true;
            // 返回unionid
            this.unionId = res.unionid;
            this.openId = res.openid;
          }
        });
    }
    /**
     * 验证手机号
     */
    private verifyPhone() {
      const input: string = this.showTel;
      this.showTel = Common.change(input);
      this.tel = this.showTel.replace(/\s+/g, "");
      this.showClear = this.tel ? true : false;
      // 正则匹配
      if (Common.regPhone(+this.tel)) {
        // 匹配
        if (!this.isSendedCode) {
          this.isCanGetCode = false; // 不可点击
          this.activeCodeColor = "#4caf50";
        }
        this.activeLoginColor = this.code.length == 4 ? "#4caf50" : "#6d726d";
        this.isCanLogin = this.code.length == 4 ? true : false;
      } else {
        this.isCanGetCode = true;
        this.activeCodeColor = "#6d726d";
        this.activeLoginColor = "#6d726d";
      }
      this.verifyCode();
    }
    clear() {
      this.showTel = "";
      this.showClear = false;
    }
    /**
     * 发送验证码
     */
    private sendSMSCode() {
      this.$server
        .loginTest(this.tel)
        .then(res => {
          this.isSendedCode = true;
          this.isCanGetCode = true;
          this.activeCodeColor = "#6d726d";
          this.warn = true;
          // 设置倒计时
          let countdownNumber = 60; // 设置60s
          this.codeMsg = countdownNumber + "s";
          let countdown = setInterval(() => {
            countdownNumber--;
            console.log(this.codeMsg);
            this.codeMsg = countdownNumber + "s";
            if (countdownNumber < 0) {
              clearInterval(countdown);
              this.codeMsg = "重新获取";
              this.isSendedCode = false;
              this.activeCodeColor = "#4caf50";
              this.isCanGetCode = false;
            }
          }, 1000);
        })
        .catch(error => {});
    }
    /**
     * 验证码
     */
    private verifyCode() {
      if (Common.regPhone(+this.tel)) {
        this.isCanLogin = this.code.length == 4 ? false : true;
        this.activeLoginColor = this.code.length == 4 ? "#4caf50" : "#6d726d";
      }
    }
    /**
     * 登录
     */
    private login() {
      this.$server
        .login({
          //  登陆类型
          logonEquipmentType: 2,
          // 用户登陆ip
          logonIp: "127.0.0.1",
          // 登陆设备编号
          equipmentId: "fromh5",
          logonMac: "o.o.o.o",
          origin: 2,
          phone: this.tel,
          authCode: this.code,
          unionId: this.unionId,
          openId: this.openId
        })
        .then(res => {
          console.log(res);
        });
    }
  }
</script>
<style lang='scss' scoped>
  .login {
    width: 100%;
    height: 100%;
    > header {
      background-color: $baseGreen;
      width: 100%;
      height: 3.675rem;
      font-size: 1.5rem;
      line-height: 3.675rem;
      text-align: center;
      font-weight: normal;
      color: #fff;
      margin-bottom: 1.46rem;
      position: relative;
    }
    > .tel,
    > .code {
      outline: none;
      border: 0;
      width: 100%;
      position: relative;
      overflow: visible;
      > input {
        width: 100%;
        padding: 1.04rem 2.665rem !important;
        color: $fontcolor;
        font-size: 1.5rem;
        line-height: initial;
        &::-webkit-input-placeholder {
          color: $placeholderColor;
        }
        &:focus {
          outline: none;
          border: 0;
        }
      }
      > .clear {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 1.5rem;
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 50%;
        > img {
          width: 100%;
          height: 100%;
        }
      }
      > .get-code {
        font-size: 1.5rem;
        color: #fff;
        padding: 1.04rem 0rem !important;
        outline: 0;
        border: 0;
        width: 10rem;
        position: absolute;
        top: 0;
        right: 0%;
        z-index: 1;
        max-height: 100%;
      }
      > .wrongCodeMsg {
        position: absolute;
        color: $warnRed;
        bottom: -2rem;
        left: 2.664rem;
        font-size: 1.165rem;
        background-color: #fff;
        z-index: 1;
      }
      &:active {
        outline: none;
        border: 0;
      }
      &:after {
        outline: none;
        border: 0;
      }
    }
    > .code {
      margin-top: 1px;
      display: inline-block;
      vertical-align: top;
      padding-right: 10rem;
    }

    > .warn {
      color: $warnRed;
      padding: 0 1.2rem 0.46rem;
      font-size: 1.25rem;
    }
    > .load {
      display: block;
      max-width: 21.25rem;
      width: 70%;
      height: 3.35rem;
      font-size: 1.5rem;
      margin: 0 auto;
      color: #fff;
      border-radius: 10rem;
      margin-top: 5rem;
    }
  }
</style>