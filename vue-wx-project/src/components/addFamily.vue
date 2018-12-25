<template>
  <div class="add">
    <div class="scan-ground"></div>
    <div class="phone-ground"></div>

    <div
      class="scan"
      @touchend="getScan"
    >
      <img
        src=""
        alt=""
        srcset=""
      >
      <div>
        扫码<br>
        关注亲属
      </div>
    </div>
    <div
      class="phone"
      @click="addByPhoen"
    >
      <img
        src=""
        alt=""
        srcset=""
      >
      <div>
        验证手机号<br>
        关注亲属
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
const wx = require('weixin-js-sdk');
import wxConfig from '../common/wxConfig';
import { SignatureObj, WeChatSignature } from '../entity/SignatureObj';
import Common from '../common/common';
@Component
export default class AddFamliy extends Vue {
    url: string = location.href;
    SignatureObj?: SignatureObj; // 微信签名
  @Prop() private userId!: string;
  // 添加亲属模块
  /**
   * 扫一扫添加亲属
   */
    getScan(): void {
    if (Common.getPhoneType() !== 'ios') {
      this.$server.getWxConfig(this.url).then((res: WeChatSignature) => {
        console.log(res);
        this.SignatureObj = {
          debug: false,
          // appId
        };
      });
    }
    wxConfig;
    this.$emit('qrcode');
  }
    addByPhoen() {
    this.$router.push({ path: '/addfamilybyphone/' + this.userId });
  }
}
</script>
<style lang='scss' scoped>
  .add {
    background: #f3f3f3;
    box-shadow: 0 -1px 10px 0 rgba(28, 26, 32, 0.05);
    padding: 1rem 0 1rem 1rem;
    height: 7.15rem;
    position: relative;
    > .scan-ground {
      display: inline-block;
      // text-align: center;
      // background-color: #fff;
      // padding: 0.835rem 1.5rem;
      height: 0;
      width: 50%;
      border-top: 5.15rem solid #ffffff;
      border-right: 2rem solid transparent;
    }
    > .phone-ground {
      display: inline-block;
      // text-align: center;
      // background-color: #fff;
      // padding: 0.835rem 1.5rem;
      height: 0;
      width: 50%;
      border-bottom: 5.15rem solid #ffffff;
      border-left: 2rem solid transparent;
      margin-left: -1rem;
    }
    > .scan {
      display: inline-block;
      width: 45%;
      position: absolute;
      top: 50%;
      background-color: transparent;
      left: 1rem;
      transform: translateY(-50%);
      text-align: center;
      > div {
        height: 100%;
        display: inline-block;
        font-size: 1.25rem;
        color: #1c1a20;
      }
    }
    > .phone {
      display: inline-block;
      width: 45%;
      position: absolute;
      top: 50%;
      background-color: transparent;
      right: 1rem;
      transform: translateY(-50%);
      text-align: center;
      > div {
        height: 100%;
        display: inline-block;
        font-size: 1.25rem;
        color: #1c1a20;
      }
    }
  }
</style>