<template>
  <!-- 运动强度分布饼状图 -->
  <div class="mets_rate">
    <!-- <div class="title">运动强度分布</div> -->
    <div id="METsChart"></div>
    <!-- Borg表链接 -->
    <router-link
      to="/borg"
      class="borg"
      tag="a"
    >
      <img
        src="../assets/record_ic.png"
        alt=""
      > 运动强度对应表
    </router-link>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
// var echarts = require("echarts");
import echarts from 'echarts';
@Component
export default class METsChart extends Vue {
  public METsChart: any; // 图表实例
  public metsLtoet3Rate: number = 0;
  public metsLtoet5Rate: number = 0;
  public metsLtoet8Rate: number = 0;
  public metsGt8Rate: number = 0;
  @Prop() private MetsTime!: Accomplished.AccomplishedInfo;
  public mounted() {
    this.countMETsRate();
    this.renderChart();
  }
  /**
   * 计算占比
   */
  public countMETsRate() {
    // 总时间
    const totalExerciseTime = +this.MetsTime.totalExerciseTime;
    if (totalExerciseTime) {
      this.metsLtoet3Rate = Math.round(
        (+this.MetsTime.metsLtoet3 / totalExerciseTime) * 100,
      );
      this.metsLtoet5Rate = Math.round(
        (+this.MetsTime.metsLtoet5 / totalExerciseTime) * 100,
      );
      this.metsLtoet8Rate = Math.round(
        (+this.MetsTime.metsLtoet8 / totalExerciseTime) * 100,
      );
      this.metsGt8Rate = Math.round(
        (+this.MetsTime.metsGt8 / totalExerciseTime) * 100,
      );
      console.log();
      switch (
        Math.max(
          this.metsLtoet3Rate,
          this.metsLtoet5Rate,
          this.metsLtoet8Rate,
          this.metsGt8Rate,
        )
      ) {
        case this.metsGt8Rate:
          this.metsGt8Rate =
            100 -
            this.metsLtoet5Rate -
            this.metsLtoet8Rate -
            this.metsLtoet3Rate;
          break;
        case this.metsLtoet8Rate:
          this.metsLtoet8Rate =
            100 - this.metsLtoet5Rate - this.metsLtoet3Rate - this.metsGt8Rate;
          break;
        case this.metsLtoet5Rate:
          this.metsLtoet5Rate =
            100 - this.metsLtoet3Rate - this.metsLtoet8Rate - this.metsGt8Rate;
          break;

        case this.metsLtoet3Rate:
          this.metsLtoet3Rate =
            100 - this.metsLtoet5Rate - this.metsLtoet8Rate - this.metsGt8Rate;
          break;
      }
    }
  }
  /**
   * 配置图表
   */
  public renderChart() {
    this.METsChart = echarts.init(document.getElementById('METsChart') as
      | HTMLDivElement
      | HTMLCanvasElement);
    this.METsChart.setOption({
      title: {
        text: '运动强度分布',
        x: 'center',
        textStyle: {
          color: '#262E4F',
          fontSize: 15,
        },
      },
      legend: {
        orient: 'vertical',
        left: '50%',
        top: 'center',
        selectedMode: false,
        itemWidth: 12,
        itemHeight: 12,
        data: [
          {
            name: '运动强度≤3' + '  ' + (this.metsLtoet3Rate || 0) + '%',
            icon: 'rect',
            // 设置文本为颜色
            textStyle: {
              color: '#00B1FE',
              fontSize: 14,
            },
          },
          {
            name: '3<运动强度≤5' + '  ' + (this.metsLtoet5Rate || 0) + '%',
            icon: 'rect',
            // 设置文本为颜色
            textStyle: {
              color: '#F86161',
              fontSize: 14,
            },
          },
          {
            name: '5<运动强度≤8' + '  ' + (this.metsLtoet8Rate || 0) + '%',
            icon: 'rect',
            // 设置文本为颜色
            textStyle: {
              color: '#FCC015',
              fontSize: 14,
            },
          },
          {
            name: '运动强度>8' + '  ' + (this.metsGt8Rate || 0) + '%',
            icon: 'rect',
            // 设置文本为颜色
            textStyle: {
              color: '#0ABA08',
              fontSize: 14,
            },
          },
        ],
      },
      series: [
        {
          type: 'pie',
          radius: '75%',
          hoverAnimation: false,
          center: ['25%', '55%'],
          data: [
            {
              value: this.metsLtoet3Rate,
              name: '运动强度≤3' + '  ' + (this.metsLtoet3Rate || 0) + '%',
              itemStyle: { color: '#00B1FE' },
            },
            {
              value: this.metsLtoet5Rate,
              name: '3<运动强度≤5' + '  ' + (this.metsLtoet5Rate || 0) + '%',
              itemStyle: { color: '#F86161' },
            },
            {
              value: this.metsLtoet8Rate,
              name: '5<运动强度≤8' + '  ' + (this.metsLtoet8Rate || 0) + '%',
              itemStyle: { color: '#FCC015' },
            },
            {
              value: this.metsGt8Rate,
              name: '运动强度>8' + '  ' + (this.metsGt8Rate || 0) + '%',
              itemStyle: { color: '#0ABA08' },
            },
          ],
          label: false,
          stillShowZeroSum: true, // 是否在数据和为0（一般情况下所有数据为0） 的时候不显示扇区。
        },
      ],
    });
  }
}
</script>
<style lang='scss' scoped>
  .mets_rate {
    margin-top: 0.5rem;
    padding: 1rem 0 2rem;
    background: #ffffff;
    box-shadow: 1px 1px 5px 0 rgba(203, 203, 203, 0.5);
    border-radius: 0.25rem;
    position: relative;
    #METsChart {
      width: 100%;
      height: 16rem;
      overflow: hidden;
    }
    > .borg {
      position: absolute;
      bottom: 1rem;
      left: 1rem;
      font-size: 1rem;
      text-decoration: underline;
      color: #262e4f;
      > img {
        width: 1.15rem;
        vertical-align: middle;
        margin-right: 0.41rem;
      }
    }
  }
</style>