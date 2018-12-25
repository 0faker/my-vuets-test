<template>
  <div
    class="prescriptions"
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
        康复处方
      </div>
      <div>

      </div>
    </div>
    <main>
      <div>
        <h2>{{getAddTime(dailyPrescription.prescriptionDate)}}</h2>
        <table>
          <tr>
            <th>运动形式</th>
            <td>{{getExerciseType(dailyPrescription.exerciseType)}}</td>
          </tr>
          <tr>
            <th>热身时长</th>
            <td>{{dailyPrescription.warmTime||"0"}}分钟/次</td>
          </tr>
          <tr>
            <th>训练时长</th>
            <td>{{dailyPrescription.exerciseTime||"0"}}分钟/次</td>
          </tr>
          <tr>
            <th>放松时长</th>
            <td>{{dailyPrescription.relaxTime||"0"}}分钟/次</td>
          </tr>
          <tr>
            <th>运动频次</th>
            <td>{{dailyPrescription.exerciseFrequency||"0"}}次/天</td>
          </tr>
          <tr>
            <th>最大心率</th>
            <td>{{dailyPrescription.maxHr||"0"}}bpm</td>
          </tr>
          <tr>
            <th>最小心率</th>
            <td>{{dailyPrescription.minHr||"0"}}bpm</td>
          </tr>
          <tr>
            <th>注意事项</th>
            <td>{{dailyPrescription.remark||"--"}}</td>
          </tr>
          <tr>
            <th>康复目标</th>
            <td>{{dailyPrescription.cyclePrescription.recoveryTarget||"--"}}</td>
          </tr>
          <!-- <div class="number">今日已完成1次</div> -->
        </table>
        <div class="doctor">开方医生：{{dailyPrescription.doctor.name||"--"}}</div>
      </div>
    </main>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import moment from 'moment';
import common from '../common/common';
import ls from 'local-storage';
@Component
export default class DailyPrescriptions extends Vue {
    id: string = '';
    dailyPrescription?: Prescriptions.DailyPrescriptions;
    loadding: boolean = false;
    mounted() {
    this.id = this.$route.params.id; // 周期处方id
    this.getCyclePrescriptions();
  }
  /**
   * 回到上页
   */
    back() {
        this.$store.state.isBack = true;
        this.$router.back();
  }
  /**
   * 获取周期处方
   */
    getCyclePrescriptions() {
    const dailyPrescriptions: Prescriptions.DailyPrescriptions[] = ls.get(
      'dailyprescriptions',
    );
    this.dailyPrescription = dailyPrescriptions.find((x) => x.id === +this.id);
    console.log(this.dailyPrescription);
    // ----ui显示------
    this.loadding = true;
  }
  /**
   * 时间戳=>字符串
   */
    getAddTime(input: string) {
    return moment(input).format('YYYY.MM.DD');
  }
  /**
   * 查看日处方
   */
    getExerciseType(input: string) {
    return common.getExerciseType(input);
  }
}
</script>
<style lang='scss' scoped>
  .prescriptions {
    // overflow: hidden;
    height: 100%;
    padding-top: $header-height;
    > .header {
      position: absolute;
      top: 0%;
      left: 0%;
      width: 100%;
      height: $header-height;
      background-color: $baseGreen;
      color: #fff;
      text-align: center;
      font-size: 1.5rem;
      line-height: $header-height;

      > .back {
        position: absolute;
        top: 0;
        left: 0;
        width: 3rem;
        padding: 0.75rem;
        height: 100%;
        > img {
          height: 2.15rem;
        }
      }
    }
    > main {
      box-sizing: border-box;
      width: 100%;
      // height: 100%;
      padding: 1rem;
      overflow: scroll;
      background-color: #f7f7f7;
      > div {
        width: 100%;
        height: 100%;
        background-color: #fff;
        padding: 0 1rem;

        > h2 {
          padding: 1rem;
          text-align: center;
          font-size: 1.5rem;
          color: #262e4f;
          font-weight: bold;
          margin: 0;
        }

        > table {
          background-color: #f7f7f7;
          width: 100%;
          text-align: center;
          position: relative;

          tr {
            border-bottom: 1px solid #fff;
            width: 100%;

            > td {
              width: 70%;
              padding: 0.6rem 1rem;
              color: #262e4f;
              font-weight: bold;
              font-size: 1.25rem;
              text-align: left;
              // text-align: center;
            }

            > th {
              // width: 30%;
              font-size: 1.25rem;
              border-right: 1px solid #fff;
              padding: 0.6rem 1rem;
              color: #262e4f;
              font-weight: normal;
              float: none;
              display: block;
              text-align: center;
            }
          }

          > .number {
            max-width: 5.33rem;
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

        > .doctor {
          text-align: right;
          font-size: 1.25rem;
          padding: 0.53rem 0;
          font-weight: bold;
          color: #262e4f;
        }
      }
    }
  }
</style>                                                                                                                                                             