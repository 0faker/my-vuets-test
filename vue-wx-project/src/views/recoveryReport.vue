<template>
  <div
    class="recovery_report"
    v-if="loadding"
  >
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
        报告
      </div>
      <div> </div>
    </div>
    <main>
      <h1>运动处方执行周期报告</h1>
      <div class="hospital">{{reportInfo.hospital}}</div>
      <img
        class="cut_off"
        src="../assets/report_cut_off_line.png"
      >
      <table class="report_header">
        <tr>
          <th>申请科室：</th>
          <td style="color:#E69717">{{reportInfo.office}}</td>
        </tr>
        <tr>
          <th>报告编号：</th>
          <td>{{reportInfo.sNumber}}</td>
        </tr>
        <tr>
          <th>报告日期：</th>
          <td>{{reportInfo.addTime}}</td>
        </tr>
        <tr>
          <th>申请医生：</th>
          <td>
            <div class="doctor_name">{{reportInfo.doctorName}}</div>
          </td>
        </tr>
      </table>
      <div class="patient">
        <h2>基本信息</h2>
        <div class="patient_info">
          <div class="name">
            <div class="info_t">

              <svg
                height="1.25rem"
                viewBox="0 0 600 640"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <!-- Generator: Sketch 48.1 (47250) - http://www.bohemiancoding.com/sketch -->
                <title>report_personal_name</title>
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
                    id="report_personal_name"
                    transform="translate(-20.000000, 0.000000)"
                    fill="#FFFFFF"
                    fill-rule="nonzero"
                  >
                    <path
                      d="M371.280937,312 C436.056856,290.666667 481.939799,230.666667 481.939799,160 C481.939799,72 409.06689,0 320,0 C230.93311,0 158.060201,72 158.060201,160 C158.060201,230.666667 203.943144,290.666667 268.719063,312 C154.011706,334.666667 20,430.666667 20,546.666667 C20,598.666667 61.8344479,640 114.464883,640 L525.535117,640 C578.165551,640 619.999999,598.666667 620,546.666667 C620,430.666667 485.988294,334.666667 371.280937,312 Z M189.063545,160 C189.063545,86.6666669 245.777592,30.6666669 320,30.6666669 C394.222408,30.6666669 450.936455,86.6666669 450.936455,160 C450.936455,233.333333 394.222408,289.333333 320,289.333333 C245.777592,289.333333 189.063545,233.333333 189.063545,160 Z M114.464883,609.333333 C76.6789304,609.333333 51.0033447,584 51.0033447,546.666667 C51.0033447,424 205.292642,347.333334 320,347.333333 C434.707358,347.333332 588.996655,424 588.996655,546.666667 C588.996655,584 563.32107,609.333334 525.535117,609.333333 L114.464883,609.333333 Z"
                      id="Shape"
                    ></path>
                  </g>
                </g>
              </svg>
            </div>
            <div class="info_b"> {{reportInfo.patientName||'--'}}</div>
          </div>
          <div class="sex">
            <div class="info_t">
              <svg
                height="1.25rem"
                viewBox="0 0 640 640"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <!-- Generator: Sketch 48.1 (47250) - http://www.bohemiancoding.com/sketch -->
                <title>report_personal_gender</title>
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
                    id="report_personal_gender"
                    fill="#FFFFFF"
                    fill-rule="nonzero"
                  >
                    <path
                      d="M180.310981,444.987167 L293.01943,444.987167 L293.01943,484.957823 L180.311955,484.957823 L180.311955,640 L139.125351,640 L139.125351,484.957823 L33.6294234,484.957823 L33.6294234,444.987167 L139.124377,444.987167 L139.124377,354.949816 C60.6270725,344.801643 0,271.016672 0,190.141594 C0,102.250555 71.6036794,31 159.930926,31 C248.259147,31 319.862827,102.250555 319.862827,190.141594 C319.862827,273.909362 262.883474,349.561054 180.310981,355.81869 L180.310981,444.987167 Z M159.930926,313.173533 C228.216391,313.173533 283.5729,258.090235 283.5729,190.141594 C283.5729,122.192953 228.216391,67.1106251 159.930926,67.1106251 C91.6454614,67.1106251 36.289927,122.193923 36.289927,190.141594 C36.289927,258.090235 91.6454614,313.173533 159.930926,313.173533 Z"
                      id="Shape"
                    ></path>
                    <path
                      d="M455.303304,78.2035328 L410.808934,123.513078 L386.499124,97.7023151 L476.918413,0 L573.961846,97.6377108 L542.306831,126.513078 L495.496574,78.204501 L495.496574,257.301876 C575.177427,266.380518 639.07391,341.579122 639.07391,423.129088 C639.07391,510.871545 558.368045,587 470.002054,587 C381.635088,587 310,510.871545 310,423.129088 C310,340.307899 373.827138,264.288277 455.303304,256.919444 L455.303304,78.2035328 Z M596.111505,423.129088 C596.111505,353.972819 539.649824,297.911212 470.001079,297.911212 C400.354285,297.911212 354.979108,353.972819 354.979108,423.129088 C354.979108,492.285356 400.354285,548.346964 470.002054,548.346964 C539.649824,548.346964 596.111505,492.285356 596.111505,423.129088 Z"
                      id="Shape"
                    ></path>
                  </g>
                </g>
              </svg>
            </div>
            <div class="info_b"> {{reportInfo.sex?(reportInfo.sex==1?'男':"女"):"--"}}</div>
          </div>
          <div class="age">
            <div class="info_t">
              <svg
                height="1.25rem"
                viewBox="0 0 640 640"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <!-- Generator: Sketch 48.1 (47250) - http://www.bohemiancoding.com/sketch -->
                <title>report_personal_year</title>
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
                    id="report_personal_year"
                    fill="#FFFFFF"
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
              </svg>
            </div>
            <div class="info_b"> {{reportInfo.age||'--'}}</div>
          </div>
          <div class="height">
            <div class="info_t"> <svg
                height="1.25rem"
                viewBox="0 0 640 640"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <!-- Generator: Sketch 48.1 (47250) - http://www.bohemiancoding.com/sketch -->
                <title>report_personal_height</title>
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
                    id="report_personal_height"
                    fill="#FFFFFF"
                    fill-rule="nonzero"
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
              </svg></div>
            <div class="info_b"> {{reportInfo.height||'--'}}</div>
          </div>
          <div class="weight">
            <div class="info_t">
              <svg
                height="1.25rem"
                viewBox="0 0 640 640"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <!-- Generator: Sketch 48.1 (47250) - http://www.bohemiancoding.com/sketch -->
                <title>report_personal_weight</title>
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
                    id="report_personal_weight"
                    fill="#FFFFFF"
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
              </svg>
            </div>
            <div class="info_b"> {{reportInfo.weight||'--'}}</div>
          </div>
        </div>
        <div class="body_cell">
          <span :style="{backgroundColor:activeColor}"></span> {{getBMIExplain(reportInfo.bmi)}}
        </div>
        <div class="body_img">
          <img
            src="../assets/report_man_blue.png"
            alt=""
          >
          <div class="bmi">
            BMI：{{reportInfo.bmi||'--'}}
          </div>
        </div>
      </div>
      <div class="goal">
        <h3>康复目的</h3>
        <div>
          {{reportInfo.recoveryGoal}}
        </div>
      </div>
      <div class="target">
        <h3>康复目标</h3>
        <div>{{reportInfo.recoveryTarget}}</div>
      </div>
      <completion :validday-rate='reportInfo'></completion>
      <h4 class="">运动心率占比分布</h4>
      <hr-distribution :HrDistributionData='reportInfo.chartDTOList'></hr-distribution>
      <h4>运动时长统计</h4>
      <effective-exercise :effective-exercise='reportInfo.chartDTOList'></effective-exercise>
      <h4>运动强度占比分布</h4>
      <mets-rate :report-info='reportInfo.chartDTOList'></mets-rate>
      <div v-if="reportInfo.bpChart.length!=0">
        <h4>周期血压占比</h4>
        <cyclebp-chart :cyclebp-data='reportInfo.bpChart'></cyclebp-chart>
      </div>
      <report-table :reportInfo='reportInfo'></report-table>
    </main>
  </div>
