<template>

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
        康复记录
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
        :data="AccomplishList"
        :options="options"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp"
      >
        <ul>
          <li
            v-for="item in AccomplishList"
            :key="item.id"
          >
            <div class="datetime">{{getDate(item.date,'d')}}</div>
            <div class="alltime">总训练时长：{{getTotalTime(item.totaltime)}}</div>
            <ul>
              <li
                class="list"
                v-for="item1 in item.Accomplished"
                :key="item1.id"
                @click="getdetail(item1.id)"
              >
                <div>
                  <span class="list-l">{{getDate(item1.trainStartTime,'hms')}}-{{getDate(item1.trainEndTime,"hms")}}</span>
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
</template>
<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  import Calendar from "../../node_modules/vue-calendar-component/lib/calendar.vue";
  import common from "../common/common";
  import moment from "moment";
  @Component({
    components: {
      Calendar
    }
  })
  export default class Accomplish extends Vue {
    public nowDate: string = Math.ceil(new Date().getTime() / 1000) + "";
    public id: string = ""; // 患者id
    public currentPageNo: number = 1;
    public pageSize: number = 10;
    public prescriptionDate: string | null = null;
    public AccomplishList: Accomplished.AccomplishedInstance[] = []; // 记录列表
    public AccomplishListResult: Accomplished.AccomplishedInfo[] = []; // 记录列表请求结果
    public options: any = {};
    // public Alloptions: any = {};
    tips: string = "";
    ishavedate: boolean = false;
    isGetAll: boolean = true;
    maxPage: number = 1;
    markDate: any[] = [];
    public mounted() {
      // this.Alloptions = {
      //   scrollX: false,
      //   scrollY: false
      // };
      this.id = this.$route.params.id;
      this.initialize();
      this.getAllAccomplish();
    }
    /**
     * 回到上页
     */
    public back() {
      this.$store.state.isBack = true;
      this.$router.back();
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
    public clickDay(data: string) {
      // console.log(this.nowDate);
      // console.log(data); // 选中某天
      this.markDate = [];
      this.isGetAll = false;
      this.prescriptionDate = data.split("/").join("-");
      this.currentPageNo = 1;
      // 清空数据
      this.AccomplishList = [];
      this.AccomplishListResult = [];
      this.getAllAccomplish();
    }
    public changeDate(data: any) {
      console.log(data); // 左右点击切换月份
    }
    public clickToday(data: any) {
      let date = moment().format("YYYY/MM/DD");
      console.log(date); // 跳到了本月
      this.markDate = [];
      (this.$refs.Calendar as Calendar).ChoseMonth(date);
    }
    /**
     * 获取康复记录列表
     */
    public getAllAccomplish() {
      this.$server
        .getAccomplishedList(
          this.id,
          this.prescriptionDate,
          this.currentPageNo,
          this.pageSize
        )
        .then((res: any) => {
          this.AccomplishListResult = this.AccomplishListResult.concat(
            res.result
          );
          this.AccomplishList = this.changeMsg(this.AccomplishListResult);
          this.maxPage = res.totalPage;
          if (this.AccomplishList.length == 0) {
            this.ishavedate = false;
            this.tips = this.isGetAll
              ? "暂无您的亲属的康复记录！"
              : "您的亲属今天没有康复记录！";
            console.log(this.tips);
          } else {
            this.ishavedate = true;
          }
        });
    }

    getAll() {
      this.markDate = [
        { date: this.prescriptionDate, className: "clearchooseday" }
      ];
      this.isGetAll = true;
      this.prescriptionDate = null;
      this.currentPageNo = 1;
      // 清空数据
      this.AccomplishList = [];
      this.AccomplishListResult = [];
      this.getAllAccomplish();
    }
    /**
     * 转化获得的数据
     */
    public changeMsg(msg: Accomplished.AccomplishedInfo[]) {
      const arr: Accomplished.AccomplishedInstance[] = []; // 定义个空数组
      let arrindex: number = 0; // 空数组的索引
      if (msg.length !== 0) {
        // 赋值第一条数据
        arr[arrindex] = {
          date: msg[0].prescriptionDate,
          Accomplished: []
        };
        // 循环遍历msg
        for (let i = 0; i < msg.length; i++) {
          console.log(msg.length);
          if (msg[i].prescriptionDate === arr[arrindex].date) {
            // 训练日期相同
            arr[arrindex].Accomplished.push(msg[i]);
          } else {
            // 若训练日期不同
            arrindex++;
            // 赋值下一组数据

            arr[arrindex] = {
              date: msg[i].prescriptionDate,
              Accomplished: []
            };
            arr[arrindex].Accomplished.push(msg[i]);
          }
        }
      }
      console.log(arr);
      return arr;
    }
    /**
     * 下拉
     */
    public onPullingDown() {
      // this.currentPageNo++;
      // this.getAllAccomplish();
    }
    /**
     * 上拉
     */
    public onPullingUp() {
      if (this.maxPage > this.currentPageNo) {
        this.currentPageNo++;
        this.getAllAccomplish();
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
    public getTotalTime(data: number) {
      return this.changeSEC(data);
    }
    /**
     * 跳到康复详情
     * @param id:记录id
     */
    public getdetail(id: string) {
      this.$router.push({
        path: `/${this.id}/accomplishinfo/${id}`
      });
    }
  }
</script>
<style lang='scss' scoped>
  .accomplished {
    height: 100%;
    // display: flex;
    // flex-direction: column;
    > .scroll-list-wrap {
      height: 20rem;
      overflow: hidden;
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
            color: #4caf4f;
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