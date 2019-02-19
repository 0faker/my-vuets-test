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
        {{title}}
      </div>
    </div>
    <div
      class="main"
      v-if="loadding"
      @scroll="lazyload($event)"
    >
      <h2> 3分钟心电分析结果</h2>
      <div>
        <div>平均心搏数</div>
        <div class="data">{{threeMinMonitorResult.avgHr}}</div>
        <div style="min-width:6rem ; text-align:right">次/分钟</div>

      </div>
      <div>
        <div>心电异常数</div>
        <div class="data">{{threeMinMonitorResult.exceptionNumber}}</div>
        <div style="min-width:6rem; text-align:right">次</div>
      </div>
      <div
        class="ecg"
        ref="ecg"
      >
        <h3>心电异常分析</h3>
        <ul
          class="charts"
          ref="charts"
        >
          <li
            class="chart"
            v-for="item in unusualList"
            :key="item.id"
          >
            <ecg-chart
              :ecgPointData='ecgPointData'
              :unusualPoint='item'
              :ecgChartId='item.id'
            ></ecg-chart>
          </li>
          <!-- <div
              class="chart"
              v-for="item in unusualList"
              :key="item.id"
            >
              <div class="ecgGround"></div>
              <div class="time">{{getTime(item.Offset)}}</div>
              <div class="Label">{{item.Label}}</div>
              <div
                :id="item.id"
                style="height: 100%; width: 100%; margin-left:auto;margin-right:auto;"
              ></div>
            </div> -->
        </ul>

      </div>
      <div class="suggestion">
        <h3>建议</h3>
        <p v-if="threeMinMonitorResult.exceptionNumber>0">
          检测到疑似室性异常{{threeMinMonitorResult.exceptionNumber}}次，如您有明显不适情况，请及早就医。
        </p>
        <p v-if="threeMinMonitorResult.exceptionNumber==0">
          未监测到任何异常，请您保持适当运动。
        </p>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  import common from "../common/common";
  import ecgChart from "../components/ecg.vue";
  import * as $ from "jquery";
  import OSS from "ali-oss";
  import JSZip from "jszip";
  import "jszip-utils";
  declare var JSZipUtils: any;
  @Component({
    components: { ecgChart }
  })
  export default class ThreeMinutesResult extends Vue {
    public threeMinMonitorResult: any;
    public threeMinMonitorId!: number;
    public unusualList: any[] = [];
    public title: string = "";
    public ecgPointData: any = [];
    public loadding: boolean = false;
    public JsZip: JSZip = new JSZip();
    public created() {
      this.threeMinMonitorId = +this.$route.params.id;
      this.getThreeMinMonitorResult();
      this.getSts();
      // console.log(JSZip);
      // console.log(JSZipUtils);
    }
    /**
     * 回到上页
     */
    public back() {
      this.$store.state.isBack = true;
      this.$router.back();
    }
    public lazyload() {}
    public getThreeMinMonitorResult() {
      this.loadding = false;
      this.$server.GetAnalysisResult(this.threeMinMonitorId).then(data => {
        this.threeMinMonitorResult = data.result;
        this.title =
          common.getDate(
            this.threeMinMonitorResult.threeMinutesEcgRecord.startTime,
            "hms"
          ) +
          "-" +
          common.getDate(
            this.threeMinMonitorResult.threeMinutesEcgRecord.endTime,
            "hms"
          );
        this.unusualList = JSON.parse(this.threeMinMonitorResult.exceptionResult);
        // 为每个异常点添加id和时间
        this.unusualList.forEach((element, index) => {
          element.id = index;
        });
        console.log(this.unusualList);
        this.loadding = true;
      });
    }
    /**
     * oss签名
     */
    public getSts() {
      this.$server.GetStsTicket().then(
        res => {
          const stsToken = res;
          const client = new OSS({
            region: "oss-cn-shanghai",
            accessKeyId: stsToken.AccessKeyId,
            accessKeySecret: stsToken.AccessKeySecret,
            stsToken: stsToken.SecurityToken,
            bucket: "pcy-zzjc-kf-bucket"
          });
          this.getEcgData(client);
        },
        err => {}
      );
    }
    /**
     * 读取oss心电图数据
     * @param client
     */
    public async getEcgData(client: any) {
      // 生成链接
      const url = client.signatureUrl(
        this.threeMinMonitorResult.threeMinutesEcgRecord.hrFilename
      );
      // 通过jsZip解压文件
      const promise = new JSZip.external.Promise((resolve: any, reject: any) => {
        JSZipUtils.getBinaryContent(url, (err: any, data: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
      promise
        // .then(JSZip.loadAsync)
        .then((zip: any) => {
          // 读取指定文件

          return zip
            .file(
              this.threeMinMonitorResult.threeMinutesEcgRecord.hrFilename + ".ed"
            )
            .async("arraybuffer");
        })
        .then(
          (text: any) => {
            this.conversionArreyBuffer(text);
          },
          function error(e: any) {
            console.log("erroe");
          }
        );
    }
    /**
     * 转换arraybuffer
     */
    public conversionArreyBuffer(arraybuffer: ArrayBuffer) {
      const view = new DataView(arraybuffer);
      for (let i = 0; i < arraybuffer.byteLength / 4; i++) {
        this.ecgPointData.push({
          y: (view.getInt32(i * 4) - 2048) * (3300 / 4096.0 / 500.0) + 2,
          x: i
        });
      }
    }
  }
</script>
<style lang='scss' scoped>
  .main {
    background-color: #f7f7f7;
    width: 100%;
    padding: 1rem;
    flex: 1;
    overflow: scroll;
    > h2 {
      text-align: center;
      font-size: 1.5rem;
      color: $basefontcolor2;
      font-weight: bolder;
      margin: 0;
      margin-bottom: 1rem;
    }

    > div {
      padding: 1rem;
      background-color: #fff;
      color: $basefontcolor2;
      display: flex;
      margin: 0.5rem 0;
      font-weight: bold;
      font-size: 1.5rem;
      > div {
        font-weight: bold;
      }
      > .data {
        position: relative;
        flex: 1;
        flex-grow: 1;
        text-align: center;
        color: #ff5722;
      }
    }

    .suggestion {
      display: block;
      color: #fff;
      background-color: #4caf50;
      border-radius: 0.15rem;
      padding: 1rem;

      > h3 {
        text-align: center;
        font-size: 1.5rem;
        font-weight: 600;
        font-weight: bolder;
        margin: 0;
        color: #fff;
        text-align: left;
      }

      > p {
        text-align: center;
        font-size: 1.5rem;
        // font-weight: bolder;
        line-height: 3rem;
        margin: 1rem 0;
        color: #fff;
        text-align: left;
      }
    }

    .ecg {
      padding: 1rem;
      display: block;
      overflow: scroll;
      text-align: left;
      position: relative;
      // max-height: 40rem;
      // height: 100rem;
      > .charts {
        > .chart {
          width: 100%;
          height: 18rem;
          border: 1px solid #ff5722;
          margin-top: 1rem;
          position: relative;
          .ecgGround {
            position: absolute;
            opacity: 0;
            top: 0;
            left: 0;
            z-index: 1;
            width: 100%;
            height: 100%;
          }
          > .time {
            position: absolute;
            bottom: 0;
            letter-spacing: 0.3rem;
            left: 0.3rem;
            background-color: #fff;
            z-index: 2;
          }
          .Label {
            position: absolute;
            top: 0.3rem;
            // letter-spacing: 0.2rem;
            left: 50%;
            transform: translateX(-50%);
            color: #ff5722;
            font-size: 1.5rem;
            z-index: 2;
          }
        }
      }

      > h3 {
        // text-align: center;
        font-size: 1.5rem;
        font-weight: bolder;
        margin: 0;
        // color: #fff;
        text-align: left;
      }
    }

    .canvasjs-chart-credit {
      display: none !important;
    }
  }
</style>