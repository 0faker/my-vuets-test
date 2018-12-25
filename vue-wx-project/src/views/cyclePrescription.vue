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
        周期处方进度
      </div>
      <div>

      </div>
    </div>
    <main>
      <div>
        <h2>{{getAddTime(cyclePrescription.startTime)+"-"+getAddTime(cyclePrescription.endTime)}}</h2>
        <table>
          <thead></thead>
          <tbody>
            <tr>
              <td>序号</td>
              <td>训练日期</td>
              <td>查看详情</td>
              <td>完成情况</td>
            </tr>
            <tr
              v-for="(item,index) in dailyPrescriptions"
              :key="item.id"
            >
              <td>{{index+1}}</td>
              <td>{{getAddTime(item.prescriptionDate)}}</td>
              <td @click="check(item.id)"> <a href="javascript:;"> 查看</a></td>
              <td>
                <doing v-if="item.status===1" />
                <done v-if="item.status===2" />
                <undo v-if="item.status===0" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </main>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import moment from 'moment';
import ls from 'local-storage';

import doing from '../svg/recipe_ic_doing.svg';
import done from '../svg/recipe_ic_done.svg';
import undo from '../svg/recipe_ic_undo.svg';
@Component({
  components: {
    doing,
    done,
    undo,
  },
})
export default class CyclePrescription extends Vue {
    id: string = '';
    cyclePrescriptions: Prescriptions.CyclePrescriptions[] = []; // 所有周期处方
    cyclePrescription?: Prescriptions.CyclePrescriptions; // 当前处方
    dailyPrescriptions: Prescriptions.DailyPrescriptions[] = []; // 周期处方内所有日处方
    prescriptionTime: string = '';
    loadding: boolean = false;
    mounted() {
    this.id = this.$route.params.id;
    console.log(this.id);
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
    this.cyclePrescriptions = ls.get('cyclePrescriptions');
    this.cyclePrescription = this.cyclePrescriptions.find(
      (x) => x.id === +this.id,
    );
    this.dailyPrescriptions = this.cyclePrescription
      ? this.cyclePrescription.dailyPrescriptions
      : [];
    this.dailyPrescriptions.forEach((e) => {
      if (
        // 不为完成状态
        e.status !== 2
      ) {
        if (
          moment(e.prescriptionDate).isBefore(moment().format('YYYY-MM-DD'))
        ) {
          // 训练时间在今天之前为"未完成"
          e.status = 0;
        } else {
          // 训练时间在今天之后为"进行中"
          e.status = 1;
        }
      }
    });
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
    check(id: number) {
    ls.set('dailyprescriptions', this.dailyPrescriptions);
    this.$router.push({ path: '/dailyprescriptions/' + id });
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
      height: 100%;
      padding: 1rem;
      > div {
        padding: 1rem;
        // margin: 1rem;
        height: 100%;
        background-color: #fff;
        > h2 {
          text-align: center;
          margin-bottom: 1rem;
          font-size: 1.5rem;
          color: $baseGreen;
          font-weight: 600;
          font-weight: bold;
        }
        > table {
          width: 100%;
          font-size: 1.5rem;
          text-align: center;
          border-top: 0.5px solid $tableBorder;
          border-left: 0.5px solid $tableBorder;
          tr {
            width: 100%;
            > td {
              border-bottom: 0.5px solid $tableBorder;
              border-right: 0.5px solid $tableBorder;
              padding: 0.71rem 0;
              > a {
                color: $baseGreen;
                &:active,
                &:visited,
                &:focus,
                &:hover {
                  text-decoration: none;
                }
              }
            }
          }
        }
      }
    }
  }
</style>                                                                                                                                                             