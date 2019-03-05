<template>
  <!-- <cube-scroll
    ref="scroll1"
    class="scroll-list-outer-wrap"
  > -->
  <div class="accomplished">
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
      <div
        v-if="isGetAll"
        class="header-r"
        @click="clickToday"
      >
        回到当天
      </div>
      <div
        v-else
        class="header-r"
        @click="getAll"
      >
        全部
      </div>
    </div>
    <!--  
  :agoDayHide='1514937600'//某个日期以前的不允许点击  时间戳10位
  :futureDayHide='1525104000' //某个日期以后的不允许点击  时间戳10位
  -->
    <calendar
      ref="Calendar"
      @choseDay="clickDay"
      @changeMonth="changeDate"
      :futureDayHide='nowDate'
      :topText="['周日','周一', '周二', '周三', '周四', '周五', '周六']"
      :markDateMore="markDate"
    ></calendar>
    <!-- <div>
      收起日历
    </div> -->
    <div
      class="scroll-list-wrap"
      v-if="ishavedate"
    >
      <cube-scroll
        ref="scroll"
        :data="AssessmentList"
        :options="options"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp"
      >
        <ul>
          <li
            v-for="item in AssessmentList"
            :key="item.id"
          >
            <div class="datetime">{{DateChangeType(item.day)}}</div>
            <ul>
              <li
                class="list"
                v-for="item1 in item.objectList"
                :key="item1.id"
                @click="getDetail(item1.id)"
              >
                <div>
                  <span class="list-l">{{getDate(item1.startTime,'hms')}}-{{getDate(item1.endTime,"hms")}}</span>
                  <span class="list-r"> {{changeSEC(item1.totalExerciseTime)}}</span>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </cube-scroll>
    </div>
    <div
      class="dataTips"
      v-else
    >
      {{tips}}
    </div>
  </div>
  <!-- </cube-scroll> -->
