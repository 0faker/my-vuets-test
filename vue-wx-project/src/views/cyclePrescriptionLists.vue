<template>
  <div class="prescriptions">
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
        <h2>处方列表</h2>
        <table>
          <thead></thead>
          <tbody>
            <tr>
              <td>医生</td>
              <td>开方日期</td>
              <td>周期（周）</td>
              <td>查看处方</td>
            </tr>
            <tr
              v-for="(item) in cyclePrescriptions"
              :key="item.id"
            >
              <td>{{item.doctor.name}}</td>
              <td>{{getAddTime(item.addTime)}}</td>
              <td>{{item.cycle}}</td>
              <td @click="check(item.id)"> <a href="javascript:;"> 查看</a></td>
            </tr>
          </tbody>
        </table>
      </div>

    </main>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import moment from 'moment';
import ls from 'local-storage';
@Component
export default class CyclePrescriptionLists extends Vue {
    id: string = '';
    cyclePrescriptions: Prescriptions.CyclePrescriptions[] = [];
    mounted() {
    this.id = this.$route.params.id;
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
    this.$server
      .getCyclePrescriptions(+this.id)
      .then((res: Prescriptions.CyclePrescriptions[]) => {
        this.cyclePrescriptions = res;
        this.$store.state.cyclePrescriptions = this.cyclePrescriptions;
      });
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
    ls.set('cyclePrescriptions', this.cyclePrescriptions);
    this.$router.push({ path: '/cycleprescription/' + id });
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