</template>
<script lang='ts'>
  import { Component, Prop, Vue, Watch } from "vue-property-decorator";
  import Completion from "../components/completion.vue";
  import EffectiveExercise from "../components/effectiveExercise.vue";
  import HrDistribution from "../components/HrDistribution.vue";
  import CyclebpChart from "../components/cyclebpChart.vue";
  import ReportTable from "../components/reportTable.vue";
  import MetsRate from "../components/MetsRate.vue";
  import common from "../common/common";
  @Component({
    components: {
      Completion,
      EffectiveExercise,
      HrDistribution,
      CyclebpChart,
      ReportTable,
      MetsRate
    }
    // name: "infos"
  })
  export default class RecoveryReportInfo extends Vue {
    public userid: string = "";
    public recordid: string = "";
    public reportInfo!: ReportInfo.ReportInfos;
    public loadding: boolean = false;
    activeColor: string = "DADADA";
    public mounted() {
      this.userid = this.$route.params.userid;
      this.recordid = this.$route.params.recordid;
      this.getReportInfo();
    }
    // activated() {
    //   this.recordid = this.$route.params.recordid;
    //   this.$store.state.isBack = false;
    // }
    // deactivated() {}
    // @Watch("recordid")
    // getdata() {
    //   this.getReportInfo();
    // }
    /**
     * 回到上页
     */
    public back() {
      this.$store.state.isBack = true;
      this.$router.back();
    }
    /**
     * 获取报告内容
     */
    public getReportInfo() {
      this.$server
        .getReportInfo(this.userid, this.recordid)
        .then((res: ReportInfo.ReportInfoResult) => {
          this.reportInfo = res.result;
          // -----ui----
          this.loadding = true;
        });
    }
    /**
     * bmi
     */
    getBMIExplain(bmi: number) {
      let BMIExplain = "";
      console.log(bmi);
      if (bmi < 18.5 && bmi != 0) {
        BMIExplain = "过轻(小于19)";
        this.activeColor = "#DAEC7D";
      } else if (bmi >= 18.5 && bmi <= 24) {
        this.activeColor = "#2BD1DA";

        BMIExplain = "健康(19-24)";
      } else if (bmi > 24 && bmi <= 29) {
        this.activeColor = "#FEC131";
        BMIExplain = "过重(24-29)";
      } else if (bmi > 29 && bmi <= 40) {
        BMIExplain = "肥胖(29-40)";
        this.activeColor = "#A077D0";
      } else if (bmi > 40) {
        this.activeColor = "#F56E69";
        BMIExplain = "极度肥胖(大于40)";
      } else {
        BMIExplain = "--";
        this.activeColor = "#DADADA";
      }
      return BMIExplain;
    }
  }
