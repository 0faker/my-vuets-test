<template>
  <div
    class="service_list"
    ref="serviceList"
  >
    <!-- <quick-loadmore
      :top-method="handleTop"
      ref="vueLoad"
      :top-status-change="handleStatusChange"
      :bottom-method="handleBottom"
      :bottom-status-change="handleBottomStatusChange"
      :disable-top="false"
      :disable-bottom="false"
    > -->
    <div
      class="scroll-list-wrap"
      v-if="haveDoctor"
    >
      <cube-scroll
        ref="scroll"
        :data="doctorLists"
        :options="options"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp"
      >
        <div
          class="doctor_details"
          v-for="(item,index) in doctorLists"
          :key="index"
          :class="{doctor_active:doctorActive==index}"
        >
          <!-- 医生服务收起 -->
          <div
            class="detail_push"
            @click="checkDetail(item.id,index,$event)"
          >
            <div class="headimg">
              <img
                :src="item.headImageUrl"
                alt=""
                onerror="this.src='./img/ic_patient_avator.png'"
              >
            </div>
            <div class="doctor_infos">
              <div class="infos_t">
                <b>{{item.name}}</b><i>{{item.position}}</i>
              </div>
              <div class="hospital_pull"><img
                  src="../assets/ic_hospital.png"
                  alt=""
                >{{item.hospitalName}} （{{item.departmentName}}）</div>
              <ul
                class="infos_b"
                v-if="doctorActive!=index"
              >
                <li
                  class="clearfix"
                  v-for="category in item.categoryList"
                  :key="category.id"
                >
                  <span class="name">{{category.name}}</span>
                  <span class="bottomPrice">￥{{category.bottomPrice}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div
            class="service_choose"
            v-if="doctorActive==index"
          >
            <h3>特色服务选购</h3>
            <!-- 种类 -->
            <ul class="species">
              <li
                v-for="(items,index) in categoryList"
                :key="items.id"
                :class="{active:servicerActive==index}"
                @click="selectService(index)"
              >
                <img
                  v-if="servicerActive==index"
                  :src="items.activeImg"
                  alt=""
                >
                <img
                  v-else
                  :src="items.disactiveImg"
                  alt=""
                >
                <div class="service_name">{{items.name}}</div>
                <div class="remainingTimes">(剩余{{items.remainingTimes}}次)</div>
              </li>
            </ul>
            <h4>请选择服务的规格：</h4>
            <ul class="specifications">
              <li
                class="specification"
                :class="{active:specificationActive==index}"
                v-for="(item,index) in selectedService.productList"
                :key="item.id"
                @click="selectSpecification(index,item.id)"
              >
                <div>
                  <div class="name">{{item.name}}</div>
                  <div class="price">￥{{item.price}}</div>
                </div>

              </li>
            </ul>
            <button
              class="pay"
              @click="getOrder"
            >购买</button>
          </div>

        </div>
      </cube-scroll>
    </div>
    <main v-else>
      <div class="no_doctor">暂未找到相关医生信息！</div>
    </main>
  </div>
</template>
<script lang='ts'>
  import { Component, Prop, Vue, Watch } from "vue-property-decorator";
  import ls from "local-storage";
  import wxApi from "../common/wxConfig";
  declare var wx: any;
  @Component
  export default class ServiceList extends Vue {
    public doctorActive: number = -1; // 选中的医生
    public servicerActive: number = -1; // 选中的服务
    public specificationActive: number = -1; // 选中的规格
    public specificationActiveId: number = -1; // 选中的规格服务id
    public selectedService: any;
    public patientId!: number;
    public doctorId!: number;
    public categoryList: any[] = [];
    public doctorLists: any = [];
    public haveDoctor: boolean = false;
    public viewHeight!: number; // 可视区域高度
    public options: any = {};
    PullingUp: boolean = true;
    @Prop() public doctorService: any;
    @Watch("doctorService")
    public onDoctorService(val: string, oldVal: string) {
      this.doctorLists = val;
      this.haveDoctor = this.doctorLists.length == 0 ? false : true;
    }
    @Watch("isPullingUp")
    public onIsPullingUp(val: boolean, oldVal: boolean) {
      this.PullingUp = val;
    }

    created() {
      this.options = {
        pullDownRefresh: false,
        pullUpLoad: {
          text: "加载成功"
        },
        scrollY: true
      };
    }
    public mouneted() {
      // this.viewHeight = document.documentElement.clientHeight;
    }
    /**
     * 在服务类别中添加对应图片
     */
    public addServiceImg() {
      this.categoryList.forEach((element: any) => {
        if (element.id == 7) {
          element.activeImg = "./img/ic_rx_pay_s.png";
          element.disactiveImg = "./img/ic_rx_pay_n.png";
        } else if (element.id == 8) {
          element.activeImg = "./img/ic_hr_anasysis_pay_s.png";
          element.disactiveImg = "./img/ic_hr_anasysis_pay_n.png";
        }
      });
    }
    /**
     * 打开具体医生服务
     */
    public checkDetail(id: number, index: number, e: MouseEvent) {
      this.patientId = ls.get("payPatient");
      // 重复点击
      if (this.doctorActive !== index) {
        this.doctorId = id;
        this.$server.GetCommonDoctorService(id, this.patientId).then(data => {
          this.categoryList = data.result;
          this.addServiceImg();
          this.selectService(0);
          this.doctorActive = index;
        });
      } else {
        this.doctorActive = -1;
      }

      // 默认选中第一个服务
    }
    /**
     * 选择服务类型
     */
    public selectService(index: number) {
      this.servicerActive = index;
      this.selectedService = this.categoryList[index];
      this.selectSpecification(0, this.selectedService.productList[0].id);
    }
    /**
     * 选择规格
     */
    public selectSpecification(index: number, id: number | null = null) {
      if (id) {
        this.specificationActiveId = id;
      }
      this.specificationActive = index;
    }
    /**
     * 生成订单
     */
    getOrder() {
      this.$server
        .GetPayOrder(this.specificationActiveId, this.doctorId, this.patientId)
        .then(res => {
          const orderId = res.result.id;
          this.pay(orderId);
        });
    }
    /**
     * 购买
     */
    public pay(orderId: number) {
      const openId = ls.get("openId");

      this.$server.GetWxPaySignature(orderId, openId).then((res: any) => {
        const paySign = JSON.parse(res.result);
        wx.chooseWXPay({
          // appid: "wxc1755ba87a7baa57",
          timestamp: paySign.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: paySign.nonceStr, // 支付签名随机串，不长于 32 位
          package: paySign.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: paySign.sign, // 支付签名
          success: (respose: any) => {
            // 支付成功后的回调函数
            this.$router.push({ path: "/wxpaysuccess" });
          },
          fail: function(error: any) {
            this.$router.push({ path: "/wxpayfail" });
            //
          }
        });
      });
      // wxApi.wxPayConfig()
    }
    /**
     * 下拉
     */
    public onPullingDown() {
      this.$emit("PullingUp");
    }
    /**
     * 上拉
     */
    public onPullingUp() {
      if (this.PullingUp) {
        this.$emit("PullingUp");
      } else {
        this.doctorLists = this.doctorLists;
      }
    }
  }
</script>
<style lang='scss' scoped>
  .service_list {
    // background-color: #f40;
    padding: 1rem;
    > .scroll-list-wrap {
      height: 40rem;
    }
    .doctor_details {
      transition: all 0.5s;
      border-radius: 4px;
      padding: 1rem 1.29rem;
      background-color: #fff;
      margin-bottom: 1rem;
      box-sizing: border-box;
      // 医生服务收起
      box-shadow: 0 1px 3px 0 rgba(44, 54, 93, 0.5);
      > .detail_push {
        display: flex;
        > .headimg {
          width: 6rem;
          display: inline-block;
          height: 100%;
          > img {
            width: 6rem;
            height: 6rem;
            // 医生服务下拉打开rem;
            border-radius: 50%;
          }
        }

        > .doctor_infos {
          padding: 0;
          width: 1rem;
          flex: 1;
          > .infos_t {
            color: $basefontcolor2;
            > i {
              font-size: 1rem;
              font-style: normal;
              font-weight: bold;
              margin-left: 0.67rem;
            }
            > b {
              font-size: 1.5rem;
              font-weight: bold;
            }
          }
          > .hospital_pull {
            border-bottom: 0.5px solid #eeeeee;
            font-size: 1rem;
            overflow: hidden; //超出一行文字自动隐藏
            text-overflow: ellipsis; //文字隐藏后添加省略号
            white-space: nowrap; //强制不换行
            font-style: normal;

            > img {
              width: 2.25rem;
              vertical-align: middle;
              margin-top: -5px;
            }
          }
          > .hospital-push {
            border-bottom: 0.5px solid #eeeeee;
            font-size: 1rem;
            padding-left: 2rem;
            position: relative;

            > img {
              width: 1.5rem;
            }
          }
          > .infos_b {
            font-weight: 600;
            font-weight: bold;
            margin-right: 0.75rem;
            > li {
              background-color: #f7f7f7;
              margin-top: 0.5rem;
              border-radius: 0.5rem;
              position: relative;
              padding: 0.5rem 1rem;
              font-size: 1.125rem;
              > .name {
                float: left;
                color: $basefontcolor2;
                font-weight: bold;
              }
              > .bottomPrice {
                float: right;
                color: $warnRed;
              }
            }
          }
        }
      }

      > .service_choose {
        > h3 {
          font: 1.5rem/1.5 "Helvetica-Bold";
          color: $basefontcolor2;
          letter-spacing: 0;
          font-weight: bold;
          margin: 0.65rem 0;
        }
        > .species {
          display: flex;
          text-align: center;
          margin: 0.65rem 0;
          > li {
            width: 8.335rem;
            border-radius: 0.35rem;
            padding: 1.335rem 0.8rem;
            margin-right: 1rem;
            background-color: #f7f7f7;
            > img {
              width: 3rem;
              margin: 0.3rem;
            }
            > div {
              color: $basefontcolor2;
            }
            > .service_name {
              font-family: "PingFangSC-Semibold";
              font-size: 1.3rem;
              letter-spacing: 0;
              font-weight: bold;
            }
          }
          > .active {
            background: #ff5722;
            > div {
              color: #fff;
            }
          }
        }
        > h4 {
          font-family: "PingFangSC-Regular";
          font-size: 1.2rem;
          color: $basefontcolor2;
          letter-spacing: 0;
        }
        > .specifications {
          flex-wrap: wrap;
          display: flex;
          justify-content: space-between;
          > .specification {
            width: 49%;
            margin: 0.5rem 0;
            > div {
              padding: 0.825rem 1rem;
              border-radius: 0.34rem;
              background: #f7f7f7;
              border: 2px solid transparent;
              display: flex;
              font-size: 1.25rem;
              box-sizing: border-box;
              > .price {
                flex: 1;
                color: $basefontcolor2;
                padding: 0;
                text-align: right;
                font-weight: bold;
                font-style: italic;
              }
              > .name {
                flex: 1;
                color: $basefontcolor2;
                text-align: left;
                padding: 0;
                font-weight: bold;
              }
            }
          }
          > .active {
            > div {
              background: rgba(255, 87, 34, 0.2);
              border: 0.16rem solid #ff5722;
              > .price {
                color: $baseRed;
              }
              > .name {
                color: $baseRed;
              }
            }
          }
        }
        > .pay {
          width: 75%;
          display: block;
          margin: 2.63rem auto 1.63rem;
          padding: 0.625rem 0;
          color: #fff;
          font-size: 1.5rem;
          border-radius: 100rem;
          background-image: linear-gradient(153deg, #83d888 0%, #4caf50 95%);
        }
      }
    }
    .doctor_active {
      box-shadow: 0 2px 10px 0 rgba(44, 54, 93, 0.5);
      > .detail_push {
        > .headimg {
          width: 4rem;
          display: inline-block;
          height: 100%;
          > img {
            width: 4rem;
            height: 4rem;
            // 医生服务下拉打开;
            border-radius: 50%;
          }
        }
      }
    }
    > main {
      > .no_doctor {
        font-size: 1.33rem;
        margin-top: 3.67rem;
        text-align: center;
        font-family: PingFangSC;
      }
    }
  }
</style>