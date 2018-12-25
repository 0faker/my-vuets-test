<template>
  <div class="modifyusername">
    <div class="header">
      <div class="cancel">
        取消
      </div>
      <div class="title">
        设置姓名
      </div>
      <div
        class="sure"
        @click="sureModify"
        :class="{disabled:isSure}"
      >
        完成
      </div>
    </div>
    <div class="new-name">
      <input
        type="text"
        ref="name"
        @input="modifyusername"
        v-model="name"
      >
    </div>
    <div
      class="warn"
      v-if="isSure"
    >
      {{warnMsg}}
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class ModifyUserName extends Vue {
    name: string = '';
    userId: string = '';
    warnMsg: string = '';
    isSure: boolean = true; // 完成可点击
  constructor() {
    super();
  }
    created() {
    this.userId = this.$route.params.id;
    this.name = this.$route.query.username + '';
  }
  /**
   * 输入新姓名
   */
    modifyusername() {
    const nameEle: Vue | Element | Vue[] | Element[] = this.$refs.name;
    // console.log(nameEle.value);
    console.log(this.name);
    if (/^[\u4E00-\u9FA5]{2,4}$/.test(this.name)) {
      this.isSure = false;
      // this.msg = "";
    } else {
      // this.msg = "姓名格式错误,请输入2-4位中文";
      this.warnMsg = '姓名格式不正确，请重新输入！';
      this.isSure = true;
    }
  }
  /**
   * 确定修改
   */
    sureModify() {
    this.$server
      .modify(this.userId, this.name, null, null, null, null)
      .then(() => {
        this.$store.state.isBack = true;
        this.$router.back();
      });
  }
  /**
   * 取消返回
   */
    cancel() {
    this.$store.state.isBack = true;
    this.$router.back();
  }
}
</script>
<style lang='scss' scoped>
  .modifyusername {
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
    > .new-name {
      margin-top: 1rem;
      background-color: #fff;
      height: 4.165rem;
      line-height: 4.165rem;
      > input {
        padding-left: 1.835rem;
        font-size: 1.25rem;
        color: #848282;
      }
    }
    > .warn {
      color: $warnRed;
      font-size: 1.25rem;
      padding: 0.675rem 1rem;
    }
  }
</style>