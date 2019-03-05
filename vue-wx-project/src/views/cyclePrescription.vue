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
                <!-- <doing /> -->
                <svg
                  v-if="item.status===1"
                  width="2.08rem"
                  height="2.08rem"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <!-- Generator: Sketch 48.1 (47250) - http://www.bohemiancoding.com/sketch -->
                  <title>recipe_ic_doing</title>
                  <desc>Created with Sketch.</desc>
                  <defs></defs>
                  <g
                    id="亲属端"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g
                      id="recipe_ic_doing"
                      fill="#646464"
                      fill-rule="nonzero"
                    >
                      <path
                        d="M781,669 L429,669 L429,317 C429,297.8 441.8,285 461,285 C480.2,285 493,297.8 493,317 L493,605 L781,605 C800.2,605 813,617.8 813,637 C813,656.2 800.2,669 781,669 Z M1024,473.6 L1024,467.2 C1024,451.2 1008,438.4 988.8,441.6 C969.6,441.6 956.8,460.8 960,476.8 L960,534.4 C960,553.6 972.8,566.4 988.8,569.6 L992,569.6 C1008,569.6 1024,556.8 1024,540.8 L1024,512 L1024,473.6 Z M956.8,691.2 C940.8,684.8 921.6,691.2 915.2,707.2 C905.6,726.4 896,742.4 886.4,758.4 C876.8,774.4 880,793.6 896,803.2 C902.4,806.4 908.8,809.6 912,809.6 C921.6,809.6 931.2,803.2 937.6,796.8 C950.4,777.6 960,758.4 969.6,739.2 C982.4,720 972.8,700.8 956.8,691.2 Z M809.6,889.6 C800,873.6 780.8,870.4 764.8,880 C748.8,889.6 732.8,899.2 713.6,908.8 C697.6,915.2 691.2,934.4 700.8,950.4 C707.2,963.2 716.8,969.6 729.6,969.6 C736,969.6 739.2,969.6 745.6,966.4 C764.8,956.8 784,944 803.2,931.2 C816,924.8 819.2,905.6 809.6,889.6 Z"
                        id="Shape"
                      ></path>
                      <path
                        d="M969.6,310.4 L899.2,288 L713.6,227.2 L790.4,160 C710.4,96 614.4,64 512,64 C265.6,64 64,265.6 64,512 C64,758.4 265.6,960 512,960 C531.2,960 544,972.8 544,992 C544,1011.2 531.2,1024 512,1024 C230.4,1024 0,793.6 0,512 C0,230.4 230.4,0 512,0 C630.4,0 745.6,41.6 838.4,118.4 L912,51.2 L956.8,262.4 L969.6,310.4 Z"
                        id="Shape"
                      ></path>
                    </g>
                  </g>
                </svg>
                <!-- <done /> -->
                <svg
                  v-if="item.status===2"
                  width="2.08rem"
                  height="2.08rem"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <!-- Generator: Sketch 49 (51002) - http://www.bohemiancoding.com/sketch -->
                  <title>recipe_ic_done</title>
                  <desc>Created with Sketch.</desc>
                  <defs></defs>
                  <g
                    id="亲属端"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g
                      id="Artboard"
                      transform="translate(-613.000000, -661.000000)"
                      fill="#4CAF50"
                      fill-rule="nonzero"
                    >
                      <g
                        id="recipe_ic_done"
                        transform="translate(613.000000, 661.000000)"
                      >
                        <path
                          d="M512.188824,0.141915845 C230.233104,0.141915845 0.835623541,229.766748 0.835623541,512.001908 C0.835623541,794.237068 230.233104,1023.8619 512.188824,1023.8619 C794.144543,1023.8619 1023.54202,794.237067 1023.54202,512.001907 C1023.54202,229.766747 794.144542,0.141915845 512.188824,0.141915845 Z M799.172515,371.986643 L466.634977,713.226291 C458.6878,721.369318 447.786885,725.992804 436.405612,726.057192 L436.175289,726.057192 C424.879091,726.057192 414.038352,721.55729 406.047598,713.559656 L227.232974,534.608314 C210.584361,517.968126 210.584361,490.955211 227.232974,474.294253 C243.877436,457.629141 270.842856,457.629141 287.487318,474.294253 L435.843292,622.750527 L738.253139,312.337234 C754.731603,295.510113 781.739559,295.194403 798.507483,311.671544 C815.339732,328.145569 815.634379,355.158483 799.172515,371.986643 Z"
                          id="Shape"
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
                <!-- <undo/> -->
                <svg
                  v-if="item.status===0"
                  width="2.08rem"
                  height="2.08rem"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <!-- Generator: Sketch 49 (51002) - http://www.bohemiancoding.com/sketch -->
                  <title>recipe_ic_undo</title>
                  <desc>Created with Sketch.</desc>
                  <defs></defs>
                  <g
                    id="亲属端"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g
                      id="Artboard"
                      transform="translate(-2092.000000, -661.000000)"
                      fill="#FF5252"
                      fill-rule="nonzero"
                    >
                      <g
                        id="recipe_ic_undo"
                        transform="translate(2092.000000, 661.000000)"
                      >
                        <path
                          d="M512.027973,1023.46452 C229.527125,1023.46452 0.527484878,794.464883 0.527484878,511.964035 C0.527484878,229.463187 229.527125,0.463547317 512.027973,0.463547317 C794.528821,0.463547317 1023.52846,229.463187 1023.52846,511.964035 C1023.52846,794.464883 794.528821,1023.46452 512.027973,1023.46452 Z M716.093813,354.082858 C728.589486,341.587185 728.589486,321.331042 716.093813,308.868253 C703.598141,296.405464 683.341998,296.372581 670.846326,308.868253 L512.513002,467.201577 L354.179678,308.868253 C341.684006,296.372581 321.427863,296.372581 308.932191,308.868253 C296.436518,321.363926 296.436518,341.587185 308.932191,354.082858 L467.265514,512.416181 L308.932191,670.749505 C296.436518,683.245177 296.436518,703.468437 308.932191,715.964109 C321.427863,728.459782 341.684006,728.459782 354.179678,715.964109 L512.513002,557.630786 L670.846326,715.964109 C683.341998,728.459782 703.598141,728.459782 716.093813,715.964109 C728.589486,703.468437 728.589486,683.212294 716.093813,670.749505 L557.76049,512.416181 L716.093813,354.082858 Z"
                          id="Shape"
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </main>
  </div>
