<template>
  <div class="service_list">
    <quick-loadmore
      :top-method="handleTop"
      ref="vueLoad"
      :top-status-change="handleStatusChange"
      :bottom-method="handleBottom"
      :bottom-status-change="handleBottomStatusChange"
      :disable-top="false"
      :disable-bottom="false"
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
          @click="checkDetail(item.id,index)"
        >
          <div class="headimg">
            <img
              src="../assets/report_man_blue.png"
              alt=""
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
              v-for="(item,index) in doctorService"
              :key="item.id"
              :class="{active:servicerActive==index}"
              @click="selectService(index)"
            >
              <img
                v-if="servicerActive==index"
                :src="item.activeImg"
                alt=""
              >
              <img
                v-else
                :src="item.disactiveImg"
                alt=""
              >
              <div class="service_name">{{item.name}}</div>
              <div class="remainingTimes">(剩余{{item.remainingTimes}}次)</div>
            </li>
          </ul>
          <h4>请选择服务的规格：</h4>
          <ul class="specifications">
            <li
              class="specification"
              :class="{active:specificationActive==index}"
              v-for="(item,index) in selectedService.productList"
              :key="item.id"
              @click="selectSpecification(index)"
            >
              <div>
                <div class="name">{{item.name}}</div>
                <div class="price">{{item.price}}</div>
              </div>

            </li>
          </ul>
          <button
            class="pay"
            @click="pay"
          >购买</button>
        </div>

      </div>
    </quick-loadmore>
  </div>
</template>
<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  @Component
  export default class ServiceList extends Vue {
    doctorActive: number = -1; //选中的医生
    servicerActive: number = -1; //选中的服务
    specificationActive: number = -1; //选中的规格
    selectedService: any;
    doctorLists: any = [
      {
        id: 2,
        name: "小哈",
        professionalTitle: "职称",
        position: "职位",
        departmentName: "心外科",
        hospitalName: "创越医阿三大啊啊啊sdfsf的方式是否是啊啊院",
        categoryList: [
          { name: "信贷你", bottomPrice: 12345 },
          { name: "信贷你", bottomPrice: 12345 }
        ]
      },
      {
        id: 1,
        name: "小哈",
        professionalTitle: "职称",
        position: "职位",
        departmentName: "心外科",
        hospitalName: "创越医院"
      }
    ];
    doctorService: any = [
      {
        id: 6,
        name: "运动处方",
        remainingTimes: 10,
        activeImg: "/img/ic_rx_pay_s.png",
        disactiveImg: "/img/ic_rx_pay_n.png",
        productList: [
          {
            id: 26,
            name: "1次",
            price: 100,
            defaultNum: 1
          },
          {
            id: 27,
            name: "4次",
            price: 200,
            defaultNum: 4
          },
          {
            id: 28,
            name: "8次",
            price: 300,
            defaultNum: 8
          },
          {
            id: 29,
            name: "12次",
            price: 400,
            defaultNum: 12
          }
        ]
      },
      {
        id: 7,
        name: "心电分析",
        remainingTimes: 0,
        activeImg: "/img/ic_hr_anasysis_pay_s.png",
        disactiveImg: "/img/ic_hr_anasysis_pay_n.png",
        productList: [
          {
            id: 30,
            name: "1次",
            price: 100,
            defaultNum: 1
          },
          {
            id: 31,
            name: "4次",
            price: 200,
            defaultNum: 4
          },
          {
            id: 32,
            name: "8次",
            price: 300,
            defaultNum: 8
          },
          {
            id: 33,
            name: "12次",
            price: 500,
            defaultNum: 12
          }
        ]
      }
    ];
    mouneted() {
      this.addServiceImg();
    }
    /**
     * 在服务类别中添加对应图片
     */
    addServiceImg() {
      this.doctorService.forEach((element: any) => {
        // if (element.id == 6) {
        //   element.activeImg = "../assets/ic_rx_pay_s.png";
        //   element.disactiveImg = "../assets/ic_rx_pay_n.png";
        // } else if (element.id == 7) {
        //   element.activeImg = "/assets/ic_hr_anasysis_pay_s.png";
        //   element.disactiveImg = "/assets/ic_hr_anasysis_pay_s.png";
        // }
      });
    }
    /**
     * 打开具体医生服务
     */
    checkDetail(id: number, index: number) {
      this.doctorActive = index;
      //默认选中第一个服务
      this.selectService(0);
    }
    /**
     * 选择服务类型
     */
    selectService(index: number) {
      console.log(index);
      this.servicerActive = index;
      this.selectedService = this.doctorService[index];
      this.selectSpecification(0);
    }
    /**
     * 选择规格
     */
    selectSpecification(index: number) {
      this.specificationActive = index;
    }
    /**
     * 购买
     */
    pay() {}
    handleStatusChange() {}
    handleBottom() {}
    handleBottomStatusChange() {}
    handleTop() {}
  }
</script>
<style lang='scss' scoped>
  .service_list {
    // background-color: #f40;
    padding: 1rem;
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
            margin: 1rem 0;
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
  }
</style>