<template>
  <div class="search_doctor">
    <div class="header">
      <form action="javascript:return true">
        <img
          id="searchdoc"
          class="searchIcon"
          src="../../assets/ic_search@2x.png"
          alt=""
        >
        <input
          type="search"
          placeholder="搜索医院/医生"
          v-model="searchDoctorName"
          autofocus="autofocus"
          @input="oninput($event)"
          class=""
        >
        <input
          type="search"
          style="display:none;"
        />
        <div
          id="canceldoc"
          @click="clear"
          v-if="isCancel"
        >
          <img
            src="../../assets/close.png"
            alt=""
          >
        </div>
      </form>
      <div
        class="cancel"
        @click="back"
      >取消</div>
    </div>
    <!-- 搜索提示栏 -->
    <div
      class="sub"
      @click="searchdoctor"
      v-if="isCancel"
    >
      <img
        class="sub_l"
        src="../../assets/ic_search@2x.png"
        alt=""
      >
      <div class="sub_m">搜索“{{searchDoctorName}}”</div>
      <img
        class="sub_r"
        src="../../assets/ic_searh_next@2x.png"
        alt=""
      >
    </div>
    <!-- 历史搜索 -->
    <div
      v-if="!isCancel&&doctorHistory.length!=0"
      class="history"
    >
      <div>历史搜索<img
          src="../../assets/ic_trash_can@2x.png"
          class="glyphicon"
          @click="clearHistory()"
        ></div>
      <ul>
        <li
          v-for="item in doctorHistory"
          :key="item.id"
          @click="searchHistorydoctor(item)"
        >
          <span>{{item}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  import ls from "local-storage";
  import common from "../../common/common";
  @Component
  export default class SearchDoctor extends Vue {
    searchDoctorName: string | null = null; //搜索的医生姓名
    doctorHistory: string[] = []; //搜索的医生姓名历史
    isCancel: boolean = false;
    showSearchTap: any;
    mounted() {
      this.doctorHistory = ls.get("doctorHistory") || [];
    }
    /**
     * 取消按钮 回退
     */
    back() {}
    /**
     * 清空搜索文字
     */
    clear() {
      this.searchDoctorName = null;
      this.isCancel = false;
    }
    /**
     * 搜索
     */
    searchdoctor() {
      if (this.searchDoctorName) {
        console.log(this.searchDoctorName);
        // 加入历史纪录数组中首位
        this.doctorHistory.unshift(this.searchDoctorName);
        // 去重
        this.doctorHistory = common.deleteRepeat(this.doctorHistory);
        // 保存至localstorage
        ls.set("doctorHistory", this.doctorHistory);
        this.$router.push({
          path: "matchdoctor",
          params: {
            doctor: this.searchDoctorName
          }
        });
      }
    }
    /**
     * 输入
     */
    oninput(e: any) {
      console.log(this.searchDoctorName);
      this.searchDoctorName = e.target.value.replace(/^\s+|\s+$/g, "");
      if (this.searchDoctorName) {
        this.isCancel = true;
      } else {
        this.isCancel = false;
      }
    }
    /**
     * 点击历史医生
     */
    searchHistorydoctor(doctorName: string) {
      this.searchDoctorName = doctorName;
      this.$router.push({
        path: "matchdoctor",
        query: {
          doctor: this.searchDoctorName
        }
      });
    }
    /**
     * 清空搜索历史
     */
    clearHistory() {
      this.doctorHistory = [];
      ls.remove("doctorHistory");
    }
  }
</script>
<style lang='scss' scoped>
  .search_doctor {
    .header {
      display: flex;
      height: 4.25rem;
      background-color: #4caf50;
      > form {
        flex: 1;
        height: 100%;
        padding: 1rem 0 1rem 1rem;
        position: relative;
        // display: inline-block;
        border-radius: 0.2rem;
        box-sizing: border-box;

        > #canceldoc {
          position: absolute;
          width: 1.25rem;
          height: 1.25rem;
          top: 50%;
          right: 1rem;
          transform: translateY(-50%);
          background-color: #979797;
          border-radius: 50%;
          z-index: 10;
          font-size: 0%; // background: url(../../assets/close.png) no-repeat;

          > img {
            position: absolute;
            padding: 1rem;
            top: 50%;
            left: 50%;
            transform: translate(-51.5%, -50%);
            width: 90%;
            vertical-align: top;
          }
        }
        > .searchIcon {
          position: absolute;
          top: 50%;
          left: 2rem;
          width: 1.33rem;
          transform: translateY(-50%);
          // height: 100%;
          z-index: 100;
          background-color: #fff;
        }
        > input {
          // position: absolute;
          // top: 0;
          // left: 0;
          text-align: left;
          width: 100%;
          padding: 0 3rem;
          height: 100%;
          border-radius: 0.4rem;
          background-color: #f7f7f7;
          font-size: 1.25rem;
          color: #262e4f;
          vertical-align: top;

          // transition: width 5s;
        }
      }
      > .cancel {
        display: inline-block;
        height: 100%;
        width: 4rem;
        color: #f7f7f7;
        line-height: 4.25rem;
        font-size: 1.5rem;
      }
    }
    .sub {
      padding: 1.35rem 3rem;
      display: flex;
      height: 4.25rem;
      // line-height: 4.25rem;
      position: relative;
      font-size: 1.15rem;
      color: #262e4f;
      border-bottom: 1px solid #eeeeee;

      > img {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      > .sub_l {
        left: 1rem;
        width: 1.35rem;
        height: 1.35rem;
      }
      > .sub_r {
        width: 2rem;
        height: 2.35rem;
        right: 1rem;
      }
      > .sub_m {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    > .history {
      text-align: left;
      // margin-top: 1rem;
      padding: 0.75rem 1.2rem;
      > div {
        padding: 0.45rem 0;
        font-weight: bold;
        position: relative;
        font-size: 1.15rem;
        color: #262e4f;
        margin-bottom: 0.75rem;
        > img {
          // width: 2rem;
          position: absolute;
          right: 0rem;
          height: 100%;
          text-align: right;
        }
      }
      > ul {
        margin: -0.33rem;
        max-height: 12.6rem;
        font-size: 0; //消除li的垂直间隔
        overflow: hidden;
        > li {
          background-color: #fff;
          display: inline-block;
          padding: 0rem 1rem;
          margin: 0 0.33rem 0.33rem;
          max-width: 16.46rem;
          height: 2.25rem;
          line-height: 2.25rem;
          color: #262e4f;
          font-size: 1.15rem;
          overflow: hidden;
          text-overflow: ellipsis;
          > span {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          // margin: 0.5rem;
        }
      }
    }
  }
</style>