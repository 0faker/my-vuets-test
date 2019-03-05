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
          <span v-cloak>{{famliyInfo.name}}</span>
          <svg
            v-if="famliyInfo.sex==='0'"
            width="2rem"
            height="2rem"
            viewBox="0 0 44 44"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <!-- Generator: Sketch 49 (51002) - http://www.bohemiancoding.com/sketch -->
            <title>ic_male</title>
            <desc>Created with Sketch.</desc>
            <defs>
              <polygon
                id="path-1"
                points="6 5 38 5 38 38 6 38"
              ></polygon>
            </defs>
            <g
              id="亲属端"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <g id="ic_male">
                <mask
                  id="mask-2"
                  fill="white"
                >
                  <use xlink:href="#path-1"></use>
                </mask>
                <g id="Clip-2"></g>
                <path
                  d="M25.0783426,9 L25.0783426,11.4861274 L30.2773796,11.4861274 L25.1801987,16.9891108 C21.2620167,14.2517424 15.2868691,14.6013065 11.7340116,18.4380671 C7.86860163,22.6152272 8.14000047,29.1970152 12.306671,33.0757366 C16.4695232,36.9540652 22.9572804,36.6670495 26.8264109,32.4900531 C30.3792357,28.6532597 30.669139,23.0138547 27.1616779,18.8349271 L32.5194225,13.0456808 L32.5194225,18.9482081 L35,18.9482081 L35,9 L25.0783426,9 M24.8147101,30.9105525 C21.9178677,34.0309131 17.0234979,34.2125588 13.9009732,31.3160731 C10.782327,28.4177975 10.5985789,23.5218839 13.4990346,20.4012582 C16.3958769,17.2825881 21.2902136,17.0988542 24.4131361,19.9974281 C27.5316828,22.8938806 27.7116519,27.790192 24.8147101,30.9105525"
                  id="Fill-1"
                  fill="#60C1E9"
                  mask="url(#mask-2)"
                ></path>
              </g>
            </g>
          </svg>
          <svg
            width="2rem"
            v-if="famliyInfo.sex==='1'"
            height="2rem"
            viewBox="0 0 44 44"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <!-- Generator: Sketch 49 (51002) - http://www.bohemiancoding.com/sketch -->
            <title>ic_female</title>
            <desc>Created with Sketch.</desc>
            <defs></defs>
            <g
              id="亲属端"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <g
                id="ic_female"
                fill="#E3593C"
              >
                <path d="M22.12,7 C17.2684025,7 13,11.2312756 13,16.12 C13,21.1786552 16.5955459,25.1400242 21.36,26 L21.36,29.04 L16.8,29.04 L16.8,31.32 L21.36,31.32 L21.36,35.88 L23.64,35.88 L23.64,31.32 L28.2,31.32 L28.2,29.04 L23.64,29.04 L23.64,26 C28.4044541,25.1400242 32,21.1788164 32,16.12 C32,11.2312756 27.7315975,7 22.12,7 Z M22.5,9.28 C26.5030518,9.28 29.72,12.4970465 29.72,16.5 C29.72,20.5029535 26.5030518,23.72 22.5,23.72 C18.4969061,23.72 15.28,20.503122 15.28,16.5 C15.28,12.4970465 18.4969061,9.28 22.5,9.28 Z"></path>
              </g>
            </g>
          </svg>
        </div>
        <div
          class="phone"
          v-cloak
        >{{famliyInfo.phone}}</div>
        <div class="other">
          <div
            v-cloak
            class="age"
          >
            <svg
              width="1.5rem"
              height="1.5rem"
              viewBox="0 0 640 640"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <!-- Generator: Sketch 49 (51002) - http://www.bohemiancoding.com/sketch -->
              <title>report_personal_year_green</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g
                id="亲属端"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g
                  id="Artboard"
                  transform="translate(-2270.000000, -3300.000000)"
                  fill="#0ABA08"
                >
                  <g
                    id="report_personal_year_green"
                    transform="translate(2270.000000, 3300.000000)"
                  >
                    <path
                      d="M341,300 L299,258 C295.666667,173.333333 303.666667,117.666667 323,91 C360,46 400,-2.06566535e-13 504,-2.27373675e-13 C573.333333,-2.27373675e-13 618.666667,-2.27373675e-13 640,-2.27373675e-13 L640,70 C607.333333,194.666667 522.666667,249.666667 386,235 C386,221 386,204 386,191 C417,192 570,217 598,46 C465,46 437,30 373,103 C345,144.333333 334.333333,210 341,300 Z"
                      id="Path-4"
                    ></path>
                    <path
                      d="M42.4756287,640 L0.580575033,640 C0.683721089,535.333333 0.683721089,482.953884 0.580575033,482.861651 C-2.3328421,400.516959 5.71873093,346.229742 24.7352941,320 C61.7352941,275 101.735294,229 205.735294,229 C275.068627,229 320.401961,229 341.735294,229 L341.735294,299 C309.068627,423.666667 224.401961,478.666667 87.7352941,464 C87.7352941,450 87.7352941,433 87.7352941,420 C118.735294,421 271.735294,446 299.735294,275 C166.735294,275 138.735294,259 74.7352941,332 C47.1120031,372.777239 42.4756287,436 42.4756287,525.380663 C42.4756287,526.184729 42.4756287,564.391175 42.4756287,640 Z"
                      id="Path-4"
                      transform="translate(170.867647, 434.500000) scale(-1, 1) translate(-170.867647, -434.500000) "
                    ></path>
                  </g>
                </g>
              </g>
            </svg> {{getAge(famliyInfo.birthday)}}</div>
          <div class="height">
            <svg
              width="1.5rem"
              height="1.5rem"
              viewBox="0 0 640 640"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <!-- Generator: Sketch 49 (51002) - http://www.bohemiancoding.com/sketch -->
              <title>report_personal_height_green</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g
                id="亲属端"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g
                  id="Artboard"
                  transform="translate(-2590.000000, -6728.000000)"
                  fill="#0ABA08"
                  fill-rule="nonzero"
                >
                  <g
                    id="report_personal_height_green"
                    transform="translate(2590.000000, 6728.000000)"
                  >
                    <path
                      d="M375.611959,202.995865 C351.819001,180.922792 317.808598,168.244788 282.318098,168.244788 L211.496249,168.244788 C176.005749,168.244788 141.995346,180.922792 118.186473,202.995865 L4.1075921,308.903909 C-1.58998566,314.20198 -1.31943077,322.302558 4.66461814,327.320378 L43.513188,359.856141 C46.6484476,362.471813 50.8022685,364.00652 55.3221343,363.752959 C59.7305953,363.632852 63.8844161,361.991384 66.7809504,359.202223 L148.647826,280.732049 L148.647826,626.628042 C148.647826,634.02132 155.777756,640 164.578763,640 L219.501505,640 C228.286598,640 235.432443,634.02132 235.432443,626.628042 L235.432442,425.14119 L258.461479,425.14119 L258.461479,626.628042 C258.461479,634.02132 265.591409,640 274.392417,640 L329.267414,640 C338.068421,640 345.182436,634.02132 345.150606,626.628042 L345.150606,280.745394 L427.033396,359.202223 C429.96176,361.991384 434.131497,363.632852 438.539958,363.75296 C442.805183,364.03321 447.213645,362.458469 450.317074,359.856142 L489.117899,327.320379 C495.149692,322.289213 495.356588,314.201981 489.65901,308.90391 L375.611959,202.995865 Z M439.697334,330.734116 L341.157468,236.108545 C336.831638,231.911874 329.754453,230.441703 323.599687,232.393021 C317.39721,234.357705 313.278129,239.356287 313.278129,244.929573 L313.278129,613.581708 L290.297157,613.581708 L290.233542,613.581708 L290.233541,411.78065 C290.233541,404.376332 283.108645,398.388726 274.31385,398.388726 L219.461687,398.388726 C210.682797,398.388726 203.541996,404.376332 203.541996,411.78065 L203.541996,613.581708 L180.529216,613.581708 L180.529217,244.916208 C180.529217,239.342922 176.42604,234.330975 170.223563,232.379656 C164.021086,230.441703 157.007516,231.911874 152.633974,236.108545 L54.1259156,330.734116 L38.0630902,317.262001 L141.914821,220.645016 C159.679351,204.139002 185.045892,194.66308 211.525698,194.66308 L282.297551,194.66308 C308.761453,194.66308 334.143897,204.139002 351.908427,220.645016 L455.72835,317.262001 L439.697334,330.734116 Z"
                      id="Shape"
                    ></path>
                    <path
                      d="M624.113447,0 L550.987645,0 C542.202381,0 535.069319,5.97333312 535.069319,13.36 C535.069319,20.72 542.186494,26.7066668 550.987645,26.7066668 L608.179235,26.7066668 L608.179235,153.333333 L569.30484,153.333333 C560.487803,153.333333 553.386514,159.32 553.386514,166.693333 C553.386514,174.053333 560.487803,180.04 569.30484,180.04 L608.179235,180.04 L608.179235,306.653333 L569.30484,306.653333 C560.487803,306.653333 553.386514,312.626666 553.386514,320 C553.386514,327.373333 560.487803,333.36 569.30484,333.36 L608.179235,333.36 L608.179235,459.96 L569.30484,459.96 C560.487803,459.96 553.386514,465.906666 553.386514,473.306666 C553.386514,480.706666 560.487803,486.666666 569.30484,486.666666 L608.179235,486.666666 L608.179235,613.293333 L550.987645,613.293333 C542.186494,613.293333 535.069319,619.266666 535.069319,626.64 C535.069319,634.026667 542.186494,640 550.987645,640 L624.09756,640 C632.882824,640 639.984113,634.026667 640,626.64 L639.999999,13.3466669 C639.999999,5.97333312 632.89871,0 624.113447,0 Z"
                      id="Shape"
                    ></path>
                    <path
                      d="M247.924452,168.244788 C297.259524,168.244788 337.424151,130.489955 337.424151,84.1148851 C337.424151,37.7398157 297.259524,0 247.924452,0 C198.573404,0 158.424754,37.7398157 158.424754,84.1148851 C158.424753,130.504973 198.573404,168.244788 247.924452,168.244788 Z M247.924452,30.4056845 C279.682234,30.4056845 305.533454,54.4837874 305.533454,84.1149299 C305.533454,113.731145 279.682235,137.839103 247.924452,137.839103 C216.16667,137.839103 190.315451,113.731145 190.315451,84.1149299 C190.315451,54.4837867 216.16667,30.4056845 247.924452,30.4056845 Z"
                      id="Shape"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>{{getHeight(famliyInfo.height)}}</div>
          <div class="weight">
            <svg
              width="1.5rem"
              height="1.5rem"
              viewBox="0 0 640 640"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <!-- Generator: Sketch 49 (51002) - http://www.bohemiancoding.com/sketch -->
              <title>report_personal_weight_green</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g
                id="亲属端"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g
                  id="Artboard"
                  transform="translate(-2590.000000, -8021.000000)"
                  fill="#0ABA08"
                >
                  <g
                    id="report_personal_weight_green"
                    transform="translate(2590.000000, 8021.000000)"
                  >
                    <path
                      d="M276.127293,375.214148 L195.609748,310.012325 C187.454836,303.408608 186.197345,291.444376 192.801062,283.289465 L194.099097,281.686525 C200.702814,273.531614 212.667046,272.274122 220.821958,278.877839 L297.317006,340.822308 C303.940749,336.823261 311.702131,334.522692 320,334.522692 C344.300529,334.522692 364,354.252991 364,378.591549 C364,402.930107 344.300529,422.660407 320,422.660407 C295.699471,422.660407 276,402.930107 276,378.591549 C276,377.45519 276.042943,376.328877 276.127293,375.214148 Z"
                      id="Combined-Shape"
                    ></path>
                    <path
                      d="M88,0 L552,0 C600.601058,-8.92786951e-15 640,39.398942 640,88 L640,552 C640,600.601058 600.601058,640 552,640 L88,640 C39.398942,640 5.95191301e-15,600.601058 0,552 L0,88 C-5.95191301e-15,39.398942 39.398942,8.92786951e-15 88,0 Z M104,40.0625978 C68.653776,40.0625978 40,68.7163738 40,104.062598 L40,536.938967 C40,572.285191 68.653776,600.938967 104,600.938967 L536,600.938967 C571.346224,600.938967 600,572.285191 600,536.938967 L600,104.062598 C600,68.7163738 571.346224,40.0625978 536,40.0625978 L104,40.0625978 Z"
                      id="Combined-Shape"
                    ></path>
                    <path
                      d="M533,333.521127 C533,343.47781 524.941125,351.549296 515,351.549296 C505.058875,351.549296 497,343.47781 497,333.521127 C497,235.613746 417.754401,156.244131 320,156.244131 C222.245599,156.244131 143,235.613746 143,333.521127 C143,343.47781 134.941125,351.549296 125,351.549296 C115.058875,351.549296 107,343.47781 107,333.521127 C107,215.70038 202.363348,120.187793 320,120.187793 C437.636652,120.187793 533,215.70038 533,333.521127 Z"
                      id="Oval-3"
                      fill-rule="nonzero"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
            {{getWeight(famliyInfo.weight)}}</div>
        </div>
      </div>
      <div class="indicators">
        <div
          class="body-mess"
          v-cloak
        >
          身体质量指数:{{BMI||''}}
        </div>
        <div class="standard">

          <ul class="category">
            <li><span style="background:#cae68e"></span>过轻（0-19）</li>
            <li><span style="background:#2cd1da"></span>健康（19-24）</li>
            <li><span style="background:#fdc131"></span>过重（24-29）</li>
            <li><span style="background:#a077d0"></span>肥胖（29-40）</li>
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
            <div v-cloak>理想体重{{getidealWeght(famliyInfo.height)}}kg</div>
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
  import { Component, Prop, Vue } from "vue-property-decorator";
  // import male from "../svg/ic_male.svg";
  // import female from "../svg/ic_female.svg";
  // import Age from "../svg/green_year.svg";
  // import Height from "../svg/green_height.svg";
  // import Weight from "../svg/green_weight.svg";
  import Common from "../common/common";
  import ls from "local-storage";
  @Component({
    components: {
      // male,
      // female,
      // Age,
      // Height,
      // Weight
    }
  })
  export default class kinsfolkInfo extends Vue {
    public patientId: number = 0;
    public famliyInfo!: Patient.PatientInfo;
    public BMI: number = 0;
    public imgSrc: number = 0; // 根据BMI选择不同颜色的人体图形
    constructor() {
      super();
    }
    public created() {
      this.famliyInfo = ls.get("selectedFamily");
      this.patientId = this.famliyInfo.id;
      this.getBMI();
    }
    /**
     * 回到上页
     */
    public back() {
      this.$store.state.isBack = true;
      this.$router.back();
    }
    /**
     * 计算BMI
     */
    public getBMI() {
      this.BMI = Common.computedBMI(
        +this.famliyInfo.height,
        +this.famliyInfo.weight
      );
      this.getBMIImgSrc();
    }
    /**
     * 年龄
     */
    public getAge(birthday: number) {
      return birthday ? Common.computeAge(birthday) + "岁" : "未填写";
    }
    /**
     * 身高
     */
    public getHeight(height: string) {
      return height ? height + "cm" : "未填写";
    }
    /**
     * 体重
     */
    public getWeight(weight: string) {
      return weight ? weight + "kg" : "未填写";
    }
    public getBMIImgSrc() {
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
    getidealWeght(height: number) {
      return height ? Math.round((height * height * 22) / 100) / 100 : "--";
    }

    public route(index: number) {
      switch (index) {
        case 1:
          // 处方
          this.$router.push({
            path: `/cycleprescriptionlists/${this.patientId}`
          });
          break;
        case 2:
          // 康复
          this.$router.push({ path: `/accomplishlist/${this.patientId}` });
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
              margin: 0.5rem 0;
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