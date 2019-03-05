<template>
  <div
    class="toast"
    :style="{backgroundColor:activeColor}"
  >
    <div
      class="icon"
      v-if="type!=='normal'"
    ></div>
    <div class="msg">{{computedMsg()}}</div>
  </div>
</template>
<script lang='ts'>
  import { Component, Prop, Vue, Watch } from "vue-property-decorator";
  import { mapState } from "vuex";
  @Component
  export default class ToastComponent extends Vue {
    activeColor: string = "#545454";
    msg: string = "";
    mounted() {
      this.$store.state.type;
    }
    @Watch("type")
    ChangeColor(val: string, oldVal: string) {
      switch (val) {
        case "normal":
          this.activeColor = "#545454";
          break;
        case "success":
          this.activeColor = "#009C7A";
          break;
        case "fail":
          this.activeColor = "#E3664B";
          break;
        default:
          this.activeColor = "#545454";
          break;
      }
    }
    // 计算属性
    get computedMsg(): string {
      return this.$store.state.msg;
    }
    get computedType(): string {
      return this.$store.state.type;
    }
  }
</script>
<style lang='scss' scoped>
  .toast {
    max-width: 24rem;
    padding: 1rem;
    > .icon {
      margin-right: 1rem;
      color: #fff;
    }
    > .msg {
      color: #fff;
      height: 1.5rem;
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 1);
      line-height: 1.88rem;
    }
  }
</style>