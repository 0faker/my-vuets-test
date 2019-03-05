<template>
  <div class="hr-distribution">

    <div id="hr-distribution"></div>

  </div>
</template>
<script lang='ts'>
  import { Component, Prop, Vue ,Watch} from "vue-property-decorator";
  import echarts from "echarts";
  import common from "../common/common";
  @Component
  export default class HrDistribution extends Vue {
    @Prop() HrDistributionData: any;
    public HrDistributionChart: any; // 图表实例
    Xdata: string[] = [];
    maxHr: number[] = [];
    minHr: number[] = [];
    avgHr: number[] = [];
    mounted() {
      this.getData();
    }
    getData() {
      console.log(this.HrDistributionData);
      this.HrDistributionData.forEach((e: any) => {
        this.Xdata.push(common.getDayMonth(e.prescriptionDate));
        this.maxHr.push(e.maxHr);
        this.avgHr.push(e.avgHr);
        this.minHr.push(e.minHr);
      });
      this.drawLine();
    }
    drawLine() {
      this.HrDistributionChart = echarts.init(document.getElementById(
        "hr-distribution"
      ) as HTMLDivElement | HTMLCanvasElement);
      let index = this.Xdata.length;
      let Xend = 100 / Math.ceil(index / 7);
      this.HrDistributionChart.setOption({
        tooltip: {
          trigger: "axis"
        },

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
        legend: {
          itemWidth: 10,
          itemHeight: "10",
          top: "10",
          selectedMode: false,
          data: [
            {
              name: "最高",
              icon: "rect",
              textStyle: {
                color: "#FA5452"
              }
            },
            {
              name: "最小",
              icon: "rect",
              textStyle: {
                color: "#5585F1"
              }
            },
            {
              name: "平均",
              icon: "rect",
              textStyle: {
                color: "#9AD122"
              },
              itemStyle: {
                color: "#9AD122"
              }
            }
          ],

          right: "4%"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          axisLine: {
            show: false
          },
          nameTextStyle: {
            backgroundColor: "red"
          },
          boundaryGap: true,
          axisTick: {
            show: false
          },

          data: this.Xdata
        },
        yAxis: {
          type: "value",
          name: "bpm",
          center: "center",
          min: 0,
          max: "dataMax",
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: "最高",
            type: "line",
            //   stack: "总量",
            lineStyle: {
              color: "#FA5452"
            },
            itemStyle: {
              color: "#FA5452"
            },

            data: this.maxHr,
            label: {
              show: true
              // position:""
            }
          },
          {
            name: "最小",
            type: "line",
            //   stack: "总量",
            lineStyle: {
              color: "#5585F1"
            },
            itemStyle: {
              color: "#5585F1"
            },
            label: {
              show: true
              // position:""
            },
            data: this.minHr
          },
          {
            name: "平均",
            type: "line",
            //   stack: "总量",
            lineStyle: {
              color: "#9AD122"
            },
            itemStyle: {
              color: "#9AD122"
            },
            label: {
              show: true
              // position:""
            },
            data: this.avgHr
          }
        ]
      });
    }
  }
</script>
<style lang='scss' scoped>
  #hr-distribution {
    width: 100%;
    height:20rem;
    background-color: #fff;
    overflow: hidden;
  }
</style>