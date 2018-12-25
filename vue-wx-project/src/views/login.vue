<template>
  <div
    class="login"
    v-if="loadding"
  >
    <header>
      登录
    </header>
    <div
      v-if="warn"
      class="warn"
    >验证码已发送，有效期为五分钟，请尽快输入。</div>
    <div class="tel">
      <input
        type="tel"
        placeholder="请输入您的手机号"
        v-model="showTel"
        maxlength=13
        @input="verifyPhone"
      >
      <div class="clear">
        <img
          src=""
          alt=""
        >
      </div>
    </div>
    <div class="code">
      <input
        type="text"
        pattern="[0-9]*"
        maxlength=4
        placeholder="输入验证码"
        @input="verifyCode"
      >
      <button
        class="get-code"
        :style="{backgroundColor:activeCodeColor}"
        :disabled="isCanGetCode"
      >{{getCodeMsg}}</button>
      <div
        class="wrongCodeMsg"
        v-if="showWrongCodeMsg"
      >
        {{wrongCodeMsg}}
      </div>
    </div>

    <button
      class="load"
      :disabled="isCanLogin"
      :style="{backgroundColor:activeLoginColor}"
    >
      登录
    </button>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Common from '../common/common';
import * as ls from 'local-storage';
import Axios from 'axios';
@Component
export default class LoginComponent extends Vue {
    wxCode?: string; // 微信code
    tel?: number; // 号码
    showTel: string = ''; // 输入框中显示的号码
    clearable: boolean = true; // 清空按钮
    warn: boolean = false; // 提示语
    code: string = ''; // 验证码
    wrongCodeMsg?: string = ''; // 验证码错误提示
    showWrongCodeMsg?: boolean; // 验证码错误提示显示
  // ----ui-----
    isCanGetCode?: boolean; // 获取验证码可点击
    getCodeMsg?: string; // 验证码内文字
    activeCodeColor?: string; // 获取验证码按钮颜色
    isCanLogin?: boolean; // 登录按钮可用状态
    activeLoginColor?: string; // 登录按钮颜色
    loadding?: boolean = false;
    mounted() {
    this.wrongCodeMsg = '验证码有误，请重新输入！';
    this.showWrongCodeMsg = true;
    this.isCanGetCode = true;
    this.activeCodeColor = '#6d726d';
    this.getCodeMsg = '获取验证码';
    this.isCanLogin = true;
    this.activeLoginColor = '#6d726d';
    // this.warn = true;

    this.code = this.$route.query.code.toString();
    console.log(this.code);
    this.getAuth();
  }
    getAuth() {
    console.log(this.$server);
    this.loadding = true;
    this.$server
      .getAuth({
        //  登陆类型
        logonEquipmentType: 2,
        // 用户登陆ip
        logonIp: '127.0.0.1',
        // 登陆设备编号
        equipmentId: 'fromh5',
        logonMac: 'o.o.o.o',
        origin: 2,
        code: this.code,
      })
      .then((res) => {
        console.log(res);
      });
  }
  /**
   * 验证手机号
   */
    verifyPhone() {
    const input: string = this.showTel;
    // this.$server
    console.log(input);
    this.showTel = Common.change(input);
    this.tel = +this.showTel.replace(/\s+/g, '');
    // 正则匹配
    if (Common.regPhone(this.tel)) {
      // 匹配
      this.isCanGetCode = false;
      this.activeCodeColor = '#4caf50';
    } else {
      this.isCanGetCode = true;
      this.activeCodeColor = '#6d726d';
    }
  }
  /**
   * 验证码
   */
    verifyCode() {
    // this.code.length==4?
  }
  /**
   * 登录
   */
    login() {
    // this.$server
    //   .login_async({
    //     //  登陆类型
    //     logonEquipmentType: 2,
    //     // 用户登陆ip
    //     logonIp: "127.0.0.1",
    //     // 登陆设备编号
    //     equipmentId: "fromh5",
    //     logonMac: "o.o.o.o",
    //     origin: 2,
    //     phone: this.tel,
    //     authCode: this.code,
    //     unionId: 1,
    //     openId: 1
    //   })
    //   .then(res => {
    //     console.log(res);
    //   });
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
      > .get-code {
        font-size: 1.5rem;
        color: #fff;
        padding: 1.04rem 0;
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