<template>
  <div>
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
        运动处方
      </div>
      <div class="header-r">
      </div>
    </div>
    <main v-if="loadding">
      <div>
        <h2>{{getDate(dailyPrescriptions.prescriptionDate)}}</h2>

        <table>
          <tr>
            <th>运动形式</th>
            <td>{{getExerciseType(dailyPrescriptions.exerciseType)}}</td>
          </tr>
          <tr>
            <th>热身时长</th>
            <td>{{dailyPrescriptions.warmTime||"--"}}分钟/次</td>
          </tr>
          <tr>
            <th>训练时长</th>
            <td>{{dailyPrescriptions.exerciseTime||"--"}}分钟/次</td>
          </tr>
          <tr>
            <th>放松时长</th>
            <td>{{dailyPrescriptions.relaxTime||"--"}}分钟/次</td>
          </tr>
          <tr>
            <th>运动频次</th>
            <td>{{dailyPrescriptions.exerciseFrequency||"--"}}次/天</td>
          </tr>
          <tr>
            <th>最大心率</th>
            <td>{{dailyPrescriptions.maxHr||"--"}}bpm</td>
          </tr>
          <tr>
            <th>最小心率</th>
            <td>{{dailyPrescriptions.minHr||"--"}}bpm</td>
          </tr>
          <tr>
            <th>注意事项</th>
            <td>{{dailyPrescriptions.remark||"--"}}</td>
          </tr>
          <tr>
            <th>康复目标</th>
            <td>{{dailyPrescriptions.recoveryTarget||"--"}}</td>
          </tr>
          <!-- <div ="number">今日已完成1次</div> -->
        </table>
        <div class="doctor">开方医生：{{dailyPrescriptions.doctor.name||"--"}}</div>
      </div>
      <!-- <div class="warning">
        <div>注意事项</div>
        <p>
          {{Prescription.remark}}
        </p>
      </div>

      <div>
        <div>康复目标</div>
        <p>
          {{Prescription.recoveryTarget}}
        </p>
      </div> -->
    </main>

  </div>
</template>
<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  import moment from "moment";
  import common from "../common/common";
  @Component
  export default class AccomplishedPrescription extends Vue {
    id: string = ""; //康复记录id
    dailyPrescriptions!: Prescriptions.PrescriptionsDetail;
    loadding: boolean = false;
    mounted() {
      this.id = this.$route.params.id;
      this.getAccomplishedPrescription();
    }
    /**
     * 回到上页
     */
    back() {
      this.$store.state.isBack = true;
      this.$router.back();
    }
    getAccomplishedPrescription() {
      this.$server.getAccomplishedPrescription(this.id).then(res => {
        this.dailyPrescriptions = res.result;
        this.loadding = true;
      });
    }
    getExerciseType(input: string) {
      return common.getExerciseType(input);
    }
    changeTime(input: string) {
      return moment(input).format("HH.mm.ss");
    }
    getDate(input: number) {
      return moment(input).format("YYYY.MM.DD");
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
    > div {
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
            text-align: left;
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

      > .doctor {
        text-align: right;
        font-size: 1.25rem;
        padding: 0.8rem 0 0;
        font-weight: bold;
        color: #262e4f;
      }
    }
  }
</style>