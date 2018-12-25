<template>
  <div class="kinsfolk">
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
        亲属详情
      </div>
      <div>

      </div>
    </div>
    <main>
      <div class="patient-info">
        <div class="name">
          <span>安安</span>
          <male v-if="famliyInfo.sex==='0'" />
          <female v-if="famliyInfo.sex==='1'" />
        </div>
        <div class="phone">{{famliyInfo.phone}}</div>
        <div class="other">
          <div class="age">
            <age /> {{getAge(famliyInfo.birthday)}}</div>
          <div class="height">
            <Height />{{getHeight(famliyInfo.height)}}</div>
          <div class="weight">
            <Weight />
            {{getWeight(famliyInfo.weight)}}</div>
        </div>
      </div>
      <div class="indicators">
        <div class="body-mess">
          身体质量指数:{{BMI||''}}
        </div>
        <div class="standard">

          <ul class="category">
            <li><span style="background:#cae68e"></span>过轻（12-18）</li>
            <li><span style="background:#2cd1da"></span>健康（19-24）</li>
            <li><span style="background:#fdc131"></span>过重（25-29）</li>
            <li><span style="background:#a077d0"></span>肥胖（30-40）</li>
            <li><span style="background:#f67466"></span>极度肥胖（大于40）</li>
          </ul>

          <div class="patient-mess">
            <img
              src="../assets/data_man_whitecircle.png"
              alt=""
              srcset=""
              v-if="imgSrc===0"
            >
            <img
              src="../assets/report_man_greencircle.png"
              alt=""
              srcset=""
              v-if="imgSrc===1"
            >
            <img
              src="../assets/report_man_bluecircle.png"
              alt=""
              srcset=""
              v-if="imgSrc===2"
            >
            <img
              src="../assets/report_man_yellowcircle.png"
              alt=""
              srcset=""
              v-if="imgSrc===3"
            >
            <img
              src="../assets/report_man_purplecircle.png"
              alt=""
              srcset=""
              v-if="imgSrc===4"
            >
            <img
              src="../assets/report_man_redcircle.png"
              alt=""
              srcset=""
              v-if="imgSrc===5"
            >
            <div>理想体重：63kg</div>
          </div>
        </div>

      </div>
    </main>
    <div class="record">
      <ul>
        <li @click="route(1)">
          <div class="list-t">康复处方</div>
          <div class="list-b"></div>
        </li>
        <li @click="route(2)">
          <div class="list-t">康复记录</div>
          <div class="list-b"></div>
        </li>
        <li @click="route(3)">
          <div class="list-t">康复报告</div>
          <div class="list-b"></div>
        </li>
        <li @click="route(4)">
          <div class="list-t">评价记录</div>
          <div class="list-b"></div>
        </li>
        <li @click="route(5)">
          <div class="list-t">预防记录</div>
          <div class="list-b"></div>
        </li>
        <li @click="route(6)">
          <div class="list-t">监测记录</div>
          <div class="list-b"></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import male from '../svg/ic_male.svg';
import female from '../svg/ic_female.svg';
import Age from '../svg/green_year.svg';
import Height from '../svg/green_height.svg';
import Weight from '../svg/green_weight.svg';

import Common from '../common/common';
import ls from 'local-storage';
@Component({
  components: {
    male,
    female,
    Age,
    Height,
    Weight,
  },
})
export default class kinsfolkInfo extends Vue {
    patientId: number = 0;
    famliyInfo!: Patient.PatientInfo;
    BMI: number = 0;
    imgSrc: number = 0; // 根据BMI选择不同颜色的人体图形
  constructor() {
    super();
  }
    created() {
    this.famliyInfo = ls.get('selectedFamily');
    this.patientId = this.famliyInfo.id;
    this.getBMI();
  }
  /**
   * 回到上页
   */
    back() {
    this.$store.state.isBack = true;
    this.$router.back();
  }
  /**
   * 计算BMI
   */
    getBMI() {
    this.BMI = Common.computedBMI(
      +this.famliyInfo.height,
      +this.famliyInfo.weight,
    );
    this.getBMIImgSrc();
  }
  /**
   * 年龄
   */
    getAge(birthday: number) {
    return birthday ? Common.computeAge(birthday) + '岁' : '未填写';
  }
  /**
   * 身高
   */
    getHeight(height: string) {
    return height ? height + 'cm' : '未填写';
  }
  /**
   * 体重
   */
    getWeight(weight: string) {
    return weight ? weight + 'kg' : '未填写';
  }
    getBMIImgSrc() {
    if (+this.BMI > 0 && +this.BMI < 19) {
      this.imgSrc = 1;
    } else if (+this.BMI >= 19 && +this.BMI < 24) {
      this.imgSrc = 2;
    } else if (+this.BMI >= 24 && +this.BMI < 29) {
      this.imgSrc = 3;
    } else if (+this.BMI >= 29 && +this.BMI <= 40) {
      this.imgSrc = 4;
    } else if (+this.BMI > 40) {
      this.imgSrc = 5;
    } else {
      this.imgSrc = 0;
    }
  }

