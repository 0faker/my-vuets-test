<template>
  <div class="ecgChart">
    <div :id="ecgChartId">

    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
// import echarts from "echarts";
import '../../public/canvasjs.min.js';
declare var CanvasJS: any;
@Component
export default class ecgChart extends Vue {
  public gridPoints: number = 0;
  public width: any;
  public height: any;
  public chart: any;
  public xgrids: any;
  public dataLength: any;
  @Prop() private ecgPointData: any;
  @Prop() private unusualPoint: any;
  @Prop() private ecgChartId: any;
  @Watch('ecgPointData')
  public onEcgPointData(val: string, oldVal: string) {
    this.ecgPointData = val;
    this.CreateChart();
  }
  public mounted() {
    console.log(CanvasJS);
    // this.CreateChart();
  }

  /**
   * 创建图表实例
   */
  public CreateChart() {
    this.chart = new CanvasJS.Chart(this.ecgChartId.toString(), {
      // exportEnabled: false,//禁用导出
      animationEnabled: false,
      // zoomEnabled: true,//缩放和平移
      title: {},
      toolTip: {
        enabled: false,
        animationEnabled: false,
      },
      data: [{}],
    });
    // 初始化宽高
    this.width = this.chart.get('width');
    this.height = this.chart.get('height');
    this.renderChart();
  }

  public renderChart() {
    // 纵向网格数
    const ygrids = 8;
    // 网格宽度
    const gridSize = this.height / ygrids;
    // 横向向网格数
    this.xgrids = this.width / gridSize;
    // 采样频率(1s点数)
    const sampleRate = 200;
    // (1格所占ms值/一点所占ms值)=1格所占点数
    this.gridPoints = 200 / (1000 / sampleRate);
    // 设置Y轴网格
    this.chart.set('axisY', {
      valueFormatString: ' ',
      lineThickness: 0.5,
      tickLength: 0,
      minimum: 0,
      gridThickness: 1,
      maximum: 4,
      interval: 0.1,
      lineColor: 'transparent',
      gridColor: '#ffcaba',
      stripLines: [
        {
          value: 0,
          color: '#ff5722',
        },
        {
          value: 0.5,
          color: '#ff5722',
        },
        {
          value: 1,
          color: '#ff5722',
        },
        {
          value: 1.5,
          color: '#ff5722',
        },
        {
          value: 2,
          color: '#ff5722',
        },
        {
          value: 2.5,
          color: '#ff5722',
        },
        {
          value: 3,
          color: '#ff5722',
        },
        {
          value: 3.5,
          color: '#ff5722',
        },
        {
          value: 4,
          color: '#ff5722',
        },
      ],
    });
    this.chart.set('axisX', {
      lineThickness: 0.5,
      tickLength: 0,
      valueFormatString: ' ',
      interval: this.gridPoints / 5,
      gridColor: '#ffcaba',
      lineColor: 'transparent',
      gridThickness: 1,
      labelFontSize: 1,
    });
    // 页面可视点数
    this.dataLength = Math.floor(
      sampleRate * this.xgrids * (this.gridPoints / sampleRate),
    );
    // 滑动轴最大值
    // 仅需调用一次绘图
    this.chart.render();
    this.canvasdraw();
  }
  /**
   * 添加数据
   */
  public canvasdraw() {
    // //清除定时器(防止定时叠加)
    // clearInterval(this.timeInterval);
    const dps = this.setDate();
    console.log(dps);
    const stripLines = [];
    for (let i = dps[0].x; i <= dps[dps.length - 1].x; i++) {
      if (i % 40 == 0) {
        stripLines.push({
          value: i,
          color: '#ff5722',
        });
      }
    }
    this.chart.options.axisX.stripLines = stripLines;
    // 设置数据
    this.chart.set('data', [
      {
        type: 'spline',
        // markerSize: 0,
        color: '#56A8FA',
        dataPoints: dps, // 数据
        markerType: 'none', // 点的样式
      },
      {
        type: 'scatter',
        // markerSize: 0,
        color: 'black',
        dataPoints: [
          {
            x: this.unusualPoint.Offset,
            y: 3.5,
            markerType: 'square',
            markerColor: '#ff5722',
          },
        ], // 数据
        markerType: 'none', // 点的样式
      },
    ]);
  }
  public setDate() {
    let dps = [];
    const pointNum = Math.floor(this.xgrids * this.gridPoints);
    let minimum = 0;
    let maximum = this.ecgPointData.length;

    if (this.unusualPoint.Offset - pointNum / 2 > 0) {
      minimum = this.unusualPoint.Offset - pointNum / 2;
    } else {
      maximum = pointNum;
    }
    if (this.unusualPoint.Offset + pointNum / 2 < this.ecgPointData.length) {
      maximum = this.unusualPoint.Offset + pointNum / 2;
    }
    dps = this.ecgPointData.slice(minimum, minimum + this.dataLength);
    return dps;
  }
}
</script>
<style lang='scss' scoped>
  .ecgChart {
    width: 100%;
    height: 100%;
    > div {
      height: 100%;
      width: 100%;
    }
  }
</style>