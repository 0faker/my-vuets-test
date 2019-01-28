<template>
  <div
    class="prevent_info"
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
        预防记录
      </div>
      <div class="header-r">
      </div>
    </div>
    <main>
      <div class="main_h ">
        <div
          class="plan"
          @click="route('plan')"
        >
          <img
            src="../assets/ic_plan_history.png"
            alt=""
          >
          <div class="red">预防运动方案
          </div>
        </div>

        <div
          style="margin-left:.815rem"
          class="ecg"
          @click="route('ecg')"
        ><img
            src="../assets/ic_back_hr_history.png"
            alt=""
          >
          <div class="ecg_back blue">心电回放</div>
        </div>
      </div>
      <div class="situation">
        <!-- <div>预防运动记录仅为根据您的预防方案作出的智能判断，不作为任何医疗诊断与参考。</div> -->
        <p>在此次预防运动中，您的亲属一共步行了<i class="step">{{preventive.stepNumber}}</i>步，{{getBorgId(preventive.borgCategory.id)}}<i class="feel">{{borgRepresent(preventive.borg)}}</i>，有效运动时长为
          <i class="effctive">{{getMin(preventive.effectiveTime)}}</i>分钟，有效运动时长占比为<i class="effctive_rate">{{effctiveRate||0}}</i>%。</p>
        <p>本次预防运动<i
            class="qualified"
            :style="{color:isQualified?'#4CAF50':'#ff5722'}"
          >{{isQualified?"达标":'不达标'}}</i>，请您提醒亲属继续加油，根据自身实际情况，合理安排运动强度。</p>
      </div>
      <div class="bpm">
        <h3 class="record_h3">运动心率（bpm）</h3>
        <ul class="max_min_avg">
          <li class="items">
            <div class="max">{{preventive.maxHr}}</div>
            <div>最大</div>

          </li>
          <li class="items">
            <div class="min">{{preventive.minHr}}</div>
            <div>最小</div>

          </li>
          <li class="items">
            <div class="avg">{{preventive.avgHr}}</div>
            <div>平均</div>

          </li>
        </ul>
      </div>
      <div class="mets">
        <h3 class="record_h3">运动强度（METs）</h3>
        <ul class="max_min_avg">
          <li class="items">
            <div class="max">{{preventive.maxMets}}</div>
            <div>最大</div>

          </li>
          <li class="items">
            <div class="min">{{preventive.minMets}}</div>
            <div>最小</div>

          </li>
          <li class="items">
            <div class="avg">{{preventive.avgMets}}</div>
            <div>平均</div>

          </li>
        </ul>
      </div>
      <div class="_fbMets">
        <METsChart :MetsTime='preventive'></METsChart>
      </div>
    </main>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  import ls from "local-storage";
  import METsChart from "@/components/METsChart.vue";
  @Component({
    components: {
      METsChart
    }
  })
  export default class PreventInfo extends Vue {
    id: string = "";
    preventive!: Prevent.PreventInfo;
    effctiveRate!: number;
    standard: boolean = false;
    borg: any;
    isQualified: boolean = true; //是否达标
    //-----ui------
    loadding: boolean = false;
    created() {
      this.getBorg();
    }
    mounted() {
      this.initialize();
      this.getPreventiveInfo();
    }
    back() {
      this.$store.state.isBack = true;
      this.$router.back();
    }
    // 初始化
    initialize() {
      this.id = this.$route.params.id;
    }
    /**
     * 获取预防
     */
    getPreventiveInfo() {
      this.$server.getPreventiveInfo(this.id).then(res => {
        this.preventive = res.result;
        this.effctiveRate =
          // 向下取整保留一位小数
          Math.floor(
            (this.preventive.effectiveTime /
              (this.preventive.preventiveScheme.trainTime * 60)) *
              1000
          ) / 10;

        this.isQualified = this.effctiveRate >= 100 ? true : false;
        this.loadding = true;
      });
    }
    /**
     * 获取borg表id
     */
    getBorgId(input: number) {
      return input === 1 ? "自测疲劳感为" : "自我理解的用力程度为";
    }
    /**
     * 获取borg表内容
     */
    getBorg() {
      let borg = ls.get("borg");
      //localstorage中有borg表
      if (borg) {
        this.borg = borg;
      } else {
        this.$server.getBorg().then(res => {
          this.borg = res.result;
          ls.set("borg", this.borg);
        });
      }
    }
    /**
     * borg值=>文字
     */
    borgRepresent(input: number) {
      let result: string = "";
      //本次所用的borg表
      let currentBorg = JSON.parse(
        this.borg.find((x: any) => x.id === this.preventive.borgCategory.id)
          .borgContent
      );
      result = currentBorg.find((x: any) => x.value === input).description;
      return result;
    }
    /**
     * 秒数=>分钟
     * 向下取整
     */
    getMin(time: number) {
      return Math.floor(time / 60);
    }
    /**
     * 路由跳转
     */
    route(input: string) {
      switch (input) {
        case "plan":
          ls.set("assessmentpreventplan", this.preventive.preventiveScheme);
          this.$router.push({
            path: "/preventplan/" + this.id
          });
          break;
      }
    }
  }
</script>
<style lang='scss' scoped>
  i {
    font-style: normal;
    font-weight: 600;
    font-size: 1.4rem;
    font-family: "微软雅黑";
  }

  .prevent_info {
    position: relative;
    padding-top: $header-height;
    background-color: #f7f7f7;
    > .header {
      position: fixed;
      width: 100%;
      transform: all 0.5s;
      opacity: 1;
      top: 0%;
      left: 0%;
    }
    > main {
      padding: 1rem;
      > .main_h {
        height: 6.665rem;
        // background: #000;
        > div {
          display: inline-block;
          background-color: #fff;
          width: 6.665rem;
          height: 100%;
          padding: 1.25rem 0;
          text-align: center;
          border-radius: 0.5rem;
          > img {
            width: 1.765rem;
          }
          > div {
            margin-top: 0.5rem;
            height: 2rem;
            line-height: 2rem;
            font-size: 1.25rem;
            font-weight: bold;
            white-space: nowrap;
          }
          > .green {
            color: #4caf50;
          }
          > .blue {
            color: #00b1fe;
          }
          > .red {
            color: #ff5722;
            font-size: 0.835rem;
          }
        }
      }
      > .situation {
        margin-top: 1rem;
        > p {
          text-align: left;
          color: #262e4f;
          font-size: 1.335rem;
          margin: 0;
          padding: 0;
          line-height: 2.25rem;
          text-indent: 2rem;
          > i,
          > b {
            font-size: 1.335rem;
            font-style: normal;
            font-weight: bold;
          }
          > .step {
            color: #00b1fe;
          }
          > .feel {
            color: #4caf50;
          }
          > .effctive {
            color: #ff5722;
          }
          > .effctive_rate {
            color: #ff5722;
          }
        }
      }
    }
  }
</style>