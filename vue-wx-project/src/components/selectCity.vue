<template>
  <div class="search_city">
    <div class="head">
      <div
        class="cancel"
        @click="cancel"
      ><img
          src="../assets/close.png"
          alt=""
        ></div>
      <div class="search">
        <img
          src="../assets/ic_search@2x.png"
          alt=""
        >
        <div>搜索医院/医生</div>
      </div>

    </div>
    <div class="city_history">
      <h2>全国/定位/最近访问</h2>
      <div v-if="positioning">
        <div class="national">全国</div>
        <div class="positioning_city">南京</div>
        <div class="last_city">南京</div>
      </div>
      <div v-else>
        <div class="national">全国</div>
        <div class="positioning_city">南京</div>
        <div class="last_city">南京</div>
      </div>
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
    <div class="city_list">
      <cube-index-list :data="cityLists">
        <cube-index-list-group
          v-for="(group, index) in cityLists"
          :key="index"
          :group='group'
        >
          <cube-index-list-item
            v-for="(item, index) in group.group"
            :key="index"
            @select="selectItem"
            :item="item"
          >
          </cube-index-list-item>
        </cube-index-list-group>
      </cube-index-list>
    </div>
  </div>
</template>
<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  import pinyin from "pinyin";
  import ls from "local-storage";
  @Component
  export default class SelectCity extends Vue {
    searchCityName: string | null = null;
    isCancel: boolean = false;
    positioning: boolean = false;
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

    getCity(id: number, name: string) {}
    selectItem(e: any) {
      console.log(e);
    }
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
    .head {
      display: flex;
      height: 4.25rem;
      padding: 1rem;
      background-color: #4caf50;
      text-align: center;
      > .search {
        flex: 1;
        height: 100%;
        background-color: #fff;
        border-radius: 0.2rem;
        padding: 0.5rem;
        vertical-align: middle;
        > div {
          height: 100%;
          display: inline-block;
          color: 1.167rem;
          color: $basefontcolor2;
          // vertical-align: top;
        }
        > img {
          height: 90%;
          vertical-align: middle;
          margin: 0 0.67rem;
        }
      }
      > .cancel {
        display: inline-block;
        height: 100%;
        padding: 0 1rem 0 0;
        color: #f7f7f7;
        line-height: 4.25rem;
        font-size: 1.5rem;
        vertical-align: top;
        > img {
          height: 2rem;
          vertical-align: top;
        }
      }
    }
    > .city_history {
      padding: 0rem 3rem 0 1rem;
      > h2 {
        font: 1.17rem/2.67rem "PingFangSC";
        font-weight: bold;
        color: $basefontcolor2;
        height: 2.67rem;
      }
      > div {
        display: flex;
        margin: 0.33rem 0;
        justify-content: space-between;
        > div {
          width: 31%;
          text-align: center;
          background-color: #fff;
          height: 2.67rem;
          line-height: 2.67rem;
          color: $basefontcolor2;
        }
      }
    }
    > .city_list {
      height: 100%;
      padding-bottom: 10.5rem;
    }
  }
</style>