<template>
  <div class="report">
    <div class="time">{{date}}</div>
    <table class="contants">
      <tr>
        <th>
          <span>指标</span>
        </th>
        <th>
          <span>处方设定值</span>
        </th>
        <th>
          <span>处方检测值</span>
        </th>
      </tr>
      <tr>
        <td>
          <span class="target">运动心率<br>(bpm)</span>
        </td>
        <td>
          <span>最大：{{reportInfo.sdMaxHrOfExercise}}<br>最小：{{reportInfo.sdMinHrOfExercise}}</span>
        </td>
        <td>
          <span>最大：{{reportInfo.jcMaxHrOfExercise}}<br>最小：{{reportInfo.jcMinHrOfExercise}}<br>平均：{{reportInfo.jcAvgHrOfExercise}}</span>
        </td>
      </tr>
      <tr>
        <td>
          <span class="target">运动形式</span>
        </td>
        <td>
          <span>{{getExerciseType(reportInfo.sdExerciseType)}}</span>
        </td>
        <td>
          <span>{{getExerciseType(reportInfo.jcExerciseType)}}</span>
        </td>
      </tr>
      <tr>
        <td>
          <span class="target">运动总时长</span>
        </td>
        <td>
          <span>{{reportInfo.sdExerciseTimeSum}}分钟</span>
        </td>
        <td>
          <span>{{reportInfo.jcExerciseTimeSum}}分钟</span>
        </td>
      </tr>
      <tr>
        <td>
          <span class="target">运动总频次</span>
        </td>
        <td>
          <span>{{reportInfo.sdExerciseFrequencySum}}次</span>
        </td>
        <td>
          <span>{{reportInfo.jcExerciseFrequencySum}}次</span>
        </td>
      </tr>
      <tr>
        <td>
          <span class="target">心率异常<br>(次)</span>
        </td>
        <td class="empty">
        </td>
        <td>
          <ul class="unusual">
            <li
              v-for="(item) in unusualHr"
              :key="item.id"
              v-cloak
            >
              {{item.name}}：{{item.val}}次
            </li>
          </ul>
        </td>
      </tr>
      <tr class="jlfx">
        <span>结论分析：</span>
        <p>
          {{reportInfo.content}}
        </p>
      </tr>
    </table>
  </div>
</template>
<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  import common from "../common/common";
  @Component
  export default class ReportTable extends Vue {
    @Prop() reportInfo!: ReportInfo.ReportInfos;
    unusualHr: {
      name: string;
      val: string;
    }[] = []; // 异常心电
    date: string = "";
    mounted() {
      console.log(this.reportInfo);
      this.date =
        common.getDate(this.reportInfo.startTime, "point") +
        "-" +
        common.getDate(this.reportInfo.endTime, "point");
      if (this.reportInfo.dgszbNum) {
        let _a = { name: "单个室早搏异常", val: this.reportInfo.dgszbNum };
        this.unusualHr.push(_a);
      }
      if (this.reportInfo.cdszbNum) {
        let _b = { name: "成对室早搏异常", val: this.reportInfo.cdszbNum };
        this.unusualHr.push(_b);
      }
      if (this.reportInfo.ssNum) {
        let _c = { name: "室速异常", val: this.reportInfo.ssNum };
        this.unusualHr.push(_c);
      }
      if (this.reportInfo.sxellNum) {
        let _d = { name: "室性二联律异常", val: this.reportInfo.sxellNum };
        this.unusualHr.push(_d);
      }
      if (this.reportInfo.sxsllNum) {
        let _e = { name: "室性三联律异常", val: this.reportInfo.sxsllNum };
        this.unusualHr.push(_e);
      }
      if (this.reportInfo.sszbNum) {
        let _f = { name: "室上早搏异常", val: this.reportInfo.sszbNum };
        this.unusualHr.push(_f);
      }
      if (this.reportInfo.cdsszbNum) {
        let _g = {
          name: "成对室上早搏异常",
          val: this.reportInfo.cdsszbNum
        };
        this.unusualHr.push(_g);
      }
      if (this.reportInfo.sssNum) {
        let _h = { name: "室上速异常", val: this.reportInfo.cdsszbNum };
        this.unusualHr.push(_h);
      }
      if (this.reportInfo.ssxellNum) {
        let _i = {
          name: "室上性二联律异常",
          val: this.reportInfo.ssxellNum
        };
        this.unusualHr.push(_i);
      }
      if (this.reportInfo.ssxsllNum) {
        let _j = {
          name: " 室上性三联律异常",
          val: this.reportInfo.ssxellNum
        };
        this.unusualHr.push(_j);
      }
      if (this.reportInfo.tbNum) {
        let _k = { name: " 停博异常", val: this.reportInfo.tbNum };
        this.unusualHr.push(_k);
      }
      if (this.reportInfo.fcNum) {
        let _l = { name: "房颤异常", val: this.reportInfo.fcNum };
        this.unusualHr.push(_l);
      }
      if (this.reportInfo.fpNum) {
        let _m = { name: "房扑异常", val: this.reportInfo.fpNum };
        this.unusualHr.push(_m);
      }
      if (this.reportInfo.xlbqNum) {
        let _n = { name: "心率不齐异常", val: this.reportInfo.xlbqNum };
        this.unusualHr.push(_n);
      }
      if (this.reportInfo.xdgsNum) {
        let _o = { name: "心动过速异常", val: this.reportInfo.xdgsNum };
        this.unusualHr.push(_o);
      }
      if (this.reportInfo.xdghNum) {
        let _p = { name: "心动过缓异常", val: this.reportInfo.xdghNum };
        this.unusualHr.push(_p);
      }
    }
    /**
     * 转换运动形式
     * @param input 运动形式
     */
    getExerciseType(input: string) {
      return common.getExerciseType(input);
    }
  }
