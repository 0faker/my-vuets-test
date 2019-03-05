<template>
  <div>
    <div id="METs"></div>
  </div>
</template>
<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  import echarts from "echarts";
  import common from "../common/common";
  @Component
  export default class MetsRate extends Vue {
    @Prop() reportInfo!: ReportInfo.chartDTOList[];
    public METsChart: any; // 图表实例
    metsLtoet3: number[] = [];
    metsLtoet5: number[] = [];
    metsGt8: number[] = [];
    metsLtoet8: number[] = [];
    Xdata: string[] = [];
    mounted() {
      this.getData();
    }
    getData() {
      this.reportInfo.forEach((e: ReportInfo.chartDTOList) => {
        this.metsLtoet3.push(e.metsLtoet3);
        this.metsLtoet5.push(e.metsLtoet5);
        this.metsLtoet8.push(e.metsLtoet8);
        this.metsGt8.push(e.metsGt8);
        this.Xdata.push(common.getDayMonth(e.prescriptionDate));
      });
      this.drawLine();
    }
    drawLine() {
      let index = this.Xdata.length;
      let Xend = 100 / Math.ceil(index / 7);
      this.METsChart = echarts.init(document.getElementById("METs") as
        | HTMLDivElement
        | HTMLCanvasElement);
      this.METsChart.setOption({
        color: ["#003366", "#006699", "#4cabce", "#e5323e"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          itemWidth: 10,
          itemHeight: "10",
          selectedMode: false,
          bottom: "0%",
          data: ["METs≤3", "3＜METs≤5", "5＜METs≤8", "METs＞8"]
        },

        calculable: true,
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: this.Xdata
          }
        ],
        dataZoom: [
          {
            show: false,
            start: 0,
            end: Xend
          },
          {
            type: "inside",
            start: 0,
            end: 100
          },
          {
            show: false,
            yAxisIndex: 0,
            filterMode: "empty",
            width: 30,
            height: "80%",
            showDataShadow: false,
            left: "93%"
          }
        ],
        yAxis: {
          type: "value",
          name: "%",
          center: "center",
          min: 0,
          max: 100,

          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: "METs≤3",
            type: "bar",
            barGap: 0,
            data: this.metsLtoet3,
            itemStyle: {
              color: "#00B1FE"
            },
            label: {
              show: true,
              position: "top"
            }
          },
          {
            name: "3＜METs≤5",
            type: "bar",
            itemStyle: {
              color: "#F86161"
            },
            label: {
              show: true,
              position: "top"
            },

            data: this.metsLtoet5
          },
          {
            name: "5＜METs≤8",
            type: "bar",
            lable: {
              show: true
            },
            itemStyle: {
              color: "#FCC015"
            },
            data: this.metsLtoet8,
            label: {
              show: true,
              position: "top"
            }
          },
          {
            name: "METs＞8",
            type: "bar",
            itemStyle: {
              color: "#0ABA08"
            },
            data: this.metsGt8,
            label: {
              show: true,
              position: "top"
            }
          }
        ]
      });
    }
  }
</script>
<style lang='scss' scoped>
  #METs {
    width: 100%;
    height: 300px;
    overflow: hidden;
    /* background-color: #fff; */
  }
</style>