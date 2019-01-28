<template>
  <div class="result">
    <svg
      width="3rem"
      viewBox="0 0 88 88"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <!-- Generator: Sketch 49 (51002) - http://www.bohemiancoding.com/sketch -->
      <title>pay_no</title>
      <desc>Created with Sketch.</desc>
      <defs></defs>
      <g
        id="*支付购买20180328"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g
          id="pay_no"
          fill="#E63232"
        >
          <path d="M44,0 C19.699427,0 0,19.699312 0,43.999743 C0,68.300688 19.699427,88 44,88 C68.301087,88 88,68.3001741 88,43.999743 C88,19.699312 68.300573,0 44,0 Z M62.1161665,57.8314567 C63.2946112,59.0097721 63.2946112,60.9378198 62.1161665,62.1162634 C60.9378501,63.2945789 59.0098008,63.2945789 57.8313562,62.1162634 L44.000016,48.2853196 L30.1690605,62.1162634 C28.9907441,63.2945789 27.0625666,63.2945789 25.8837373,62.1162634 C24.7054209,60.9378198 24.7054209,59.0097721 25.8837373,57.8314567 L39.7152057,44 L25.8837373,30.1690561 C24.7054209,28.9907407 24.7054209,27.062693 25.8837373,25.8837366 C27.0625666,24.7054211 28.9907441,24.7054211 30.1690605,25.8837366 L44.000016,39.7151933 L57.8313562,25.8837366 C59.0098008,24.7054211 60.9378501,24.7054211 62.1161665,25.8837366 C63.2946112,27.062693 63.2946112,28.9907407 62.1161665,30.1690561 L48.2853392,44 L62.1161665,57.8314567 Z"></path>
        </g>
      </g>
    </svg>
    <div class="fail">
      支付失败
    </div>
    <button @click="again">
      再试一次
    </button>
    <div
      class="msg"
      v-cloak
    >
      <span>帮助好友支付失败</span><br>
      <span>您可以再试一次获知微信通知好友</span>
    </div>
  </div>
</template>
<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  @Component
  export default class WxPayFail extends Vue {}
</script>
<style lang='scss' scoped>
  .result {
    text-align: center;
    padding-top: 13rem;
    > svg {
      margin-bottom: 1.6rem;
    }
    > .fail {
      font-size: 1.25rem;
      color: #e63232;
      margin-bottom: 3.67rem;
    }
    button {
      width: 70%;
      padding: 1rem;
      background-image: linear-gradient(153deg, #83d888 0%, #4caf50 95%);
      border-radius: 10rem;
      color: white;
      font-size: 1.5rem;
    }
    > .msg {
      margin-top: 2.75rem;
      color: #262e4f;
      font-size: 1.25rem;
    }
  }
</style>