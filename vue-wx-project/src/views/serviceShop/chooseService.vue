<template>
  <div class="choose_service">
    <div class="top">
      <div class="header">
        <div
          class="back"
          @click="back"
        >
          <img
            src="../../assets/back.png"
            alt=""
            srcset=""
          >
        </div>
        <div class="title">
          专家医生服务
        </div>
        <div>

        </div>
      </div>
      <div class="location">
        <div
          class="chooseCity"
          key=""
        >
          <div
            class="currentCity"
            @click="chooseCity"
          >
            {{showCity}}
          </div>
          <div class="img"> <img
              src="../../assets/ic_city_pick.png"
              alt=""
            ></div>

          <div
            class="search"
            @click="search"
          >

            <img
              src="../../assets/ic_search@2x.png"
              class="searchIcon"
            >
            搜索医院/医生</div>

        </div>
      </div>
    </div>

    <div class="service">
      <service-list></service-list>
    </div>
    <div
      class="city_search"
      v-if="showSearchCity"
    >
      <select-city @cancel='cancelCity'></select-city>
    </div>
  </div>
</template>
<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  import ls from "local-storage";
  import ServiceList from "../../components/serviceList.vue";
  import SelectCity from "../../components/selectCity.vue";
  @Component({
    components: {
      ServiceList,
      SelectCity
    }
  })
  // 选择服务商品
  export default class ChooseService extends Vue {
    patientId: string = "";
    showCity: string = "定位中";
    showSearchCity: boolean = false;
    cityLists: {
      id: number;
      name: string;
    }[] = [];
    created() {
      this.patientId = ls.get("payPatient");
      this.getCitys();
    }
    /**
     * 回到上页
     */
    back() {
      this.$store.state.isBack = true;
      this.$router.back();
    }
    /**
     * 获取有医生的城市lists
     */
    getCitys() {
      this.$server
        .GetCityLists()
        .then(data => {
          this.cityLists = data.result;
          ls.set("cityList", this.cityLists);
        })
        .catch();
    }
    /**
     * 选择城市
     */
    chooseCity() {
      this.showSearchCity = true;
      // this.$router.push({ path: "searchdoctor" });
    }
    /**
     * 去搜索
     */
    search() {
      this.$router.push({ path: "searchdoctor" });
    }
    /**
     * 关闭城市搜索
     */
    cancelCity() {
      this.showSearchCity = false;
    }
  }
</script>
<style lang='scss' scoped>
  .choose_service {
    width: 100%;
    max-height: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    > .top {
      // flex-direction: column;
      width: 100%;
      position: absolute;
      z-index: 100;
      > .location {
        height: 4.25rem;
        background-color: #fff;
        font-size: 1.5rem;
        color: $basefontcolor2;
        padding: 1rem;
        > .chooseCity {
          display: flex;
          height: 100%;

          > .currentCity {
            height: 100%;
            overflow: hidden; //超出一行文字自动隐藏
            text-overflow: ellipsis; //文字隐藏后添加省略号
            white-space: nowrap; //强制不换行
            color: $basefontcolor2;
            width: 7.55rem;
          }
          > .img {
            box-sizing: border-box;
            font-size: 0;
            width: 1.335rem;
            line-height: 2rem;
            vertical-align: middle;
            margin-right: 1.5rem;
            > img {
              width: 100%;
              vertical-align: middle;
              // height: 100%;
            }
          }
          > .search {
            flex: 1;
            background-color: #f7f7f7;
            overflow: hidden;
            // vertical-align: bottom;
            text-align: center;
            font-size: 1.25rem;
            // height: 100%;
            line-height: inherit;
            > .searchIcon {
              height: 1.25rem;
            }
          }
        }
      }
    }

    > .service {
      padding-top: 8rem;
      height: 100%;
      overflow: scroll;
      // margin-top: -8rem;
    }
    > .city_search {
      background-color: #f7f7f7;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
    }
  }
</style>