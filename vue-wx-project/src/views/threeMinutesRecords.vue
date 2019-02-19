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
        3分钟心电记录列表
      </div>
      <div>

      </div>
    </div>
    <main v-if="loadding">
      <ul class="body">
        <li
          v-for="item in threeEcgLists"
          :key="item.id"
        >
          <div class="rangeTime">{{getTime(item.startTime)}}---{{getTime(item.endTime)}}</div>
          <div
            v-if="item.status==2"
            class="check"
            @click="check(item.id)"
          >查看</div>
          <div
            v-else-if="item.status==3"
            @click="gofail"
            class="fail"
          >无效心电</div>
          <div
            v-else
            class="cancel"
          >服务已取消</div>
        </li>
      </ul>
      <div
        class="nodata"
        v-if="threeEcgLists.length==0"
      >此次自主监测无3分钟心电分析记录！</div>
    </main>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import common from '../common/common';
@Component
export default class ThreeMinutesRecords extends Vue {
  public monitoringRecordId: string = ''; // 自主监测id
  public threeEcgLists: any[] = [];
  public loadding: boolean = false;
  public created() {
    this.monitoringRecordId = this.$route.params.id;
    this.getLists();
  }
  /**
   * 回到上页
   */
  public back() {
    this.$store.state.isBack = true;
    this.$router.back();
  }
  /**
   * 获取列表
   */
  public getLists() {
    this.$server.GetThreeMinutesRecords(+this.monitoringRecordId).then((res) => {
      this.threeEcgLists = res.result;
      this.loadding = true;
    });
  }
  /**
   * 换时间格式
   */
  public getTime(input: number) {
    return common.getDate(input, 'hms');
  }
  /**
   * 无效心电
   */
  public gofail() {}
  public check(id: number) {
    this.$router.push({ path: '/threeminutesresult/' + id });
  }
}
</script>
<style lang='scss' scoped>
  main {
    background-color: #f3f3f3;
    height: 100%;
    padding: 1rem;
    flex: 1;
    flex-grow: 1;
    overflow: scroll;
    > ul {
      > li {
        padding: 1rem;
        margin-bottom: 0.66rem;
        position: relative;
        font-size: 1.5rem;
        text-align: left;
        background: #fff;
        border-radius: 0.33rem;
        > .rangeTime {
          font-size: 1.5rem;
        }
        > .check,
        > .cancel,
        > .fail {
          position: absolute;
          top: 50%;
          display: block;
          right: 1rem;
          transform: translateY(-50%);
          border-radius: 0.6rem;
          font-size: 1.5rem;
          padding: 0.3rem 1.5rem;
          min-width: 9rem;
          text-align: center;
        }
        > .check {
          background-image: linear-gradient(153deg, #83d888 0%, #4caf50 95%);
          border-radius: 0.5rem;
          color: #fff;
          font-weight: bold;
        }
        > .cancel {
          color: $basefontcolor2;
        }
        > .fail {
          color: $baseRed;
          background-color: #f7f7f7;
        }
      }
    }

    > .nodata {
      text-align: center;
      margin-top: 15rem;
      background-color: transparent;
    }
  }
</style>