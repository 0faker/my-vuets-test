<template>
  <div class="modifyPhone">
    <div class="header">
      <div
        class="cancel"
        @click="cancel"
      >
        取消
      </div>
      <div class="title">
        更换手机号
      </div>
      <div class="sure"> </div>
    </div>
    <div class="main">
      <div
        class="warn"
        v-if="isSendCode"
      >
        验证码已发送，有效期为五分钟，请尽快输入。
      </div>
      <div class="oldphone">
        您的原手机号为：<i>{{changePhone(oldphone)}}</i>
      </div>
      <div class="newphone">
        请输入要更换的手机号：
      </div>
      <div class="inputnewtel">
        <input
          type="text"
          name=""
          id=""
          placeholder="请输入新手机号"
          maxlength="13"
          v-model="showPhone"
          @input="regPhone"
        >
        <div
          class="clear"
          @click="clearInput"
          v-if='showClear'
        >
          <img
            src="../assets/delete.png"
            alt=""
          >
        </div>
      </div>
      <div class="authcode">
        <span class="warn">
          {{codeWarn}}
        </span>
        <input
          class="code"
          type="text"
          pattern="[0-9]*"
          placeholder="输入验证码"
          maxlength="4"
          v-model="code"
          @input='inputCode'
        >
        <div
          class="getcode"
          :class="{disabled:isdisabled||isSendCode}"
          @click="sendCode"
        >
          {{sendCodeMsg}}
        </div>
      </div>
    </div>
    <div
      class="sure"
      :class="{disabled:isSure||isdisabled}"
      @click="modify"
    >
      确认更改
    </div>
  </div>
</template>
<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  import Common from "../common/common";
  @Component
  export default class ModifyUserPhone extends Vue {
    public oldphone: string = "";
    public showPhone: string = "";
    public newphone: string = "";
    public code: string = "";
    public sendCodeMsg: string = "获取验证码";
    public isdisabled: boolean = true;
    public isSendCode: boolean = false;
    public codeWarn: string = "";
    public isSure: boolean = true;
    public codeInterval: any; // 验证码计数器
    showClear: boolean = false;
    public created() {
      this.oldphone = this.$route.query.userphone + "";
    }
    /**
     * 转换手机号334格式
     */
    public changePhone(input: string) {
      return Common.change(input);
    }
    /**
     * 验证手机号
     */
    public regPhone() {
      const input: string = this.showPhone;
      // this.$server
      console.log(input);
      this.showPhone = Common.change(input);
      this.newphone = this.showPhone.replace(/\s+/g, "");
      this.showClear = this.newphone ? true : false;
      if (Common.regPhone(+this.newphone)) {
        this.isdisabled = false;
        this.inputCode();
      } else {
        this.isdisabled = true;
      }
    }
    /**
     * 删除输入的手机号
     */
    public clearInput() {
      this.showPhone = "";
      this.isdisabled = true;
      this.showClear = false;
    }
    /**
     * 取消返回
     */
    public cancel() {
      this.$store.state.isBack = true;
      this.$router.back();
    }
    /**
     * 获取验证码
     */
    public sendCode() {
      if (!this.isdisabled) {
        this.$server
          .loginTest(this.newphone)
          .then((res: BaseEntity.BaseEntityResult) => {
            if (res.code === "C200") {
              // 设置定时器
              let index = 60;
              // 验证码发送成功
              this.isSendCode = true;
              this.codeInterval = setInterval(() => {
                index--;
                this.sendCodeMsg = index + "s";
                if (index === 0) {
                  // 验证码发送60s
                  this.isSendCode = false;
                  this.sendCodeMsg = "重新获取";
                  clearInterval(this.codeInterval);
                }
              }, 1000);
            } else {
              this.codeWarn = res.msg;
            }
          })
          .catch(error => {});
      }
    }
    /**
     * 输入验证码
     */
    public inputCode() {
      if (Common.regPhone(+this.newphone)) {
        this.code = this.code.replace(/\s+/g, "");
        console.log(this.code);
        this.isSure = this.code.length === 4 ? false : true;
      }
    }
    /**
     * 确定更改
     */
    public modify() {
      this.$server.modifyUserPhone(this.newphone, this.code).then(res => {
        if (res.code === "C200") {
          this.$store.state.isBack = true;
          this.$router.back();
        }
      });
    }
  }
</script>
<style lang='scss' scoped>
  .modifyPhone {
    min-height: 100%;
    > .header {
      display: flex;
      height: $header-height;
      background-color: $baseGreen;
      color: #fff;
      line-height: $header-height;
      > .cancel {
        width: $header-height;
        padding-left: 1rem;
        font-size: 1.25rem;
      }
      > .title {
        width: 100%;
        flex: 1;
        font-size: 1.5rem;
        text-align: center;
      }
      > .sure {
        width: $header-height;
        padding-right: 1rem;
        font-size: 1.25rem;
      }
      > .disabled {
        color: #82cd85;
      }
    }

    > .main {
      padding: 0.675rem 0;
      > .warn {
        color: $warnRed;
        padding-left: 1.21rem;
        font-size: 1.25rem;
        font-family: PingFangSC-Regular;
      }
      > .oldphone {
        font-size: 1.25rem;
        color: #696869;
        vertical-align: baseline;
        margin: 0.915rem 1rem 0.75rem;
        > i {
          color: $baseGreen;
          font-size: 1.5rem;
          font-style: normal;
          vertical-align: baseline;
        }
      }
      > .newphone {
        font-size: 1.25rem;
        color: #696869;
        vertical-align: baseline;
        margin: 0.75rem 1rem 0.835rem;
      }
      > .inputnewtel,
      > .authcode {
        width: 100%;
        height: 4.165rem;
        line-height: 4.615rem;
        margin-top: 1px;
        position: relative;
        > input {
          width: 100%;
          height: 100%;
          padding-left: 2.615rem;
          font-size: 1.5rem;
        }
        > .getcode {
          display: inline-block;
          position: absolute;
          top: 0%;
          right: 0%;
          height: 100%;
          font-size: 1.5rem;
          background-color: $baseGreen;
          color: #fff;
          min-width: 9.5rem;
          text-align: center;
        }
        > .disabled {
          background-color: $disabledColor;
        }
        > .warn {
          position: absolute;
          margin-top: 0.675rem;
          top: 100%;
          left: 2.615rem;
          line-height: initial;
          color: $warnRed;
          font-size: 1.175rem;
        }
        > .clear {
          position: absolute;
          top: 0%;
          width: 4rem;
          right: 0rem;
          height: 100%;
          line-height: 100%;
          > img {
            position: absolute;
            width: 1.1rem;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
    > .sure {
      margin: 0 auto;
      margin-top: 6.25rem;
      background-color: $baseGreen;
      color: #fff;
      width: 70%;
      max-width: 12rem;
      text-align: center;
      font-size: 1.5rem;
      border-radius: 10rem;
      padding: 0.625rem 0;
    }
    > .disabled {
      background-color: $disabledColor;
    }
  }
</style>