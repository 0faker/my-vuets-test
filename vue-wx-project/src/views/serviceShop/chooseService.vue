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
            @click="showChooseCity"
          >
            {{currentCityName}}
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
      <service-list
        :doctor-service="doctorServiceLists"
        @PullingUp='onPullingUp'
        :isPullingUp='isPullingUp'
      ></service-list>
    </div>
    <div
      class="city_select"
      v-if="showSelectCity"
    >
      <select-city
        @cancel='cancelselectCity'
        @searchCity='searchCity'
        @choose-city='chooseCity'
      ></select-city>
    </div>
    <div
      class="city_search"
      v-if="showSearchCity"
    >
      <search-city
        @cancel='cancelSearchCity'
        @choose-city='chooseCity'
      ></search-city>
    </div>

  </div>
</template>
<script lang='ts'>
  import { Component, Prop, Vue, Watch } from "vue-property-decorator";
  import ls from "local-storage";

  import common from "../../common/common";
  import { SignatureObj } from "../../entity/SignatureObj";
  import wxApi from "../../common/wxConfig";
  // component
  import ServiceList from "../../components/serviceList.vue";
  import SelectCity from "../../components/selectCity.vue";
  import SearchCity from "../../components/searchCity.vue";
  declare var BMap: any;
  @Component({
    components: {
      ServiceList,
      SelectCity,
      SearchCity
    },
    name: "user"
  })
  // 选择服务商品
  export default class ChooseService extends Vue {
    public patientId: string = "";
    public doctorServiceLists: any[] = [];
    public showSearchCity: boolean = false;
    public showSelectCity: boolean = false;
    public currentCityName: string = ""; // 当前选择的城市名
    public currentCityId?: number; // 当前选择的城市id
    public positioningCity: string = ""; // 定位的城市名
    public pageSize: number = 10;
    public currentPage: number = 1;
    maxPage: number = 1; //医生列表最大页数
    isPullingUp: boolean = true; //是否下拉刷新
    // 微信签名
    public url: string = location.href;
    public SignatureObj?: SignatureObj; // 微信签名
    public cityLists: Array<{
      id: number;
      name: string;
    }> = [];
    public created() {
      this.wxConfig();
      this.patientId = ls.get("payPatient");

      // 赋值当前城市为sessionStorage中城市
      this.currentCityName =
        sessionStorage.getItem("currentCityName") || "定位中";
      if (this.currentCityName !== "定位中") {
        // 不定位
      } else {
        // 定位
        var geolocation = new BMap.Geolocation();

        geolocation.getCurrentPosition(
          (r: any) => {
            console.log(r);
            if (r) {
              console.log(r.address.city);
              this.currentCityName = r.address.city;
              sessionStorage.setItem("currentCityName", this.currentCityName);
              //通过城市名获取城市id
              this.$server.GetCityId(this.currentCityName).then(res => {
                this.currentCityId = res.result;
                this.getDoctorService();
              });
            } else {
              // 定位失败 r=null
              this.currentCityName = "全国";
              this.getDoctorService();
            }
          },
          { enableHighAccuracy: true }
        );
        // this.positioningCity = "南京";
        // this.currentCityName = this.positioningCity;
      }
      this.getCitys();
    }
    activated() {
      this.patientId = ls.get("payPatient");
    }
    @Watch("patientId")
    changePatient(val: string, oldval: string) {
      // paitientid变化
      if (oldval) {
        this.wxConfig();
        this.getDoctorService();
      }
    }
    /**
     * 微信签名(安卓)
     */
    wxConfig() {
      if (common.getPhoneType() !== "ios") {
        this.$server.getWxConfig(this.url).then((res: any) => {
          this.SignatureObj = res.weChatSignature;
          wxApi.wxConfig(this.SignatureObj);
        });
      }
    }
    /**
     * 获取全部医生服务
     */
    public getDoctorService() {
      this.$server
        .GetCityDoctors(this.pageSize, this.currentPage, this.currentCityId)
        .then(data => {
          this.doctorServiceLists = this.doctorServiceLists.concat(data.result);
          this.maxPage = data.totalPage;
        });
    }
    /**
     * 回到上页
     */
    public back() {
      this.$store.state.isBack = true;
      this.$router.back();
    }
    /**
     * 获取有医生的城市lists
     */
    public getCitys() {
      this.$server
        .GetCityLists()
        .then(data => {
          this.cityLists = data.result;
          this.cityLists.forEach((element: any) => {
            // 所有首字母
            element.initials = common.getInitials(element.name);
            // 全拼
            element.pinyin = common.getPinyin(element.name);
          });
          ls.set("cityList", this.cityLists);
        })
        .catch();
    }
    /**
     * 选择城市
     */
    public chooseCity(cityId: number, cityName: string) {
      this.showSearchCity = false;
      this.showSelectCity = false;
      sessionStorage.setItem("currentCityName", cityName);
      this.currentCityName = cityName;
      console.log("cityId");
      console.log(cityId);
      this.doctorServiceLists = [];
      this.currentCityId = cityId;
      this.getDoctorService();
    }
    /**
     *显示搜索
     */
    public showChooseCity() {
      this.showSelectCity = true;
    }
    /**
     * 去搜索医生
     */
    public search() {
      this.$router.push({ path: "searchdoctor" });
    }
    /**
     * 显示搜索
     */
    public searchCity() {
      this.showSearchCity = true;
      this.showSelectCity = false;
    }

    public cancelSearchCity() {
      this.showSearchCity = false;
      this.showSelectCity = false;
    }
    /**
     * 关闭城市选择
     */
    public cancelselectCity() {
      this.showSelectCity = false;
      this.showSearchCity = false;
    }
    /**
     * 上拉
     */
    onPullingUp() {
      console.log("PullingUp");
      if (this.currentPage < this.maxPage) {
        this.currentPage++;
        this.getDoctorService();
      } else {
        this.isPullingUp = false;
      }
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
            text-align: center;
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
            line-height: 2.25rem;
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
    > .city_search,
    > .city_select {
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