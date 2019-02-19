<template>
  <div v-if="loadding">
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
        预防运动方案
      </div>
      <div class="header-r">
      </div>
    </div>
    <main>
      <h4>根据您此次的自主心功能评价结果，我们为您推荐的预防运动方案如下：</h4>

      <div class="prevent_plan">
        <table>
          <thead></thead>
          <tbody>
            <tr class="">
              <th class="">运动形式</th>
              <td class="">{{getExerciseType(preventiveScheme.exerciseType)}}</td>
            </tr>
            <tr class="">
              <th class="">热身时长</th>
              <td class="">{{preventiveScheme.warmTime||"0"}}分钟/次</td>
            </tr>
            <tr class="">
              <th class="">训练时长</th>
              <td class="">{{preventiveScheme.trainTime||"0"}}分钟/次</td>
            </tr>
            <tr class="">
              <th class="">放松时长</th>
              <td class="">{{preventiveScheme.relaxTime||"0"}}分钟/次</td>
            </tr>
            <tr class="">
              <th class="">运动频次</th>
              <td class="">{{preventiveScheme.exerciseFrequency||"0"}}次/周</td>
            </tr>
            <tr class="">
              <th class="">最大心率</th>
              <td class="">{{preventiveScheme.maxHr||"0"}}bpm</td>
            </tr>
            <tr class="">
              <th class="">最小心率</th>
              <td class="">{{preventiveScheme.minHr||"0"}}bpm</td>
            </tr>
            <tr class="">
              <th class="">运动周期</th>
              <td class="">{{preventiveScheme.cycle||"0"}}周</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="footer">
        <i>温馨提示：</i>此预防运动方案的指标是根据您最近的自主心功能评价结果，结合您的身体数据，系统给您推荐的方案，仅作为日常运动参考，请您根据自己的实际身体状况合理安排运动计划，切勿过度运动！
      </div>
    </main>
  </div>

</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import moment from 'moment';
import ls from 'local-storage';
import common from '../common/common';
@Component
export default class AssessmentPreventPlan extends Vue {
  public preventiveScheme: any;
  public loadding: boolean = false;
  public mounted() {
    this.preventiveScheme = ls.get('preventiveScheme');
    this.loadding = true;
  }
  public back() {
    this.$store.state.isBack = true;
    this.$router.back();
  }
  /**
   * 运动形式
   */
  public getExerciseType(input: string) {
    return common.getExerciseType(input);
  }
}
</script>
<style lang='scss' scoped>
  main {
    width: 100%;
    min-height: 100%;
    padding: 1rem;
    background-color: #f7f7f7;
    overflow: hidden;
    box-sizing: border-box;
    > h4 {
      line-height: 2.25rem;
      font-size: 1.25rem;
      color: #262e4f;
      margin-bottom: 0.66rem;
    }
    > .prevent_plan {
      width: 100%;
      height: 100%;
      background-color: #fff;
      padding: 1rem;

      > h2 {
        padding: 0rem;
        text-align: center;
        font-size: 1.5rem;
        color: #262e4f;
        font-weight: bold;
        margin-bottom: 1rem;
      }

      > table {
        background-color: #f7f7f7;
        width: 100%;
        text-align: center;
        position: relative;
        box-sizing: border-box;
        tr {
          border-bottom: 1px solid #fff;
          width: 100%;

          > td {
            padding: 0.6rem 1rem;
            color: #262e4f;
            font-weight: bold;
            font-size: 1.25rem;
            text-align: center;
            width: 66.5%;
          }

          > th {
            width: 33.5%;
            font-size: 1.25rem;
            border-right: 1px solid #fff;
            padding: 0.6rem 1rem;
            color: #262e4f;
            font-weight: normal;
            text-align: center;
            vertical-align: baseline;
          }
        }

        > .number {
          max-width: 8rem;
          position: absolute;
          padding: 0.6rem 1rem;
          color: #262e4f;
          font-weight: bold;
          font-size: 1.25rem;
          background-color: #f57170;
          top: 0;
          right: 0%;
        }
      }
    }
    > .footer {
      font-size: 1rem;
      color: #262e4f;
      // color: #ff5722;
      line-height: 1.75rem;
      // font-size: 600;
      // font-weight: bold;

      > i {
        color: #ff5722;
        font-style: normal;
        font-size: 600;
        font-weight: bold;
      }
    }
  }
</style>