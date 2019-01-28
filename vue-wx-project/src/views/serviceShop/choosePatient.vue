<template>
  <div class="main">
    <div class="head">注意：请确保该用户登录心脏康复助手的手机号码与您填写的号码一致。</div>
    <div class="body">
      <div>请在下方输入您需要帮助购买服务的用户手机号码：</div>
      <input
        type="tel"
        maxlength="13"
        v-model="phone"
        style="color:#4CAF50"
        placeholder="请输入手机号码"
        @input="reg($event)"
      >
    </div>
    <div
      class="yzm"
      v-if="isHavePatient"
    >
      <div class="yzm_t">该用户的手机号暂未激活，请点击获取验证码，将验证码正确填写后，点击激活并购买:</div>
      <div class="yzm_b row">
        <input
          class="yzm_l"
          maxlength="4"
          v-model="code"
          @input="codekeyup"
          placeholder="输入验证码"
        >
        <div
          @click="send"
          :class="isSend?'yzm_r_green':'yzm_r_gray'"
          :disabled="isSend"
        >
          <div>{{codeWords}}</div>
        </div>

      </div>
    </div>
    <!-- 已有患者 -->
    <div
      class="buy"
      v-if="!isHavePatient&&isShowButton"
      @click="buy"
    >购买</div>
    <!-- 没有患者 -->
    <div
      class="buy"
      v-if="isHavePatient&&isShowButton"
      @click="register"
    >激活并购买</div>
  </div>
</template>
<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  import common from "../../common/common";
  import ls from "local-storage";
  @Component
  export default class ChoosePatient extends Vue {
    phoneNumber: string = ""; //手机号
    phone: string = ""; //手机号字符串344格式
    isHavePatient: boolean = false; //验证码显示
    isSend: boolean = false; //是否已请求发送验证码
    code: string = ""; //验证码
    codeWords: string = "获取验证码";
    isShowButton: boolean = false; //显示购买按钮
    patientId: string = ""; //患者id
    /*
     * 验证手机号
     */
    reg(e: Event) {
      this.phone = common.change(this.phone);
      this.phoneNumber = this.phone.replace(/\s+/g, "");
      if (common.regPhone(+this.phoneNumber)) {
        // 正则true
        this.$server.getPayPatient(+this.phoneNumber).then(data => {
          // 根据患者有 false无 true 判断购买按钮和验证码显示
          this.isHavePatient = data.result ? false : true;
          this.isShowButton = data.result ? true : false;
          this.patientId = data.result;
        });
      } else {
        // 正则false
        this.isHavePatient = false;
        this.isShowButton = false;
      }
    }
    /**
     * 发送验证码
     */
    send() {
      this.$server.loginTest(this.phoneNumber).then(data => {
        //发送成功
        if (data.code == "C200") {
          this.isSend = false;
          let secend = 60;
          let timer = setInterval(() => {
            secend--;
            this.codeWords = secend + "s";
            if (secend == 0) {
              this.isSend = true;
              this.codeWords = "重新获取";
              clearInterval(timer);
            }
          }, 1000);
        }
      });
    }
    /**
     * 验证 验证码 判断是否为4位数
     */
    codekeyup() {
      if (this.code.length != 4) {
        this.isShowButton = false;
      } else {
        this.isShowButton = true;
      }
    }
    /**
     * 注册用户
     */
    register() {
      this.$server.RegistPatient(this.phoneNumber, this.code);
    }
    /**
     * 点击购买 跳转页面
     */
    buy() {
      ls.set("payPatient", this.patientId);
      this.$router.push({ path: `/chooseservice` });
    }
  }
</script>
<style lang='scss' scoped>
  .main {
    width: 100%;
    height: 100%;
    background-color: #f3f3f3;
    text-align: left;
    position: relative;
    > .head {
      color: #737373;
      font-size: 1.115rem;
      padding: 1rem;
      // text-align: center;
      width: 100%;
      background-color: #fafafa;
    }
    > .body {
      width: 100%;
      padding: 1rem;
      background-color: #f3f3f3;
      border-bottom: 1px solid #d7d7d7;
      > div {
        color: #1c1a20;
        font-size: 1.5rem;
        font-weight: bolder;
      }
      > input {
        padding: 1rem;
        padding-bottom: 0;
        background: #f3f3f3;
        width: 100%;
        font-size: 1.5rem;
      }
    }
    > .yzm {
      // padding: 0 0.66rem;
      width: 100%;
      > .yzm_t {
        color: #ff5252;
        font-size: 1.335rem;
        // font-weight: 500;
        font-weight: bold;
        padding: 0.9rem;
        line-height: 2;
      }
      > .yzm_b {
        display: flex;
        box-sizing: border-box;
        > .yzm_l {
          flex: 1;
          background-color: #fff;
          font-size: 1.5rem;
          padding: 1rem 0 1rem 2.5rem;
          &::placeholder {
            color: #b4b4b4;
          }
        }
        > .yzm_r_green,
        > .yzm_r_gray {
          color: #f7f7f7;
          background: #4caf50;
          // text-align: center;
          padding: 1rem 0;
          font-size: 1.5rem;
          min-width: 10rem;

          > div {
            // display: inline-block;
            width: 100%;
            text-align: center;
            margin: auto;
          }
        }
        > .yzm_r_gray {
          background: #6d726d;
          color: #f7f7f7;
        }
      }
    }
    > .buy {
      background-image: linear-gradient(153deg, #83d888 0%, #4caf50 95%);
      text-align: center;
      margin-top: 1.5rem;
      border-radius: 10rem;
      padding: 1rem;
      width: 70%;
      margin: 2.78rem auto;
      // position: absolute;
      // bottom: 1rem;
      // left: 50%;
      font-size: 1.5rem;
      // transform: translateX(-50%);
      color: #fff;
    }
  }
  input::-webkit-input-placeholder {
    color: #b4b4b4;
  }
</style>