<template>
  <cube-scroll
    ref="scroll1"
    class="scroll-list-outer-wrap"
  >
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
          预防记录
        </div>
        <div class="header-r">
          回到当天
        </div>
      </div>
      <!--  
  :agoDayHide='1514937600'//某个日期以前的不允许点击  时间戳10位
  :futureDayHide='1525104000' //某个日期以后的不允许点击  时间戳10位
  -->
      <calendar
        @choseDay="clickDay"
        @changeMonth="changeDate"
        :futureDayHide='nowDate'
        :topText="['周日','周一', '周二', '周三', '周四', '周五', '周六']"
      ></calendar>
      <!-- <div>
      收起日历
    </div> -->
      <div class="scroll-list-wrap">
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
              <div class="alltime">总训练时长：{{getTotalTime(item.Accomplished)}}</div>
              <ul>
                <li
                  class="list"
                  v-for="item1 in item.objectList"
                  :key="item1.id"
                  @click="getdetail(item1.id)"
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
    </div>
  </cube-scroll>
</template>
<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  import Calendar from "../../node_modules/vue-calendar-component/lib/calendar.vue";
  import common from "../common/common";
  @Component({
    components: {
      Calendar
    }
  })
  export default class PreventList extends Vue {
    nowDate: string = Math.ceil(new Date().getTime() / 1000) + "";
    id: string = "";
    currentPageNo: number = 1;
    pageSize: number = 10;
    prescriptionDate: string | null = null;
    AccomplishList: Accomplished.AccomplishedInstance[] = []; // 记录列表
    AccomplishListResult: Accomplished.AccomplishedInfo[] = []; // 记录列表请求结果
    options: any = {};
    mounted() {
      this.id = this.$route.params.id;
      this.getPrenventList();
    }
    /**
     * 回到上页
     */
    back() {
      this.$store.state.isBack = true;
      this.$router.back();
    }
    // 初始化
    initialize() {
      this.options = {
        pullDownRefresh: {
          txt: "刷新成功"
        },
        pullUpLoad: {
          text: "加载成功"
        },
        scrollY: true
      };
    }
    clickDay(data: any) {
      console.log(this.nowDate);
      console.log(data); // 选中某天
    }
    changeDate(data: any) {
      console.log(data); // 左右点击切换月份
    }
    clickToday(data: any) {
      console.log(data); // 跳到了本月
    }
    /**
     * 获取预防记录列表
     */
    getPrenventList() {
      this.$server
        .getPrenventList(
          this.id,
          this.prescriptionDate,
          this.currentPageNo,
          this.pageSize
        )
        .then(res => {
          this.AccomplishListResult = this.AccomplishListResult.concat(
            res.result
          );
          this.AccomplishList = common.changeMsg(this.AccomplishListResult);
          console.log(this.AccomplishList);
        });
    }
    /**
     * 下拉
     */
    onPullingDown() {}
    /**
     * 上拉
     */
    onPullingUp() {}
    /**
     *  秒=>时分秒
     */
    changeSEC(input: number) {
      return common.changeSEC(input);
    }
    /**
     * 转换时间戳
     */
    getDate(input: number, type: string) {
      return common.getDate(input, type);
    }
    /**
     * 计算总时长
     */
    getTotalTime(data: any) {
      let result = 0;
      for (const i in data) {
        result += data[i].totalExerciseTime;
      }
      return this.changeSEC(result);
    }
    /**
     * 跳到预防记录详情
     * @param id:记录id
     */
    getdetail(id: string) {
      this.$router.push({
        path: `/preventinfo/${id}`
      });
    }
  }
</script>
<style lang='scss' scoped>
  .accomplished {
    height: 100%;
    // overflow: hidden;
    display: flex;
    flex-direction: column;
    > .header {
    }
    // overflow-y: scroll;
    > .scroll-list-wrap {
      // height: 100%;
      flex: 1;
      ul {
        padding: 0rem 0.66rem;
        background-color: #f3f3f3;
        > li {
          margin-top: 1rem;
          > .datetime {
            /* background: rgba(126, 211, 33, 0.1); */
            font-size: 1.5rem;
            text-align: center;
            color: #ff5722;
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
  }
</style>