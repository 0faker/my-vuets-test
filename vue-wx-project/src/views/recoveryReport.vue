<template>
  <div
    class="recovery_report"
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
        报告
      </div>
      <div> </div>
    </div>
    <main>
      <h1>运动处方执行周期报告</h1>
      <div class="hospital">{{repordInfo.hospital}}</div>
      <img
        class="cut_off"
        src="../assets/report_cut_off_line.png"
      >
      <table class="report_header">
        <tr>
          <th>申请科室：</th>
          <td style="color:#E69717">{{repordInfo.office}}</td>
        </tr>
        <tr>
          <th>报告编号：</th>
          <td>{{repordInfo.sNumber}}</td>
        </tr>
        <tr>
          <th>报告日期：</th>
          <td>{{repordInfo.addTime}}</td>
        </tr>
        <tr>
          <th>申请医生：</th>
          <td>
            <div class="doctor_name">{{repordInfo.doctorName}}</div>
          </td>
        </tr>
      </table>
      <div class="patient">
        <h2>基本信息</h2>
        <div class="patient_info">
          <div class="name">
            <div class="info_t"></div>
            <div class="info_b"> {{repordInfo.name}}</div>
          </div>
          <div class="sex">
            <div class="info_t"></div>
            <div class="info_b"> {{repordInfo.sex}}</div>
          </div>
          <div class="age">
            <div class="info_t"></div>
            <div class="info_b"> {{repordInfo.age}}</div>
          </div>
          <div class="height">
            <div class="info_t"></div>
            <div class="info_b"> {{repordInfo.height}}</div>
          </div>
          <div class="weight">
            <div class="info_t"></div>
            <div class="info_b"> {{repordInfo.weight}}</div>
          </div>
        </div>
        <div class="body_cell">
          <span></span> 极度肥胖（大于40）
        </div>
        <div class="body_img">
          <img
            src="../assets/report_man_blue.png"
            alt=""
          >
          <div class="bmi">
            BMI：{{repordInfo.bmi||''}}
          </div>
        </div>
      </div>
      <div class="goal">
        <h3>康复目的</h3>
        <div>
          {{repordInfo.recoveryGoal}}
        </div>
      </div>
      <div class="target">
        <h3>康复目标</h3>
        <div>{{repordInfo.recoveryTarget}}</div>
      </div>
    </main>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class RecoveryReportInfo extends Vue {
    public userid: string = '';
    public recordid: string = '';
    public repordInfo!: ReportInfo.ReportInfos;
    public loadding: boolean = false;
    public mounted() {
    this.userid = this.$route.params.userid;
    this.recordid = this.$route.params.recordid;
    this.getReportInfo();
  }
  /**
   * 回到上页
   */
    public back() {
    this.$store.state.isBack = true;
    this.$router.back();
  }
  /**
   * 获取报告内容
   */
    public getReportInfo() {
    this.$server
      .getReportInfo(this.userid, this.recordid)
      .then((res: ReportInfo.ReportInfoResult) => {
        this.repordInfo = res.result;
        console.log(this.repordInfo);
        // -----ui----
        this.loadding = true;
      });
  }
}
</script>
<style lang='scss' scoped>
  .recovery_report {
    background-color: #fff;
    min-height: 100%;
    overflow-x: hidden;
    > .header {
      height: $header-height;
      background-color: $baseGreen;
      color: #fff;
      text-align: center;
      font-size: 1.5rem;
      line-height: $header-height;
      position: relative;
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
      > h1 {
        text-align: center;
        font-size: 2rem;
        color: #232323;
      }
      > .hospital {
        color: #49a84d;
        font-size: 1.5rem;
        margin: 0.165rem;
        text-align: center;
      }
      > .cut_off {
        width: 100%;
        margin: 1rem 0;
      }
      padding: 1rem;
      > table {
        width: 100%;
        border-top: 0.04rem solid #4a4a4a;
        border-left: 0.04rem solid #4a4a4a;
        tr {
          > th,
          > td {
            vertical-align: middle;
            text-align: center;
            border-bottom: 0.04rem solid #4a4a4a;
            border-right: 0.04rem solid #4a4a4a;
            font-size: 1.165rem;
            color: #232323;
          }
          > td {
            text-align: left;
            padding: 0.415rem 0 0.415rem 1rem;
            color: #4a4a4a;
            > div {
              display: inline-block;
              padding: 0 1rem;
              height: 4.04rem;
              line-height: 4.04rem;
              font-size: 1.5rem;
              color: #e69717;
              font-family: "STXingkai";
              background: url("../assets/doctor_sign.png") no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
      > .patient {
        margin-top: 2rem;
        border-radius: 0.5rem;
        border: 1px solid #4caf50;
        overflow: hidden;
        padding: 1rem 0.46rem;
        > h2 {
          text-align: center;
          color: #646464;
          font-size: 1.5rem;
        }
        > .patient_info {
          display: flex;
          justify-content: space-between;
          > div {
            width: 19%;
            height: 5rem;
            border: 1px solid #49a84d;
            border-radius: 5px;
            > .info_t {
              width: 100%;
              height: 2rem;
              background-color: $baseGreen;
            }
            > .info_b {
              height: 3rem;
              display: table-cell;
              width: inherit;
              vertical-align: middle;
              text-align: center;
              // line-height: 3rem;
            }
          }
        }
        > .body_cell {
          text-align: left;
          margin: 0.79rem 0;
          font-size: 1.25rem;
          color: #7a7979;
          > span {
            display: inline-block;
            height: 1.25rem;
            width: 1.25rem;
            vertical-align: baseline;
            background-color: gray;
            margin-right: 0.5rem;
            font-size: 1.25rem;
          }
        }
        > .body_img {
          width: 100%;
          text-align: center;
          position: relative;
          > img {
            width: 60%;
          }
          > .bmi {
            position: absolute;
            top: 30%;
            right: 30%;
            font-size: 1.5rem;
          }
        }
      }
      > .goal,
      > .target {
        width: 100%;
        border: 1px solid #56b05a;
        margin-top: 2rem;
        > h3 {
          padding: 0.625rem;
          background-color: $baseGreen;
          color: #fff;
          font-size: 1.5rem;
          font-weight: bold;
          text-align: center;
        }
        > div {
          padding: 0.71rem 1rem;
          color: #6b6b6b;
          font-size: 1.25rem;
        }
      }
    }
  }
</style>