    route(index: number) {
    switch (index) {
      case 1:
        // 处方
        this.$router.push({
          path: `/cycleprescriptionlists/${this.patientId}`,
        });
        break;
      case 2:
        // 康复
        this.$router.push({ path: `/accomplish/${this.patientId}` });
        break;
      case 3:
        // 报告
        this.$router.push({ path: `/reportlists/${this.patientId}` });
        break;
      case 4:
        // 评价
        this.$router.push({ path: `/assessmentlist/${this.patientId}` });
        break;
      case 5:
        // 预防
        this.$router.push({ path: `/preventlist/${this.patientId}` });
        break;
      case 6:
        // 监测
        this.$router.push({ path: `/monitorlist/${this.patientId}` });
        break;
    }
  }
}
</script>
<style lang='scss' scoped>
  .kinsfolk {
    min-height: 100%;
    > .header {
      height: $header-height;
      background-color: $baseGreen;
      color: #fff;
      text-align: center;
      font-size: 1.5rem;
      line-height: $header-height;
      position: relative;
      > .back {
        position: absolute;
        top: 0;
        left: 0;
        width: 3rem;
        padding: 0.75rem;
        height: 100%;
        > img {
          height: 2.15rem;
        }
      }
    }
    > main {
      > .patient-info {
        background-color: #fff;
        border-bottom: 1px solid #f0f0f0;
        padding-top: 1.085rem;
        > div {
          text-align: center;
          color: $basefontcolor;
          font-size: 1.5rem;
          svg {
            vertical-align: middle;
          }
        }
        > .phone {
          margin: 0.71rem 0;
        }
        > .other {
          display: flex;
          padding-bottom: 0.625rem;
          font-size: 1.165rem;
          > div {
            flex: 1;
            color: #646464;
            > svg {
              margin-right: 1rem;
            }
          }
        }
      }
      > .indicators {
        background-color: #fff;
        padding: 1rem;
        > .body-mess {
          text-align: center;
          font-size: 1.5rem;
        }
        > .standard {
          display: flex;
          > .category {
            flex: 1;
            padding-left: 1rem;
            > li {
              position: relative;
              padding-left: 1.5rem;
              font-size: 1.25rem;
              color: #7a7979;
              > span {
                width: 1.04rem;
                height: 1rem;
                margin-right: 0.5rem;
                vertical-align: baseline;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: 0;
              }
            }
          }
          > .patient-mess {
            flex: 1;
            text-align: center;
            > img {
              text-align: center;
              width: 6.5rem;
              margin: 0 auto;
            }
            > div {
              text-align: center;
              font-size: 1.25rem;
              color: #7a7979;
            }
          }
        }
      }
    }
    > .record {
      padding: 1rem;
      > ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        > li {
          min-width: 30%;
          flex: 1;
          background-color: #fff;
          text-align: center;
          margin-bottom: 0.625rem;
          > .list-t {
            padding: 1.96rem 0;
            font-size: 1.5rem;
            color: $basefontcolor;
          }
          > .list-b {
            width: 100%;
            height: 0.835rem;
            border-radius: 0px 0px 0.33rem 0.33rem;
          }
        }
        > li:nth-of-type(1) {
          > .list-b {
            background-image: linear-gradient(135deg, #83d888 0%, #4caf50 100%);
          }
        }
        > li:nth-of-type(2) {
          margin: 0 0.675rem 1rem;
          > .list-b {
            background-image: linear-gradient(90deg, #fcbd78 0%, #f87931 100%);
          }
        }
        > li:nth-of-type(3) {
          > .list-b {
            background-image: linear-gradient(90deg, #ff8a8a 0%, #ff5252 100%);
          }
        }
        > li:nth-of-type(4) {
          > .list-b {
            background-image: linear-gradient(90deg, #fbaaa9 0%, #f57170 100%);
          }
        }
        > li:nth-of-type(5) {
          margin: 0 0.675rem 1rem;
          > .list-b {
            background-image: linear-gradient(90deg, #ff9047 0%, #ff5722 100%);
          }
        }
        > li:nth-of-type(6) {
          > .list-b {
            background-image: linear-gradient(90deg, #00d9ff 0%, #00b1fe 100%);
          }
        }
      }
    }
  }
</style>