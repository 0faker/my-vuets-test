<template>
  <div
    class="add_family"
    v-if="loadding"
  >
    <div class="header">
      <div
        class="back"
        @click="back"
      >
        <img
          src="../assets/back.png"
          alt=""
          srcset=""
        >

      </div>
      <div class="title">
        亲属详情
      </div>
      <div>

      </div>
    </div>

    <div class="tips">
      请在下方输入您要关注的亲属的手机号码，验证后即可成功关注该患者：
    </div>
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
        v-model="code"
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
      :style="{backgroundColor:isCanLogin?'#6d726d':'#4caf50'}"
      @click="bind"
    >
      验证并关注
    </button>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  import Common from "../common/common";
  @Component
  export default class addFamilyByPhone extends Vue {
    userId: string = "";
    tel: string = ""; // 号码
    showTel: string = ""; // 输入框中显示的号码
    clearable: boolean = true; // 清空按钮
    warn: boolean = false; // 提示语
    code: string = ""; // 验证码
    wrongCodeMsg?: string = ""; // 验证码错误提示
    showWrongCodeMsg: boolean = false; // 验证码错误提示显示
    // ----ui-----
    isCanGetCode?: boolean; // 获取验证码可点击
    isSendCode: boolean = false; // 是否可再发送验证码
    getCodeMsg?: string; // 验证码内文字
    activeCodeColor?: string; // 获取验证码按钮颜色
    isCanLogin?: boolean; // 登录按钮可用状态
    activeLoginColor?: string; // 登录按钮颜色
    loadding?: boolean = false;
    mounted() {
      // this.wrongCodeMsg = "验证码有误，请重新输入！";
      this.showWrongCodeMsg = false;
      this.isCanGetCode = true;
      this.activeCodeColor = "#6d726d";
      this.getCodeMsg = "获取验证码";
      this.isCanLogin = true;
      this.activeLoginColor = "#6d726d";
      this.userId = this.$route.params.id;
      // -----ui-------
      this.loadding = true;
    }
    /**
     * 回退
     */
    back() {
      this.$store.state.isBack = true;
      this.$router.back();
    }

    /**
     * 验证手机号
     */
    verifyPhone() {
      const input: string = this.showTel;
      this.showTel = Common.change(input);
      this.tel = this.showTel.replace(/\s+/g, "");
      // 正则匹配
      if (Common.regPhone(+this.tel)) {
        // 匹配
        this.isCanGetCode = false;
        this.activeCodeColor = "#4caf50";
      } else {
        this.isCanGetCode = true;
        this.activeCodeColor = "#6d726d";
      }
    }
    /**
     * 获取验证码
     */
    sendCode() {
      // if (!this.isdisabled) {
      // }
    }
    /**
     * 验证码
     */
    verifyCode() {
      this.code = this.code.replace(/\s+/g, "");
      this.isCanLogin = this.code.length === 4 ? false : true;
      console.log(this.isCanLogin);
    }
    /**
     * 确定绑定亲属
     */
    bind() {
      this.$server.bindFamily(+this.userId, this.tel, this.code).then(res => {
        if (res.code === "C200") {
          this.back();
        } else {
          this.wrongCodeMsg = res.msg;
          console.log(res);
          this.showWrongCodeMsg = true;
        }
      });
    }
  }
</script>
<style lang='scss' scoped>
  .add_family {
    width: 100%;
    height: 100%;
    > .header {
      height: $header-height;
      background-color: $baseGreen;
      color: #fff;
      text-align: center;
      font-size: 1.5rem;
      line-height: $header-height;
      position: relative;
      > .back {
        position: absolute;
        top: 0;
        left: 0;
        width: 3rem;
        padding: 0.75rem;
        height: 100%;
        > img {
          height: 2.15rem;
        }
      }
    }
    > .tips {
      font-size: 1.25rem;
      color: $basefontcolor;
      padding: 1rem;
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