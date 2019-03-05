  <template>
  <div class="effectiveExercise">
    <div class="effectiveExercise-l">
      <div class="date">
        <span> 日期</span>
      </div>
      <div>
        <span> 处方设定运动时长<br> (min)</span>
      </div>
      <div>
        <span> 总运动时长<br> (min)</span>
      </div>
      <div>
        <span> 完成率<br> (%)</span>
      </div>
      <div>
        <span> 有效运动时长<br> (min)</span>
      </div>
      <div>
        <span> 有效运动时长占比<br> (%)</span>
      </div>
    </div>
    <div class="effectiveExercise-r">
      <table
        cellpadding="0"
        cellspacing="0"
      >
        <tr class="clearfix date">
          <td
            v-for="item in date"
            :key="item.id"
            class="thead"
          >{{item}}</td>
          <td>平均</td>
        </tr>
        <tr class="clearfix">
          <td
            v-for="item in prescriptionsExerciseTime"
            :key="item.id"
          >{{item}}</td>
          <td>{{avg(prescriptionsExerciseTime)}}</td>
        </tr>
        <tr class="clearfix">
          <td
            v-for="item in totalEffectiveExerciseTime"
            :key="item.id"
          >{{item}}</td>
          <td>{{avg(totalEffectiveExerciseTime)}}</td>
        </tr>
        <tr class="clearfix rate">
          <td
            v-for="item in completeRate"
            :key="item.id"
          >{{item}}</td>
          <td>{{avg(completeRate)}}</td>
        </tr>
        <tr class="clearfix">
          <td
            v-for="item in effectiveExerciseTime"
            :key="item.id"
          >{{item}}</td>
          <td>{{avg(effectiveExerciseTime)}}</td>
        </tr>
        <tr class="clearfix rate">
          <td
            v-for="item in effectiveExerciseTimePercent"
            :key="item.id"
          >{{item}}</td>
          <td>{{avg(effectiveExerciseTimePercent)}}</td>
        </tr>
      </table>
    </div>

  </div>
</template>
<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  import moment from "moment";
  @Component
  export default class EffectiveExercise extends Vue {
    @Prop() effectiveExercise: any;
    date: any = []; //日期
    prescriptionsExerciseTime: number[] = []; //处方设定运动时长(min)
    totalEffectiveExerciseTime: number[] = []; //总运动时长(min)
    completeRate: number[] = []; //完成率(%)
    effectiveExerciseTime: number[] = []; //有效运动时长(min)
    effectiveExerciseTimePercent: number[] = []; //有效运动时长占比(%)
    mounted() {
      console.log(this.effectiveExercise);
      this.effectiveExercise.forEach((element: any) => {
        this.date.push(moment(element.prescriptionDate).format("M月D日"));
        this.effectiveExerciseTime.push(element.effectiveExerciseTime);
        this.effectiveExerciseTimePercent.push(
          element.effectiveExerciseTimePercent
        );
        this.prescriptionsExerciseTime.push(element.dayExerciseTime);
        this.totalEffectiveExerciseTime.push(element.patientExerciseTime);

        // effectiveExerciseRate.push(element.effectiveExerciseTimePercent);
        this.completeRate.push(
          Math.round(
            (element.patientExerciseTime / element.dayExerciseTime) * 100
          )
        );
      });
    }
    /**
     * 求数组的平均数
     * @param array
     */
    avg(array: any[]) {
      let result = 0;
      let index = array.length;
      if (index != 0) {
        array.forEach(element => {
          result += element;
        });
        return Math.round(result / index);
      }
    }
  }
</script>
<style lang='scss' scoped>
  .effectiveExercise {
    display: flex;
    > .effectiveExercise-l {
      // width: 8rem;
      > div {
        height: 4.25rem;
        width: 10rem;
        padding: 0% 0.375rem;
        position: relative;
        border-bottom: 2px solid #ffffff;
        background: rgba(76, 175, 80, 0.8);
        text-align: center;
        > span {
          color: #fff;
          font-size: 1.15rem;
          position: absolute;
          // display: block;
          top: 50%;
          left: 50%;
          width: 100%;
          line-height: 1.65rem;
          // -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
        }
      }
    }
    > .effectiveExercise-r {
      flex: 1;
      flex-grow: 1;
      overflow: hidden;
      overflow: scroll;
      > table {
        // margin-top: -0.04rem;
        width: 100%;
        overflow: hidden;
        tr {
          text-align: center;
          display: flex;
          height: 4.25rem;
          line-height: 4.25rem;
          box-sizing: border-box;
          border-bottom: 2px solid #ffffff;
          background: #fafafa;
          &:nth-last-child() {
            border: 0;
          }
          > td {
            flex: 1;
            flex-grow: 1;
            font-size: 1.25rem;
            white-space: nowrap;
            color: #6b6b6b;
            border-left: 1px solid #ffffff;
            padding: 0 0.35rem;
            min-width: 5.25rem;
          }
          > .thead {
            font-size: 0.87rem;
          }
        }
        .date,
        .rate {
          background: #f3f3f3;
        }
        .rate {
          color: #7a7979;
        }
      }
    }
  }
</style>