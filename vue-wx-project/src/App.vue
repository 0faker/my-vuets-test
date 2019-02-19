<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view />
    </transition>
  </div>

</template>
<script lang="ts">
  import { Component, Prop, Vue, Watch } from "vue-property-decorator";
  import wxApi from "./common/wxConfig";
  import { SignatureObj, WeChatSignature } from "./entity/SignatureObj";
  import Common from "./common/common";
  @Component
  export default class App extends Vue {
    public transitionName: string = "";
    public SignatureObj?: SignatureObj; // 微信签名
    public url: string = location.href;
    /**
     * 监听路由
     */
    @Watch("$route")
    public getTransitionName(to: any, from: any) {
      this.transitionName = this.$store.state.isBack
        ? "slide-right"
        : "slide-left";
      this.$store.state.isBack = false;
    }
    public beforeRouteEnter(to: any, from: any, next: any) {
      // if (to.name === 'login') {
      //   next({ name: 'home/index' });
      // } else {
      next();
      // }
    }
    mounted() {
      /**
       * ios微信签名
       */
      if (Common.getPhoneType() == "ios") {
        this.$server.getWxConfig(this.url).then((res: any) => {
          this.SignatureObj = res.weChatSignature;
          wxApi.wxConfig(this.SignatureObj);
        });
      }
    }
  }
</script>

<style>
  #app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
    background-color: #f7f7f7;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 5s ease;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
  .child-view {
    position: absolute;
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  }
  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  }
  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    transform: translate(-100%, 0);
  }
  .slide-left-leave,
  .slide-right-enter-active {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    transform: translate(-100%, 0);
  }
  .slide-right-enter,
  .slide-left-leave-active {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    transform: translate(-100%, 0);
  }
  /* .slide-left-enter-active {
                                                                    opacity: 0;
                                                                    -webkit-transform: translate(-100%, 0);
                                                                    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
                                                                    transform: translate(-100%, 0);
                                                                  }
                                                                  .slide-left-enter-to {
                                                                    opacity: 0;
                                                                    -webkit-transform: translate(0, 0);
                                                                    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
                                                                    transform: translate(0, 0);
                                                                  } */
</style>