</script>
<style lang='scss' scoped>
  .report {
    margin: 1rem 0;
    > .time {
      width: 100%;
      height: 3.3rem;
      font-size: 1.5rem;
      text-align: center;
      background-color: #56b05a;
      color: white;
      line-height: 3.3rem;
    }
    .contants {
      width: 100%;
      margin: 1rem 0;
      border: 1px solid $baseGreen;
      tr {
        display: flex;
        border-bottom: 1px solid #d0e9cf;
        > th:nth-of-type(2) {
          border-left: 1px solid #d0e9cf;
          border-right: 1px solid #d0e9cf;
        }
        > td:nth-of-type(2) {
          border-left: 1px solid #d0e9cf;
          border-right: 1px solid #d0e9cf;
        }

        th {
          flex: 1;
          flex-grow: 1;
          padding: 0.3rem 0;
          font-size: 1.5rem;
          text-align: center;
          span {
            display: block;
            width: 100%;
            color: #56b05a;
            letter-spacing: 0;
            font-weight: bold;
          }
        }
        td {
          flex: 1;
          flex-grow: 1;
          text-align: center;
          padding: 0.4rem 0;
          position: relative;
          min-height: 6.5rem;
          span {
            font-size: 1.25rem;
            display: block;
            width: 100%;
            color: #646464;
            // height: 100%;
            letter-spacing: 0;
            position: absolute;
            top: 50%;
            left: 0%;
            transform: translateY(-50%);
          }
          > .target {
            color: #717171;
            font-weight: 600;
          }
          > .unusual {
            padding: 0;
            > li {
              padding: 0 0.6rem;
              font-size: 1.25rem;
              display: block;
              width: 100%;
              color: #717171;
              letter-spacing: 0;
            }
          }
        }
        .empty {
          padding: 0 !important;
          background: url(../assets/path_oblique_report@2x.png) no-repeat;
          background-size: 100% 100%;
        }
      }
      tr:nth-last-of-type(1) {
        border-top: 1px solid #56b05a;
      }
      tr:nth-last-of-type(2) {
        border: 0;
      }
      > .jlfx {
        padding: 0.3rem;
        display: block;
        text-align: left;
        border-bottom: none;
        > span {
          /* text-align: left; */
          color: #717171;
          font-size: 1.25rem;
          letter-spacing: 0;
          font-weight: bold;
        }
        > p {
          width: 100%;
          color: #646464;
          font-size: 1.25rem;
          letter-spacing: 0;
          text-align: left;
        }
      }
    }
  }
</style>