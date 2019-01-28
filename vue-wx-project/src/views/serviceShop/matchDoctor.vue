<template>
  <div class="match_doctor">
    <div class='top'>
      <div
        class="back"
        @click="back"
      >
        <img
          src="../../assets/back.png"
          alt=""
          srcset=""
        >
      </div>
      <div class="search_name">
        <img
          class="sub_l"
          src="../../assets/ic_search@2x.png"
          alt=""
        >
        <div>
          {{doctorName}}

        </div>
      </div>
    </div>
    <main>
      <div class="no_doctor">暂未找到相关医生信息！</div>
    </main>
    <main>
      <service-list></service-list>
    </main>
  </div>
</template>
<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  import ServiceList from "../../components/serviceList.vue";
  @Component({
    components: {
      ServiceList
    }
  })
  export default class MatchDoctor extends Vue {
    doctorName: string | string[] = "";
    created() {
      this.doctorName = this.$route.query.doctor;
    }
    /**
     * 回到上页
     */
    back() {
      this.$store.state.isBack = true;
      this.$router.back();
    }
  }
</script>
<style lang='scss' scoped>
  .match_doctor {
    > .top {
      padding: 1rem;
      height: 4.25rem;
      display: flex;
      background-color: $baseGreen;
      > .back {
        width: 3rem;
        height: 100%;
        > img {
          height: 100%;
        }
      }
      > .search_name {
        flex: 1;
        background-color: #f7f7f7;
        height: 100%;
        border-radius: 0.2rem;
        font-size: 0;
        padding: 0 1rem;
        > img {
          vertical-align: middle;
          width: 1.35rem;
        }
        > div {
          font-size: 1.155rem;
          display: inline-block;
          vertical-align: middle;
          line-height: 2.25rem;
          height: 100%;
          padding-left: 0.67rem;
        }
      }
    }
    > main {
      > .no_doctor {
        font-size: 1.33rem;
        margin-top: 3.67rem;
        text-align: center;
        font-family: PingFangSC;
      }
    }
  }
</style>