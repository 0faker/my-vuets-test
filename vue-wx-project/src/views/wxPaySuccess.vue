<template>
  <div class="result">
    <svg
      width="4.5rem"
      viewBox="0 0 88 88"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <!-- Generator: Sketch 49 (51002) - http://www.bohemiancoding.com/sketch -->
      <title>pay_ok</title>
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
          id="pay_ok"
          fill="#4CAF50"
          fill-rule="nonzero"
        >
          <path
            d="M43.9570732,0 C19.6805203,0 0,19.6805203 0,43.9570732 C0,68.233626 19.6805203,87.9141463 43.9570732,87.9141463 C68.233626,87.9141463 87.9141463,68.233626 87.9141463,43.9570732 C87.9141463,19.6805203 68.233626,0 43.9570732,0 Z M69.530374,30.1789919 C69.530374,30.1789919 37.370935,60.3493984 37.3610976,60.3579837 C36.6394797,61.0613577 35.4746423,61.0466016 34.7712683,60.3249837 L18.3484472,44.1183171 C17.6450732,43.3966992 17.6598293,42.2318618 18.3814472,41.5284878 C19.103065,40.8251138 20.2679024,40.8398699 20.9712764,41.5614878 L36.0937724,56.4544146 L66.9723821,27.556252 C67.694,26.852878 68.8588374,26.8676341 69.5622114,27.589252 C70.266748,28.3108699 70.2520813,29.4757073 69.5304634,30.1790813 L69.530374,30.1789919 Z"
            id="Shape"
          ></path>
        </g>
      </g>
    </svg>
    <div class="success">
      支付成功
    </div>
    <div
      class="msg"
      v-cloak
    >
      <!-- {{msg}} -->
      您已成功为好友心脏康复事业助力!
    </div>
  </div>
</template>
<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  @Component
  export default class WxPaySuccess extends Vue {}
</script>
<style lang='scss' scoped>
  .result {
    text-align: center;
    padding-top: 13rem;
    > svg {
      margin-bottom: 1.6rem;
    }
    > .success {
      font-size: 1.25rem;
      color: $baseGreen;
      margin-bottom: 11rem;
    }
    > .msg {
      color: #262e4f;
      font-size: 1.25rem;
    }
  }
</style>