</script>
<style lang='scss' scoped>
  .recovery_report {
    background-color: #fff;
    height: 100%;
    position: relative;
    overflow-x: hidden;
    padding-top: $header-height;
    > .header {
      width: 100%;
      height: $header-height;
      background-color: $baseGreen;
      color: #fff;
      text-align: center;
      font-size: 1.5rem;
      line-height: $header-height;
      position: absolute;
      top: 0%;
      left: 0;
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
      height: 100%;
      box-sizing: border-box;
      overflow: hidden;
      overflow-y: scroll;
      h4 {
        text-align: center;
        font-size: 1.24rem;
        color: #7a7979;
        font-weight: bold;
        margin-top: 2rem;
      }
      > h1 {
        text-align: center;
        font-size: 2rem;
        color: #232323;
      }
      > .hospital {
        color: #49a84d;
        font-size: 1.5rem;
        margin: 0.165rem;
        text-align: center;
      }
      > .cut_off {
        width: 100%;
        margin: 1rem 0;
      }
      padding: 1rem;
      > table {
        width: 100%;
        border-top: 0.04rem solid #4a4a4a;
        border-left: 0.04rem solid #4a4a4a;
        tr {
          > th,
          > td {
            vertical-align: middle;
            text-align: center;
            border-bottom: 0.04rem solid #4a4a4a;
            border-right: 0.04rem solid #4a4a4a;
            font-size: 1.165rem;
            color: #232323;
          }
          > td {
            text-align: left;
            padding: 0.415rem 0 0.415rem 1rem;
            color: #4a4a4a;
            > div {
              display: inline-block;
              padding: 0 1rem;
              height: 4.04rem;
              line-height: 4.04rem;
              font-size: 1.5rem;
              color: #e69717;
              font-family: "STXingkai";
              background: url("../assets/doctor_sign.png") no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
      > .patient {
        margin-top: 2rem;
        border-radius: 0.5rem;
        border: 1px solid $baseGreen;
        overflow: hidden;
        padding: 1rem 0.46rem;
        > h2 {
          text-align: center;
          color: #646464;
          font-size: 1.5rem;
        }
        > .patient_info {
          display: flex;
          justify-content: space-between;
          > div {
            text-align: center;
            width: 19%;
            height: 5rem;
            border: 1px solid #49a84d;
            border-radius: 5px;
            > .info_t {
              width: 100%;
              height: 2rem;
              // line-height: 2.5rem;
              padding: 0.25rem 0;
              background-color: $baseGreen;
            }
            > .info_b {
              height: 3rem;
              display: table-cell;
              vertical-align: middle;
              text-align: center;
              width: inherit;
              // line-height: 3rem;
            }
          }
        }
        > .body_cell {
          text-align: left;
          margin: 1rem 0;
          font-size: 1.25rem;
          color: #7a7979;
          vertical-align: middle;
          > span {
            display: inline-block;
            height: 1.25rem;
            width: 1.25rem;
            vertical-align: text-top;
            margin-right: 0.45rem;
            font-size: 1.25rem;
          }
        }
        > .body_img {
          width: 100%;
          text-align: center;
          position: relative;
          > img {
            width: 60%;
          }
          > .bmi {
            position: absolute;
            top: 30%;
            right: 25%;
            font-size: 1.5rem;
          }
        }
      }
      > .goal,
      > .target {
        width: 100%;
        border: 1px solid #56b05a;
        margin-top: 2rem;
        > h3 {
          padding: 0.625rem;
          background-color: $baseGreen;
          color: #fff;
          font-size: 1.5rem;
          font-weight: bold;
          text-align: center;
        }
        > div {
          padding: 0.71rem 1rem;
          color: $tableFontBorder;
          font-size: 1.25rem;
        }
      }
    }
  }
</style>