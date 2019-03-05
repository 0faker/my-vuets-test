<template>
  <div class="cyclebp">
    <div class="title">周期血压动态</div>
    <div id="cyclebp"></div>
  </div>
</template>
<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  import echarts from "echarts";
  @Component
  export default class CyclebpChart extends Vue {
    @Prop() cyclebpData: any;
    CyclebpChart: any; // 图表实例
    mounted() {
      this.drawLine();
    }
    drawLine() {
      this.CyclebpChart = echarts.init(document.getElementById("completion") as
        | HTMLDivElement
        | HTMLCanvasElement);
      window.addEventListener("resize", () => {
        this.CyclebpChart.resize();
      });
      let Xdata: any = [];

      //  收缩压
      let DBP: number[] = [];
      // 舒张压
      let SBP: number[] = [];
      let SBPcolor = [];
      //y轴最大值;跟随最大占比变化
      let MaxY = 0;
      this.cyclebpData.forEach((element: any) => {
        Xdata.push(element.times);
        DBP.push(element.bpBound.split("/")[0]);
        SBP.push(element.bpBound.split("/")[1]);
      });
      let index = Xdata.length;
      let Xend = 100 / Math.ceil(index / 7);
      this.CyclebpChart.setOption({
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          nameTextStyle: {
            backgroundColor: "red"
          },
          type: "category",
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          boundaryGap: false,
          data: Xdata
        },
        yAxis: {
          nameTextStyle: {
            // backgroundColor: "rgba(126,211,33,0.10)"
          },
          type: "value",
          name: "mmHg",
          center: "center",
          min: 0,
          // max: 300,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        visualMap: [
          {
            type: "piecewise",
            top: -20000,
            seriesIndex: 0,
            pieces: [
              {
                gt: 60,
                lte: 90,
                color: "#FA5452"
              },
              {
                gt: 90,
                lte: 140,
                color: "#9AD122"
              },
              {
                gt: 140,
                color: "#00B1FE"
              }
            ],
            outOfRange: {
              color: "#999"
            }
          },
          {
            type: "piecewise",
            top: -20000,
            seriesIndex: 1,
            pieces: [
              {
                gt: 0,
                lte: 60,
                color: "#FA5452"
              },
              {
                gt: 60,
                lte: 90,
                color: "#9AD122"
              },
              {
                gt: 90,
                color: "#00B1FE"
              }
            ],
            outOfRange: {
              color: "#999"
            }
          }
        ],
        series: [
          {
            name: "收缩压",
            type: "line",

            itemStyle: {
              color: "#000"
            },
            symbol: "circle",
            symbolSize: 10,
            data: DBP,
            markLine: {
              symbol: "none",
              lineStyle: {
                color: "#979797",
                type: "solid"
              },
              data: [
                {
                  yAxis: 140
                },
                {
                  yAxis: 90
                },
                {
                  yAxis: 60
                }
              ]
            },
            label: {
              show: true,
              position: "top"
            }
          },
          {
            name: "舒张压",
            type: "line",

            itemStyle: {
              color: "#000"
            },
            symbolSize: 10,
            symbol: "diamond",
            data: SBP,
            label: {
              show: true,
              position: "bottom"
            }
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
        legend: {
          itemWidth: 10,
          itemHeight: "10",
          top: "0",
          data: [
            {
              name: "收缩压",
              icon: "emptyCircle"
            },
            {
              name: "舒张压",
              icon: "emptyDiamond"
              // textStyle: {
              //   color: "#5585F1"
              // }
            }
          ]
        }
      });
    }
  }
</script>
<style lang='scss' scoped>
  .cyclebp {
    // background-color: #fff;
    > .title {
      display: block;
      text-align: center;
      font-size: 0.9rem;
      color: #7a7979;
      padding: 1rem;
    }
  }
  #cyclebp {
    width: 100%;
    height: 300px;
    background-color: #fff;
    overflow: hidden;
  }
</style>