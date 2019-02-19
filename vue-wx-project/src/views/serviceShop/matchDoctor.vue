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
      <service-list :doctor-service="doctorServiceLists"></service-list>
    </main>

  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import ServiceList from '../../components/serviceList.vue';
@Component({
  components: {
    ServiceList,
  },
})
export default class MatchDoctor extends Vue {
  public doctorName: string = '';
  public doctorServiceLists: any = [];
  public created() {
    this.doctorName = this.$route.query.doctor.toString();
    this.getDoctorService();
  }
  /**
   * 回到上页
   */
  public back() {
    this.$store.state.isBack = true;
    this.$router.back();
  }
  /**
   * 获取医生服务
   */
  public getDoctorService() {
    this.$server
      .GetCityDoctors(10000, 1, undefined, this.doctorName)
      .then((data) => {
        this.doctorServiceLists = data.result;
      });
  }
}
</script>
<style lang='scss' scoped>
  .match_doctor {
    height: 100%;
    position: relative;
    > .top {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 1;
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
      height: 100%;
      overflow: scroll;
      padding-top: 4.25rem;
      z-index: 0;
      box-sizing: border-box;
    }
  }
</style>