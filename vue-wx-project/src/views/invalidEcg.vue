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
        无效心电
      </div>
    </div>
    <main>
      <!-- <h2>本次服务不消耗心电分析次数，请您放心使用</h2> -->
      <div class="explain">
        无效心电信号过多，无法分析，请您佩戴好设备，避免剧烈运动，重新记录心电，请求分析。
      </div>
      <div class="example">
        <div class="example_h">无效心电说明：</div>
        <div class="chart">
          <img
            src="../assets/pic_no_signal.png"
            alt="未检测到心电信号"
            srcset=""
          >
        </div>
        <div class="chart">
          <img
            src="../assets/pic_distug_signal.png"
            alt=""
          >
          <div>干扰信号</div>
        </div>
      </div>

    </main>
  </div>

</template>


<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class InvalidEcg extends Vue {}
</script>

<style lang="scss" scoped>
  main {
    background-color: #f7f7f7;
    height: 100%;

    > h2 {
      padding: 0.5rem 1rem 0.75rem;
      background-color: rgba($color: #f57170, $alpha: 0.9);
      color: #fff;
      font-size: 0.89rem;
      margin: 0;
      // padding: 0;
    }

    > .explain {
      text-align: left;
      text-indent: 1rem;
      line-height: 2.15rem;
      font-size: 1.25rem;
      color: $warnRed;
      padding: 1rem;
      font-weight: bold;
    }

    > .example {
      margin: 1rem;
      background-color: #fff;
      padding: 1rem;
      border-radius: 0.3rem;

      > .example_h {
        text-align: left;
        font-size: 1rem;
        color: #262e4f;
        font-weight: bolder;
      }

      > .chart {
        // padding: .66rem;
        margin: 0.5rem 0;
        position: relative;

        img {
          width: 100%;
        }

        > div {
          position: absolute;
          top: 0;
          left: 0;
          background-color: $warnRed;
          width: 47%;
          padding: 0.5rem;
          text-align: center;
          color: #fff;
          border-radius: 0.13rem;
          font-size: 1rem;
        }
      }
    }
  }
</style>