</template>
<script lang='ts'>
  import { Component, Prop, Vue, Watch } from "vue-property-decorator";
  import moment from "moment";
  import ls from "local-storage";

  // import doing from '../svg/recipe_ic_doing.svg';
  // import done from '../svg/recipe_ic_done.svg';
  // import undo from '../svg/recipe_ic_undo.svg';
  @Component({
    components: {
      // doing,
      // done,
      // undo,
    }
  })
  export default class CyclePrescription extends Vue {
    public id: string = "";
    public cyclePrescriptions: Prescriptions.CyclePrescriptions[] = []; // 所有周期处方
    public cyclePrescription?: Prescriptions.CyclePrescriptions; // 当前处方
    public dailyPrescriptions: Prescriptions.DailyPrescriptions[] = []; // 周期处方内所有日处方
    public prescriptionTime: string = "";
    public loadding: boolean = false;
    public mounted() {
      this.id = this.$route.params.id;
      console.log(this.id);
      this.getCyclePrescriptions();
    }

    /**
     * 回到上页
     */
    public back() {
      this.$store.state.isBack = true;
      this.$router.back();
    }

    /**
     * 获取周期处方
     */
    public getCyclePrescriptions() {
      this.cyclePrescriptions = ls.get("cyclePrescriptions");
      this.cyclePrescription = this.cyclePrescriptions.find(
        x => x.id === +this.id
      );
      this.dailyPrescriptions = this.cyclePrescription
        ? this.cyclePrescription.dailyPrescriptions
        : [];
      this.dailyPrescriptions.forEach(e => {
        if (
          // 不为完成状态
          e.status !== 2
        ) {
          if (
            moment(e.prescriptionDate).isBefore(moment().format("YYYY-MM-DD"))
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
    public getAddTime(input: string) {
      return moment(input).format("YYYY.MM.DD");
    }

    /**
     * 查看日处方
     */
    public check(id: number) {
      ls.set("dailyprescriptions", this.dailyPrescriptions);
      this.$router.push({ path: "/dailyprescriptions/" + id });
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
                font-weight: bolder;
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