<template>
  <div>
  </div>
</template>
<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  // import echarts from "echarts";
  import OSS from "ali-oss";
  import JSZip from "jszip";
  import "jszip-utils";
  declare var JSZipUtils: any;
  @Component
  export default class EcgPlaybackComponent extends Vue {
    EcgPlaybackChart: any; // 图表实例
    chartItems!: {
      width: number;
      height: number;
      ygrids: number; // y轴网格数
      xgrids: number; // x轴网格数
      gridSize: number; // 网格宽度
      sampleRate: number; // 采样频率
      gridPoints: number; // 1格所占点数
    }; // 图表参数数组
    bucket: string = ""; // 路径上bucket名
    fileName: string[] = []; // 文件名
    startTime: number = 0; // 心电图开始时间
    mouneted() {
      this.bucket = this.$route.query.bucket.toString();
      this.fileName = this.$route.query.filename.toString().split(",");
      this.startTime = +this.$route.query.startTime;
    }
  }
</script>
<style lang='scss' scoped>
</style>