</template>
<script lang='ts'>
  import { Component, Prop, Vue, Watch } from "vue-property-decorator";
  import Calendar from "../../node_modules/vue-calendar-component/src/calendar.vue";
  import common from "../common/common";
  import moment from "moment";
  @Component({
    components: {
      Calendar
    },
    name: "lists"
  })
  export default class AssessmentList extends Vue {
    public nowDate: string = Math.ceil(new Date().getTime() / 1000) + "";
    public id: string = "";
    public currentPageNo: number = 1;
    public pageSize: number = 10;
    public prescriptionDate: string | null = null;
    public AssessmentList: Accomplished.AccomplishedInstance[] = []; // 记录列表
    public AssessmentListResult: Accomplished.AccomplishedInfo[] = []; // 记录列表请求结果
    public options: any = {};
    tips: string = "";
    ishavedate: boolean = false;
    isGetAll: boolean = true;
    markDate: any[] = [];
    maxPage: number = 1;
    public mounted() {
      this.id = this.$route.params.id;
      this.initialize();
      // this.getAssessmentList();
    }
    /**
     * 回到上页
     */
    public back() {
      this.$store.state.isBack = true;
      this.$router.back();
    }
    activated() {
      this.id = this.$route.params.id;
      this.$store.state.isBack = false;
    }
    deactivated() {}
    @Watch("id")
    getdata() {
      this.currentPageNo = 1;
      // 清空数据
      this.AssessmentList = [];
      this.AssessmentListResult = [];
      this.getAssessmentList();
    }
    DateChangeType(input: string) {
      return input.split(".").join("-");
    }
    // 初始化
    public initialize() {
      this.options = {
        // pullDownRefresh: true,
        pullUpLoad: {
          text: "加载成功"
        },
        scrollY: true
      };
    }
    public clickDay(data: any) {
      this.markDate = [];
      this.isGetAll = false;
      this.prescriptionDate = data.split("/").join("-");
      this.currentPageNo = 1;
      // 清空数据
      this.AssessmentList = [];
      this.AssessmentListResult = [];
      this.getAssessmentList();
    }
    public changeDate(data: any) {
      console.log(data); // 左右点击切换月份
    }
    public clickToday(data: any) {
      console.log(data); // 跳到了本月
      let date = moment().format("YYYY/MM/DD");
      console.log(date); // 跳到了本月
      this.markDate = [];
      (this.$refs.Calendar as any).ChoseMonth(date);
    }
    getAll() {
      this.markDate = [
        { date: this.prescriptionDate, className: "clearchooseday" }
      ];
      this.isGetAll = true;
      this.prescriptionDate = null;
      this.currentPageNo = 1;
      // 清空数据
      this.AssessmentList = [];
      this.AssessmentListResult = [];
      this.getAssessmentList();
    }
    /**
     * 监测记录列表
     */
    public getAssessmentList() {
      this.$server
        .getAssessmentList(
          this.id,
          this.prescriptionDate,
          this.currentPageNo,
          this.pageSize
        )
        .then(res => {
          this.AssessmentListResult = this.AssessmentListResult.concat(
            res.result
          );
          this.AssessmentList = common.changeMsg(this.AssessmentListResult);
          console.log(this.AssessmentList);
          this.maxPage = res.totalPage;
          if (this.AssessmentList.length == 0) {
            this.ishavedate = false;
            this.tips = this.isGetAll
              ? "暂无您的亲属的评价记录！"
              : "您的亲属今天没有评价记录！";
            console.log(this.tips);
          } else {
            this.ishavedate = true;
          }
        });
    }
    /**
     * 下拉
     */
    public onPullingDown() {}
    /**
     * 上拉
     */
    public onPullingUp() {
      if (this.maxPage > this.currentPageNo) {
        this.currentPageNo++;
        this.getAssessmentList();
      } else {
        // this.PreventList = this.PreventList;
        (this.$refs.scroll as any).forceUpdate();
      }
    }
    /**
     *  秒=>时分秒
     */
    public changeSEC(input: number) {
      return common.changeSEC(input);
    }
    /**
     * 转换时间戳
     */
    public getDate(input: number, type: string) {
      return common.getDate(input, type);
    }
    /**
     * 计算总时长
     */
    public getTotalTime(data: any) {
      let result = 0;
      for (const i in data) {
        result += data[i].totalExerciseTime;
      }
      return this.changeSEC(result);
    }
    /**
     * 评价详情
     */
    public getDetail(id: number) {
      this.$router.push({
        path: "/assessmentinfo/" + id
      });
    }
  }
</script>
<style lang='scss' scoped>
  .accomplished {
    height: 100%;
    // overflow: hidden;
    // display: flex;
    flex-direction: column;

    // overflow-y: scroll;
    > .scroll-list-wrap {
      // height: 100%;
      height: 20rem;
      // flex: 1;
      ul {
        padding: 0rem 0.66rem;
        background-color: #f3f3f3;
        > li {
          margin-top: 1rem;
          > .datetime {
            /* background: rgba(126, 211, 33, 0.1); */
            font-size: 1.5rem;
            text-align: center;
            color: #f57170;
            padding: 0.15rem;
            letter-spacing: 0;
            font-weight: 600;
            font-weight: bold;
          }
          > .alltime {
            margin: 0.6rem 0;
            /* background: rgba(126, 211, 33, 0.1); */
            font-size: 1.25rem;
            color: #262e4f;
            text-align: right;
            font-weight: 600;
            font-weight: bold;
          }
          > ul {
            padding: 0;
            > .list {
              display: flex;
              background: #ffffff;
              box-shadow: 0 0 10px 0 rgba(203, 203, 203, 0.5);
              border-radius: 5px;
              margin: 1rem 0;
              > div {
                width: 100%;
                display: flex;
                padding: 1rem;
                font-size: 1.5rem;
                text-align: right;
                > .list-l {
                  flex: 3;
                  flex-grow: 3;
                  color: #262e4f;
                  text-align: left;
                }
                > .list-r {
                  flex: 2;
                  flex-grow: 2;
                  color: #262e4f;
                  text-align: right;
                }
              }
            }
          }
        }
      }
    }
    .dataTips {
      margin-top: 5rem;
      text-align: center;
    }
  }
</style>