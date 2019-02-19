<template>
  <div
    class="monitor_info"
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
        监测记录
      </div>
      <div class="header-r">
      </div>
    </div>
    <main>
      <div class="main_h">
        <div
          class=""
          @click="check"
        >
          <img
            src="../assets/three_min.png"
            alt=""
          >
          <div class="red">3分钟心电分析</div>
        </div>
        <div
          class="ecg"
          @click="go('ecg')"
          style="margin-left:.815rem"
        >
          <img
            src="../assets/ic_back_hr_history.png"
            alt=""
          >
          <div class="ecg_back blue">心电回放</div>
        </div>
      </div>
      <div class="situation">
        <div>本次自主监测时长{{getMin(IndependentMonitoring.totalExerciseTime)}}，心率及运动强度记录如下：</div>
      </div>
      <div class="bpm">
        <h3 class="record_h3">运动心率（bpm）</h3>
        <ul class="max_min_avg">
          <li class="items">
            <div class="max">{{IndependentMonitoring.maxHr}}</div>
            <div>最大</div>

          </li>
          <li class="items">
            <div class="min">{{IndependentMonitoring.minHr}}</div>
            <div>最小</div>

          </li>
          <li class="items">
            <div class="avg">{{IndependentMonitoring.avgHr}}</div>
            <div>平均</div>

          </li>
        </ul>
      </div>
      <div class="mets">
        <h3 class="record_h3">运动强度（METs）</h3>
        <ul class="max_min_avg">
          <li class="items">
            <div class="max">{{IndependentMonitoring.maxMets}}</div>
            <div>最大</div>

          </li>
          <li class="items">
            <div class="min">{{IndependentMonitoring.minMets}}</div>
            <div>最小</div>

          </li>
          <li class="items">
            <div class="avg">{{IndependentMonitoring.avgMets}}</div>
            <div>平均</div>

          </li>
        </ul>
      </div>
      <div class="_fbMets">
        <METsChart :MetsTime='IndependentMonitoring'></METsChart>
      </div>
    </main>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import METsChart from '@/components/METsChart.vue';
import common from '../common/common';
@Component({
  components: {
    METsChart,
  },
})
export default class MonitorInfo extends Vue {
  public id: string = '';
  public IndependentMonitoring!: Monitor.MonitorInfo;
  // ------ui-------
  public loadding: boolean = false;
  /**
   * 回到上页
   */
  public back() {
    this.$store.state.isBack = true;
    this.$router.back();
  }
  public mounted() {
    this.id = this.$route.params.id;
    this.getMonitorInfo();
  }
  public getMonitorInfo() {
    this.$server.getMonitorInfo(this.id).then((res) => {
      this.IndependentMonitoring = res.result;
      this.loadding = true;
    });
  }
  /**
   * 查看三分钟心电记录
   */
  public check() {
    this.$router.push({
      path: '/threeminutesrecords/' + this.id,
    });
  }
  /**
   * 清除弹层
   */
  public cancel() {}
  public getMin(input: number) {
    return common.changeSEC(input);
  }
}
</script>
<style lang='scss' scoped>
  .monitor_info {
    position: relative;
    padding-top: $header-height;
    background-color: #f7f7f7;
    > .header {
      position: fixed;
      width: 100%;
      transform: all 0.5s;
      opacity: 1;
      top: 0%;
      left: 0%;
    }
    > main {
      padding: 1rem;
      > .main_h {
        height: 6.665rem;
        // background: #000;
        > div {
          display: inline-block;
          background-color: #fff;
          width: 6.665rem;
          height: 100%;
          padding: 1.25rem 0;
          text-align: center;
          border-radius: 0.5rem;
          > img {
            width: 1.765rem;
          }
          > div {
            margin-top: 0.5rem;
            height: 2rem;
            line-height: 2rem;
            font-size: 1.25rem;
            font-weight: bold;
            white-space: nowrap;
          }
          > .green {
            color: #4caf50;
          }
          > .blue {
            color: #00b1fe;
          }
          > .red {
            color: #ff5252;
            font-size: 0.815rem;
          }
        }
      }
      > .situation {
        margin-top: 1rem;
        > div {
          text-align: left;
          color: #262e4f;
          font-size: 1.335rem;
          margin: 0;
          padding: 0;
          line-height: 2.25rem;
          > i,
          > b {
            font-size: 1.335rem;
            font-style: normal;
            font-weight: bold;
          }
        }
      }
    }
  }
</style>