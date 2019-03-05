<template>
  <div
    class="reportlists"
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
        康复报告
      </div>
      <div>

      </div>
    </div>
    <main>
      <div>
        <h2>康复报告列表</h2>
        <table>
          <thead></thead>
          <tbody>
            <tr>
              <th>处方周期</th>
              <th>医生</th>
              <th>下发日期</th>
              <th>查看报告</th>
            </tr>
            <tr
              v-for="(item) in reports"
              :key="item.id"
            >
              <td>
                {{getAddTime(item.startTime)}}
                <br>-- <br>
                {{getAddTime(item.endTime)}}

              </td>
              <td>{{item.doctor.name}}</td>
              <td style="fontSize:1.115rem">
                {{getAddTime(item.addTime)}}
              </td>
              <td @click="check(item.id)"> <a href="javascript:;"> 查看</a></td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <div>

      </div> -->
    </main>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import moment from 'moment';
import ls from 'local-storage';
@Component
export default class ReportLists extends Vue {
    public id: string = '';
    public loadding: boolean = false;
    public reports: ReportInfo.ReportInfos[] = [];

    public mounted() {
    this.id = this.$route.params.id;
    console.log(this.id);
    this.getReportLists();
  }

  /**
   * 回到上页
   */
    public back() {
    this.$store.state.isBack = true;
    this.$router.back();
  }
  /**
   * 获取报告列表
   */
    public getReportLists() {
    this.$server
      .getReportLists(+this.id)
      .then((res: ReportInfo.ReportInfoLists) => {
        this.reports = res.result;
        this.loadding = true;
      });
  }
  /**
   * 时间戳=>字符串
   */
    public getAddTime(input: string) {
    return moment(input).format('YYYY.MM.DD');
  }

  /**
   * 查看日处方
   */
    public check(id: number) {
    this.$router.push({ path: '/report/' + this.id + '/' + id });
  }
}
</script>
<style lang='scss' scoped>
  .reportlists {
    // overflow: hidden;
    min-height: 100%;
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
          text-align: center;
          border: 1px solid #4caf50;
          tr {
            width: 100%;
            border-bottom: 0.5px solid #b6deb8;
            > th {
              border-right: 0.5px solid #b6deb8;
              padding: 0.71rem 0;
              text-align: center;
              font-size: 1.5rem;
              display: table-cell;
              color: $tableFontBorder;
            }
            > th:nth-last-of-type(1) {
              border-right: none;
            }
            > td {
              border-right: 0.5px solid #b6deb8;
              padding: 0.71rem 0;
              font-size: 1.25rem;
              display: table-cell;
              line-height: initial;
              vertical-align: middle; //设置垂直居中
              color: $tableFontBorder;
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
            > td:nth-last-of-type(1) {
              border-right: none;
            }
          }
          tr:nth-last-of-type(1) {
            border-bottom: none;
          }
        }
      }
    }
  }
</style>                                                                                                                                                             