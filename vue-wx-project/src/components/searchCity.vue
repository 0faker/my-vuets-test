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
    <div class="match_name">
      <ul class="result">
        <li
          v-for="items in matchCity"
          @click="getCity(items.id,items.name)"
          :key="items.id"
        >{{items.name}}</li>
      </ul>
    </div>

  </div>
</template>
<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  import pinyin from "pinyin";
  import ls from "local-storage";
  @Component
  export default class SearchCity extends Vue {
    searchCityName: string | null = null;
    isCancel: boolean = false;
    matchCity: any[] = [];
    showClearButton: boolean = false;
    cityLists: any[] = [];
    mounted() {
      this.formattingCityLists();
    }
    /**
     * 初始化城市列表
     */
    formattingCityLists() {
      //循环创建a-z数组
      let arr: any[] = [];
      for (let i of "ABCDEFGHIJKLMNOPGRSTUVWXYZ") {
        arr.push({
          name: i,
          group: []
        });
      }
      let cityList = ls.get("cityList");
      cityList.forEach((element: any) => {
        for (let k = 0; k < arr.length; k++) {
          //所有首字母
          element["initials"] = this.getInitials(element.name);
          //全拼
          element["pinyin"] = this.getPinyin(element.name);

          if (this.getInitials(element.name)[0] == arr[k].name) {
            arr[k].group.push(element);
            break;
          }
        }
      });
      let cityResult: any[] = [];
      // 遍历arr
      arr.forEach((e: any) => {
        if (e.group.length != 0) {
          cityResult.push(e);
        }
      });
      this.cityLists = cityResult;
      console.log(this.cityLists);
    }
    /**
     * 取消按钮
     */
    cancel() {
      this.$emit("cancel");
    }
    /**
     * 清空搜索文字
     */
    clear() {
      this.searchCityName = null;
      this.showClearButton = this.searchCityName ? true : false;
    }
    /**
     * 输入城市名
     */
    inputCity(e: any) {
      this.searchCityName = e.target.value.replace(/^\s+|\s+$/g, "");
      this.showClearButton = this.searchCityName ? true : false;
    }
    getCity(id: number, name: string) {}
    selectItem() {}
    // 获取字符串首字母
    getInitials(str: string) {
      //小写转大写
      return pinyin(str, {
        style: pinyin.STYLE_FIRST_LETTER, // 设置拼音风格首字母风格
        heteronym: false
      })
        .join("")
        .toUpperCase();
    }
    // 获取字符串全拼音
    getPinyin(str: string) {
      //小写转大写
      return pinyin(str, {
        style: pinyin.STYLE_NORMAL, // 设置拼音风格普通风格，即不带声调。
        heteronym: false
      })
        .join("")
        .toUpperCase();
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
    > .city_list {
      height: 100%;
      padding-bottom: 4.25rem;
    }
  }
</style>