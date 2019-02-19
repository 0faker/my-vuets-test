<template>
  <div
    class="accomplish_info"
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
        康复记录
      </div>
      <div class="header-r">
      </div>
    </div>
    <main>
      <div class="main_h">
        <div
          class="pre"
          @click="goRoute('pre')"
        >
          <img
            src="../assets/ic_rx_history.png"
            alt=""
          >
          <div class="green">运动处方</div>
        </div>
        <div
          class="ecg"
          @click="goRoute('ecg')"
          style="margin-left:.815rem"
        >
          <img
            src="../assets/ic_back_hr_history.png"
            alt=""
          >
          <div class="blue ecg_back">心电回放</div>
        </div>
      </div>
      <!-- <main> -->
      <div class="_explain">
        <p
          class="tips"
          style="padding-top:0"
        >
          在此次康复运动中，您的亲属一共步行了
          <i style="color:#00b1fe">{{accomplishedInfo.stepNumber}}</i> 步，{{getBorgId(accomplishedInfo.borgCategory.id)}}
          <i style="color:#4CAF50">{{borgRepresent(accomplishedInfo.borg)}}</i>,有效运动时长为
          <i style="color:#ff5722">{{accomplishedInfo.effectiveExerciseTime}}</i>分钟, 有效运动时长占比为
          <i style="color:#ff5722">{{effectiveExerciseRate}}</i> %。
        </p>
        <p
          class="tips"
          style="padding-top:0"
        >
          本次心脏康复运动
          <b :style="{color:isQualified?'#4CAF50':'#ff5200'}">{{isQualified?"达标":"未达标"}}</b>
          ， 请您依据处方运动，继续加油。
        </p>
      </div>
      <div class="bpm">
        <h3 class="xl-t record_h3">运动心率（bpm）</h3>
        <div class="xl-b max_min_avg">
          <div class="items">
            <div class="max">{{accomplishedInfo.maxHrOfExercise}} </div>
            <div>最大</div>
          </div>
          <div class="items">
            <div class="min"> {{accomplishedInfo.minHrOfExercise}}</div>
            <div>最小</div>
          </div>
          <div class="items">
            <div class="avg">{{accomplishedInfo.avgHrOfExercise}}</div>
            <div>平均</div>
          </div>
        </div>

      </div>
      <div class="mets">
        <h3 class="met-t record_h3">运动强度（METs）</h3>
        <div class="met-b max_min_avg">
          <div class="items">
            <div class="max">{{accomplishedInfo.maxMets}}</div>
            <div>最大</div>
          </div>
          <div class="items">
            <div class="min">{{accomplishedInfo.minMets}}</div>
            <div>最小</div>
          </div>
          <div class="items">
            <div class="avg">{{accomplishedInfo.avgMets}}</div>
            <div>平均</div>
          </div>
        </div>

      </div>
      <div class="_fbMets">
        <METsChart :MetsTime='accomplishedInfo'></METsChart>
      </div>
      <!-- <div v-if="isHaveBp" class="xue_ya" (click)="goRoute('bp')">血压测量值 >></div> -->
      <!-- <div  v-if="isHaveBo" class="xue_o2" (click)="goRoute('bo')">血氧记录值 >></div> -->
    </main>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import ls from 'local-storage';

import METsChart from '@/components/METsChart.vue';
@Component({
  components: {
    METsChart,
  },
})
export default class AccomplishInfo extends Vue {
  public id: string = ''; // 康复记录id
  public patientid: string = ''; // 患者id
  public accomplishedInfo!: Accomplished.AccomplishedInfo;
  // description: string = ""; //不同borg表文字描述不同
  public effectiveExerciseRate: number = 0; // 有效时长占比
  public isQualified: boolean = false; // 是否达标
  public borg: any;
  // ----加载---
  public loadding: boolean = false;
  public created() {
    this.getBorg();
  }
  public mounted() {
    this.initialize();
    this.getAccomplishedInfo();
  }
  public back() {
    this.$store.state.isBack = true;
    this.$router.back();
  }
  // 初始化
  public initialize() {
    this.id = this.$route.params.id;
    this.patientid = this.$route.params.patientid;
  }
  /**
   * 获取记录详情
   */
  public getAccomplishedInfo(): void {
    this.$server.getAccomplishedInfo(this.patientid, this.id).then((res) => {
      this.accomplishedInfo = res.result;
      this.effectiveExerciseRate =
        // 向下取整保留一位小数
        Math.floor(
          (this.accomplishedInfo.effectiveExerciseTime /
            (this.accomplishedInfo.dailyPrescription.exerciseTime * 60)) *
            1000,
        ) / 10;

      this.isQualified = this.effectiveExerciseRate >= 100 ? true : false;
      this.loadding = true;
      this.loadding = true;
    });
  }
  /**
   * 获取borg表id
   */
  public getBorgId(input: number) {
    return input === 1 ? '自测疲劳感为' : '自我理解的用力程度为';
  }
  /**
   * 获取borg表内容
   */
  public getBorg() {
    const borg = ls.get('borg');
    // localstorage中有borg表
    if (borg) {
      this.borg = borg;
    } else {
      this.$server.getBorg().then((res) => {
        this.borg = res.result;
        ls.set('borg', this.borg);
      });
    }
  }
  /**
   * borg值=>文字
   */
  public borgRepresent(input: number) {
    let result: string = '';
    // 本次所用的borg表
    const currentBorg = JSON.parse(
      this.borg.find((x: any) => x.id === this.accomplishedInfo.borgCategory.id)
        .borgContent,
    );
    result = currentBorg.find((x: any) => x.value === input).description;
    return result;
  }
  /**
   * 页面跳转
   */
  public goRoute(input: string) {
    switch (input) {
      case 'ecg':
        break;
      // 处方
      case 'pre':
        this.$router.push(
          '/accomplishedprescription/' + this.accomplishedInfo.id,
        );
        break;
    }
  }
}
</script>
<style lang='scss' scoped>
  .accomplish_info {
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
        }
      }
      > ._explain {
        margin-top: 1rem;
        > p {
          text-align: left;
          color: #262e4f;
          font-size: 1.335rem;
          margin: 0;
          padding: 0;
          line-height: 2.25rem;
          text-indent: 2rem;
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