<template>
  <div class="completion">

    <div id="completion"></div>
    <div class="_r">
      <!-- <div><i></i>实际康复训练 {{this.results.prescriptionAccomplishedNum}}天</div>
       <div><i></i>计划康复训练{{this.results.cyclePrescriptionCycle}}天 </div> -->
      <div style="color:#8b8b8b">
        <i class="all"></i> 计划康复训练
        <span>{{this.validdayRate.cyclePrescriptionCycle*7}}天</span>
      </div>

      <div style="color:#4CAF50">
        <i class="done"></i> 实际康复训练
        <span>{{this.validdayRate.prescriptionAccomplishedNum}}天</span>
      </div>
    </div>
    <div
      class="rate"
      v-cloak
    >
      {{rate}}
    </div>
  </div>
</template>
<script lang='ts'>
  import { Component, Prop, Vue, Watch } from "vue-property-decorator";
  import echarts from "echarts";
  @Component
  export default class Completion extends Vue {
    @Prop() validdayRate: any;
    public completion: any; // 图表实例
    rate: string = "";
    mounted() {
      this.rate =
        Math.round(
          (this.validdayRate.prescriptionAccomplishedNum /
            this.validdayRate.cyclePrescriptionCycle /
            7) *
            100
        ) + "%";
      this.drawLine();
    }
    @Watch("validdayRate")
    computedRate() {}
    drawLine() {
      console.log(this.validdayRate);

      // 基于准备好的dom，初始化echarts实例

      // 绘制图表
      // 屏幕宽度变化时自适应(移动端横置/竖直转换)
      // window.onresize = completion.resize;
      this.completion = echarts.init(document.getElementById("completion") as
        | HTMLDivElement
        | HTMLCanvasElement);
      window.addEventListener("resize", () => {
        this.completion.resize();
      });
      this.completion.setOption({
        tooltip: {
          show: false
        },
        series: [
          {
            // name: "访问来源",
            type: "pie",
            radius: ["60%", "80%"],
            hoverAnimation: false,

            avoidLabelOverlap: false,

            label: {
              normal: {
                show: false,
                position: "center"
              }
            },
            emphasis: {
              label: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              // {value:this.results.prescriptionAccomplishedNum , name:'实际康复训练'+this.results.prescriptionAccomplishedNum+"天"},
              {
                value: this.validdayRate.prescriptionAccomplishedNum,
                name:
                  "实际康复训练" +
                  this.validdayRate.prescriptionAccomplishedNum +
                  "天",
                itemStyle: {
                  color: "#4CAF50"
                }
              },
              {
                value:
                  this.validdayRate.cyclePrescriptionCycle * 7 -
                  this.validdayRate.prescriptionAccomplishedNum,
                name:
                  "计划康复训练" +
                  this.validdayRate.cyclePrescriptionCycle * 7 +
                  "天",
                itemStyle: {
                  color: "#8B8B8B"
                }
              }
            ]
          }
        ]
      });
    }
  }
</script>
<style lang='scss' scoped>
  .completion {
    background-color: #fff;
    width: 100%;
    display: flex;
    /* height: 50%; */
    position: relative;
  }
  #completion {
    // width: 100%;
    height: 14rem;
    background-color: #fff;
    overflow: hidden;
    flex: 3;
    flex-grow: 3;
  }
  ._r {
    margin-top: 4.5rem;
    flex: 4;
    flex-grow: 5;
    text-align: left;
    line-height: 200%;
    > div {
      font-size: 1.2rem;
      > span {
        text-align: right;
        margin-left: 0.75rem;
        color: inherit;
      }
      > i {
        display: inline-block;
        width: 1.25rem;
        height: 1.25rem;
        vertical-align: middle;
      }
    }
  }
  .all {
    background-color: #8b8b8b;
  }
  .done {
    background-color: #4caf50;
  }
  .rate {
    font-size: 1.5rem;
    position: absolute;
    top: 50%;
    left: 21.4%;
    transform: translate(-75%, -50%);
    color: #4caf50;
  }
</style>