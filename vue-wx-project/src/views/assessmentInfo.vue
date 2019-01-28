<template>
  <div
    class="assessment_info"
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
        评价记录
      </div>
      <div class="header-r">
      </div>
    </div>
    <main @click="cancel">
      <div class="main_h ">
        <div
          class=""
          @click.stop="goRoute('plan')"
        >
          <img
            src="../assets/ic_plan_history.png"
            alt=""
          >
          <div class="red">预防运动方案</div>
        </div>
        <div
          class=""
          @click.stop="goRoute('ecg')"
          style="margin-left:.815rem"
        >
          <img
            src="../assets/ic_back_hr_history.png"
            alt=""
          >
          <div class="ecg_back blue">心电回放</div>
        </div>
      </div>
      <div class="body">
        <div class="patientInfo">
          <div>
            <span class="name">姓名: <i>{{assessment.patient.name}}</i></span>
            <span class="sex">
              <!-- <img id="sexImg" v-if="assessment.patient.sex== 0" src="../assets/ic_male@2x.png"> -->
              <!-- <img id="sexImg" v-if="assessment.patient.sex==1" src="../assets/ic_female.png"> -->
            </span>
            <span class="age">{{setAge(assessment.age)}}</span>
          </div>
          <div>
            <span
              class="height"
              style="margin-right:0.5rem"
            >身高：<i>{{setHeight(assessment.height)}}</i> </span>
            <span class="weight">体重：<i>{{setWeight(assessment.weight)}}</i> </span>
          </div>

          <div class="BMI">BMI：<i>{{countBmiDes(assessment.bmi)||"--"}}</i> </div>
          <div class="time">时间：<i>{{countTime(assessment.startTime)}} &nbsp;</i>
            {{getTimetDduration(assessment.startTime,assessment.endTime)}}</div>
        </div>
        <div class="data">

          <div class="bpm">
            <h3 class="record_h3">心率（bpm）</h3>
            <ul class="max_min_avg ">
              <li class="items">
                <div class="max">{{assessment.maxHr}}</div>
                <div>最大</div>

              </li>
              <li class="items">
                <div class="min">{{assessment.minHr}}</div>
                <div>最小</div>

              </li>
              <li class="items">
                <div class="avg">{{assessment.avgHr}}</div>
                <div>平均</div>

              </li>
            </ul>

            <div class="hrs">
              <div class="stalic"><span>静止期</span><i>{{assessment.staticPhase}}</i></div>
              <ul class="hr_value">
                <li
                  v-for="item of hrInterval"
                  :key="item.id"
                  class=""
                >
                  <div>
                    <div class="num">{{item.value}}</div>
                    <div class="type">{{item.time}}</div>
                  </div>
                </li>
              </ul>
              <div class="recover"><span>恢复期</span><i>{{assessment.recoveryPhase}}</i></div>
            </div>
          </div>
          <div class="staticBpm">
            <span>静止心率</span>
            <i>{{assessment.staticHr}}</i>
          </div>
          <div class="Mets">
            <h3 class="record_h3 Mets_t">
              代谢当量（METs）</h3>
            <div class="Mets_b">
              <div>{{assessment.maxMets}}</div>
              <span>最大</span>
            </div>
          </div>
          <div class="distance">
            <h3 class="record_h3 distance_h">总距离（m）
              <img
                src="../assets/record_ic.png"
                alt=""
                @click.stop="showBorgDistance($event)"
              >
              <div
                class="distance_borg"
                v-if="isShowDistance"
              >
                <ul>
                  <li class="top">
                    <div class="item"></div>
                    <div class="item_l">距离</div>
                    <div class="item_r">分级</div>
                  </li>
                  <li class="">
                    <div
                      class="item"
                      style="background-color:#D20505"
                    ></div>
                    <div class="item_l">300m以下</div>
                    <div class="item_r">Ⅰ级</div>
                  </li>
                  <li class="">
                    <div
                      class="item"
                      style="background-color:#f87931"
                    ></div>
                    <div class="item_l">300-374.9m</div>
                    <div class="item_r">Ⅱ级</div>
                  </li>
                  <li class="">
                    <div
                      class="item"
                      style="background-color:#f5a623"
                    ></div>
                    <div class="item_l">375-450m</div>
                    <div class="item_r">Ⅲ级</div>
                  </li>
                  <li class="">
                    <div
                      class="item"
                      style="background-color:#f8e71c"
                    ></div>
                    <div class="item_l">450m以上</div>
                    <div class="item_r">Ⅳ级</div>
                  </li>
                </ul>
                <!-- <div class="borgDialogTriangle"></div> -->
              </div>
            </h3>
            <div style="font-size:1.5rem"><span :style="{backgroundColor:distanceLevelcolor}"></span><i style="font-size:1.5rem">{{assessment.totalDistance}}</i>
              {{distanceLevel(assessment.totalDistance).type}}
            </div>
          </div>
          <div class="steps">
            <h3 class="record_h3">总步数（步）</h3>
            <div style="font-size:1.5rem">{{assessment.totalStepNumber}}</div>
          </div>
          <div class="borg">
            <h3 class="record_h3">Borg评分
              <img
                src="../assets/record_ic.png"
                alt=""
                @click.stop="showBorgInfoDialog($event)"
              >

              <div
                class="borgDialog"
                v-if="isShowBorgDialog"
              >
                <ul class="borgDialogContent">
                  <li class="top">
                    <div class="item_l">
                      感知
                    </div>
                    <div class="item_r">
                      评分
                    </div>
                  </li>
                  <li
                    class="borgDialogList"
                    v-for="borgInfo in borgContentArray"
                    :key="borgInfo.id"
                  >
                    <div class="item_l">{{borgInfo.description}}</div>
                    <div class="item_r">
                      {{borgInfo.range}}
                    </div>
                  </li>
                  <!-- <div class="borgDialogTriangle"></div> -->
                </ul>
              </div>
            </h3>
            <div>
              <div class="before ">
                <span class="">
                  试验前：<b>{{assessment.borg/10}}</b>
                </span>
                <span
                  class="feel"
                  style="color:#262e4f;font-weight:bold"
                >
                  {{borgRepresent(assessment.borg)}}
                </span>
              </div>

              <div class="after ">
                <span class="">
                  试验后：<b>{{assessment.preBorg/10}}</b>
                </span>
                <span
                  class="feel"
                  style="color:#262e4f;font-weight:bold"
                >
                  {{borgRepresent(assessment.preBorg)}}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  import moment from "moment";
  import ls from "local-storage";
  import common from "../common/common";
  @Component
  export default class AssessmentInfo extends Vue {
    id: string = "";
    assessment!: Assessment.AssessmentInfo;
    distanceLevelcolor: string = "";
    hrInterval: any[] = [];
    borg: any[] = [];
    borgContentArray: any[] = []; //borg表弹窗数据
    //-----ui-----
    isShowDistance: boolean = false;
    isShowBorgDialog: boolean = false;
    loadding: boolean = false;
    created() {
      this.getBorg();
    }
    mounted() {
      this.id = this.$route.params.id;
      this.getAssessmentInfo();
    }
    /**
     * 回到上页
     */
    back() {
      this.$store.state.isBack = true;
      this.$router.back();
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
    getAssessmentInfo() {
      this.$server.getAssessmentInfo(this.id).then(res => {
        this.assessment = res.result;
        this.hrInterval = JSON.parse(this.assessment.hrInterval);
        this.loadding = true;
      });
    }
    /**
     * 关闭弹层
     */
    cancel() {
      this.isShowDistance = false;
      this.isShowBorgDialog = false;
    }
    /**
     * 年龄
     */
    setAge(age: number) {
      return age ? age + "岁" : "--";
    }
    /**
     * 身高
     */
    setHeight(height: number) {
      return height ? height + "cm" : "--";
    }
    /**
     * 体重
     */
    setWeight(weight: number) {
      return weight ? weight + "kg" : "--";
    }
    /**
     * bmi+对应体重状态
     */
    countBmiDes(bmi: number) {
      return bmi + common.BMIExplain(bmi);
    }
    /**
     * 年月日时间
     */
    countTime(startTime: number) {
      return moment(startTime).format("YYYY.MM.DD");
    }
    /**
     * 时分秒
     */
    getTimetDduration(startTime: number, endTime: number) {
      return (
        moment(startTime).format("HH.mm.ss") +
        "-" +
        moment(endTime).format("HH.mm.ss")
      );
    }
    /**
     * 步行等级和颜色
     */
    distanceLevel(input: number) {
      let result = {
        type: "",
        color: ""
      };
      if (input < 300) {
        result["type"] = "I级";
        result["color"] = "#d20505";
      } else if (input >= 300 && input < 375) {
        result["type"] = "II级";
        result["color"] = "#f87931";
      } else if (input >= 375 && input < 450) {
        result["type"] = "III级";
        result["color"] = "#f5a623";
      } else {
        result["type"] = "IV级";
        result["color"] = "#f8e71c";
      }
      this.distanceLevelcolor = result.color;
      return result;
    }
    /**
     * 距离borg弹窗
     */
    showBorgDistance() {
      this.isShowDistance = this.isShowDistance ? false : true;
      this.isShowBorgDialog = false;
    }
    /**
     * 疲劳感borg弹窗
     */
    showBorgInfoDialog() {
      this.borgContentArray = JSON.parse(
        this.borg.find(x => x.id === this.assessment.borgCategory.id).borgContent
      );
      this.isShowDistance = false;
      this.isShowBorgDialog = this.isShowBorgDialog ? false : true;
    }
    /**
     * borg值=>文字
     */
    borgRepresent(input: number) {
      let result: string = "";
      //本次所用的borg表
      if (input) {
        let currentBorg = JSON.parse(
          this.borg.find((x: any) => x.id === this.assessment.borgCategory.id)
            .borgContent
        );
        result = currentBorg.find((x: any) => x.value === input).description;
      } else {
        result = "未选择";
      }

      return result;
    }
    /**
     * 跳转
     */
    goRoute(input: string) {
      switch (input) {
        case "plan":
          ls.set("assessmentpreventplan", this.assessment.preventiveScheme);
          this.$router.push({
            path: "/preventplan/" + this.id
          });
          break;
      }
    }
  }
</script>
<style lang='scss' scoped>
  .assessment_info {
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
    main {
      width: 100%;
      background-color: #f7f7f7;
      padding: 1rem;
      box-sizing: border-box;
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
            color: #ff5252;
            font-size: 0.815rem;
          }
        }
      }

      > .body {
        > .patientInfo {
          text-align: left;
          padding: 0rem;
          margin: 0.5rem 0;

          > div {
            padding: 0.4rem;
            color: #262e4f;
            font-size: 1.33rem;
            margin: 0.79rem 0;
            > span {
              display: inline-block;
              padding-right: 0.4rem;
              font-size: 1.25rem;

              > i {
                font-weight: bold;
                font-style: normal;
                font-size: 1.33rem;
              }
            }

            > .sex {
              width: 1.5rem;
              height: 1.5rem;

              // height: 100%;
              > img {
                height: 100%;
              }
            }

            > .age {
              font-size: 1.22rem;
              color: #00b1fe;
            }

            > i {
              font-weight: bold;
              font-style: normal;
            }
          }
        }

        > .data {
          text-align: left;

          > .bpm {
            > .hrs {
              background-color: #fff;
              padding: 1rem;
              border-radius: 0.5rem;
              box-shadow: 1px 1px 10px 0 rgba(203, 203, 203, 0.5);
              margin: 0.35rem 0;
              //心率点测
              > .hr_value {
                display: flex;
                > li {
                  flex: 1;
                  > div {
                    text-align: center;
                    > .num {
                      font-weight: bold;
                      font-size: 1.5rem;
                      color: #1c1821;
                      margin: 1.125rem 0;
                    }

                    > .type {
                      margin: 1.125rem 0;
                      color: #262e4f;
                      font-size: 1.2rem;
                    }
                  }
                }
              }
              //静止期
              > .stalic,
              > .recover {
                > span {
                  display: inline-block;
                  background-color: #ff5722;
                  color: #fff;
                  border-radius: 0.3rem;
                  padding: 0.26rem 0.5rem;
                  font-size: 1.25rem;
                }

                > i {
                  display: inline-block;
                  font-size: 1.5rem;
                  font-weight: bold;
                  font-style: normal;
                  padding-left: 1rem;
                }
              }
              //恢复期
              > .recover {
                > span {
                  background-color: #00b1fe;
                }
              }
            }
          }
          //静止心律
          > .staticBpm {
            margin: 0.33rem auto;
            padding: 1rem;
            background-color: #fff;
            color: #fff;
            box-shadow: 1px 1px 10px 0 rgba(203, 203, 203, 0.5);
            border-radius: 5px;

            > span {
              display: inline-block;
              font-size: 1.3rem;
              padding: 0.26rem 0.5rem;
              background-color: #4caf50;
              border-radius: 0.3rem;
            }

            > i {
              display: inline-block;
              font-size: 1.5rem;
              font-weight: bold;
              font-style: normal;
              color: #262e4f;
              padding-left: 1rem;
            }
          }
          //代谢当量
          > .Mets {
            > .Mets_b {
              display: inline-block;
              text-align: center;
              padding: 1.2rem 0;
              // font-size: 2.5rem;
              min-width: 7rem;
              background-color: #fff;
              border-radius: 0.4rem;
              width: 33%;
              box-shadow: 1px 1px 10px 0 rgba(203, 203, 203, 0.5);
              border-radius: 5px;

              > div {
                color: #ff5722;
                font-size: 2.5rem;
                font-weight: bold;
                margin-bottom: 0.5rem;
              }

              > span {
                color: #262e4f;
                font-size: 1.25rem;
              }
            }
          }
          //距离/步数/borg评价
          > .distance,
          > .steps,
          > .borg {
            > h3 {
              //距离borg表/疲劳感borg表
              > .distance_borg,
              > .borgDialog {
                position: absolute;
                bottom: 100%;
                right: 0%;
                width: 14rem;
                background: #fcfcfc;
                box-shadow: 0 0 0.5rem 0 rgba(28, 24, 33, 0.1);
                border-radius: 0.25rem;
                > ul {
                  width: 100%;
                  > li {
                    width: 100%;
                    display: flex;
                    margin: 1rem 0;
                    > .item {
                      width: 1rem;
                      height: 1rem;
                      margin: 0 0.5rem;
                    }
                    > .item_l {
                      flex: 2;
                      text-align: left;
                      font-size: 1rem;
                      color: #1c1821;
                    }
                    > .item_r {
                      flex: 1;
                      font-size: 1rem;
                      text-align: left;
                      font-weight: bold;
                      color: #1c1821;
                    }
                  }
                  > .top {
                    > .item_l {
                      font-size: 1.25rem;
                      font-weight: bold;
                    }
                    > .item_r {
                      font-size: 1.25rem;
                      font-weight: bold;
                    }
                  }
                }
              }
              //borg评价表
              > .borgDialog {
                width: 12rem;
                padding: 0 1.335rem;
              }
            }

            > div {
              display: block;
              padding: 0.8rem;
              font-weight: bold;
              font-size: 1.5rem;
              background-color: #fff;
              color: #1c1821;
              box-shadow: 1px 1px 10px 0 rgba(203, 203, 203, 0.5);
              border-radius: 5px;
              > span {
                display: inline-block;
                padding: 0.6rem;
                background-color: #aaa;
                vertical-align: middle;
                margin-right: 0.5rem;
              }
              > i {
                font-weight: bold;
                margin: 0 0.5rem;
                font-style: normal;
              }
              > .before,
              > .after {
                padding: 1rem 0rem;
                font-size: 1.25rem;
                font-weight: normal;

                > span {
                  padding: 0;
                }
                > .feel {
                  margin-left: 2rem;
                }
              }
            }
          }
        }
      }
    }
  }
</style>