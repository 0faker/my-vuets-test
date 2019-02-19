<template>
  <div class="search_city">
    <div class="header">
      <form action="javascript:return true">
        <img
          id="searchdoc"
          class="searchIcon"
          src="../assets/ic_search@2x.png"
          alt=""
        >
        <input
          type="search"
          placeholder="搜索医院/医生"
          v-model="searchCityName"
          autofocus="autofocus"
          @input="inputCity($event)"
          class=""
        >
        <input
          type="search"
          style="display:none;"
        />
        <div
          id="canceldoc"
          @click="clear"
          v-if="showClearButton"
        >
          <img
            src="../assets/close.png"
            alt=""
          >
        </div>
      </form>
      <div
        class="cancel"
        @click="cancel"
      >取消</div>
    </div>
    <div
      class="match_name"
      v-if="showResult"
    >
      <ul
        class="result"
        v-if="matchCity.length!=0"
      >
        <li
          v-for="items in matchCity"
          @click="chooseCity(items.id,items.name)"
          :key="items.id"
        >{{items.name}}</li>
      </ul>
      <div
        class="no_city"
        v-else
      >
        暂无相关城市信息！
      </div>
    </div>

  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import ls from 'local-storage';
import common from '../common/common';
@Component
export default class SearchCity extends Vue {
  public searchCityName: string | null = null;
  public isCancel: boolean = false;
  public matchCity: any[] = [];
  public showClearButton: boolean = false;
  public showResult: boolean = false;
  public cityLists: any[] = [];
  public mounted() {

  }

  /**
   * 取消按钮
   */
  public cancel() {
    this.$emit('cancel');
  }
  /**
   * 清空搜索文字
   */
  public clear() {
    this.searchCityName = null;
    this.showResult = false;
    this.matchCity = [];
    this.showClearButton = this.searchCityName ? true : false;
  }
  /**
   * 输入城市名
   */
  public inputCity(e: any) {
    if (this.searchCityName != '' && this.searchCityName) {
      this.searchCityName = e.target.value.replace(/^\s+|\s+$/g, '');
      this.showClearButton = this.searchCityName ? true : false;
      const cityList = ls.get('cityList');
      this.matchCity = [];
      cityList.forEach((element: any) => {
        // // 所有首字母
        // element.initials = common.getInitials(element.name);
        // // 全拼
        // element.pinyin = common.getPinyin(element.name);

        if (this.searchCityName) {
          if (
            element.initials.indexOf(this.searchCityName.toUpperCase()) == 0 ||
            element.name.indexOf(this.searchCityName) == 0 ||
            element.pinyin.indexOf(this.searchCityName.toUpperCase()) == 0
          ) {
            this.matchCity.push(element);
          }
        }
      });
      this.showResult = true;
      console.log(this.matchCity);
    } else {
      this.matchCity = [];
      this.showResult = false;
    }
  }
  public chooseCity(id: number, name: string) {
    console.log(name);
    this.$emit('choose-city', id, name);
  }
}
</script>
<style lang='scss' scoped>
  .search_city {
    width: 100%;
    height: 100%;
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
    > .match_name {
      > .result {
        > li {
          padding: 0rem 1rem;
          height: 3.66rem;
          line-height: 3.66rem;
          color: $baseRed;
          font-size: 1.33rem;
          font-weight: bolder;
          border-bottom: 1px solid #eeeeee;
        }
      }
      > .no_city {
        padding: 0rem 1rem;
        height: 3.66rem;
        line-height: 3.66rem;
        color: $basefontcolor2;
        font-size: 1.33rem;
        font-weight: bolder;
        border-bottom: 1px solid #eeeeee;
      }
    }
  }
</style>