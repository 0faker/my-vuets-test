<template>
  <div
    v-if="loadding"
    class="userinfo"
  >
    <!-- 标题 -->
    <div class="header">
      <div
        class="back"
        @click="back"
      > <img
          src="../assets/back.png"
          alt=""
          srcset=""
        ></div>
      <div class="title">个人信息</div>
    </div>
    <ul class="userinfos">
      <li @click="modifyUserName">
        <div
          class="weui-cell weui-cell_access"
          href="javascript:;"
        >
          <div class="weui-cell__hd">
            <svg
              width="1.25rem"
              height="1.5rem"
              viewBox="0 0 640 640"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <!-- Generator: Sketch 49 (51002) - http://www.bohemiancoding.com/sketch -->
              <title>report_personal_name_green</title>
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
                  transform="translate(-2142.000000, -4381.000000)"
                  fill="#0ABA08"
                  fill-rule="nonzero"
                >
                  <g
                    id="report_personal_name_green"
                    transform="translate(2142.000000, 4381.000000)"
                  >
                    <path
                      d="M371.280937,312 C436.056856,290.666667 481.939799,230.666667 481.939799,160 C481.939799,72 409.06689,0 320,0 C230.93311,0 158.060201,72 158.060201,160 C158.060201,230.666667 203.943144,290.666667 268.719063,312 C154.011706,334.666667 20,430.666667 20,546.666667 C20,598.666667 61.8344479,640 114.464883,640 L525.535117,640 C578.165551,640 619.999999,598.666667 620,546.666667 C620,430.666667 485.988294,334.666667 371.280937,312 Z M189.063545,160 C189.063545,86.6666669 245.777592,30.6666669 320,30.6666669 C394.222408,30.6666669 450.936455,86.6666669 450.936455,160 C450.936455,233.333333 394.222408,289.333333 320,289.333333 C245.777592,289.333333 189.063545,233.333333 189.063545,160 Z M114.464883,609.333333 C76.6789304,609.333333 51.0033447,584 51.0033447,546.666667 C51.0033447,424 205.292642,347.333334 320,347.333333 C434.707358,347.333332 588.996655,424 588.996655,546.666667 C588.996655,584 563.32107,609.333334 525.535117,609.333333 L114.464883,609.333333 Z"
                      id="Shape"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div class="weui-cell__bd">
            <p>姓名</p>
          </div>
          <div
            class="weui-cell__ft"
            :class="{noContent:userInfos.name==='' }"
          >{{userInfos.name||'未填写'}}</div>
        </div>
      </li>
      <li @click="showSexPicker">
        <div
          class="weui-cell weui-cell_access"
          href="javascript:;"
        >
          <div class="weui-cell__hd">
            <svg
              width="1.25rem"
              height="1.5rem"
              viewBox="0 0 640 640"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <!-- Generator: Sketch 49 (51002) - http://www.bohemiancoding.com/sketch -->
              <title>report_personal_gender_green</title>
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
                  transform="translate(-2910.000000, -5561.000000)"
                  fill="#4CAF50"
                  fill-rule="nonzero"
                >
                  <g
                    id="report_personal_gender_green"
                    transform="translate(2910.000000, 5561.000000)"
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
              </g>
            </svg>
          </div>
          <div class="weui-cell__bd">
            <p>性别</p>
          </div>
          <div class="weui-cell__ft">{{changeSex(userInfos.sex)}}</div>
        </div>
      </li>
      <li @click="showDatePicker">
        <div
          class="weui-cell weui-cell_access"
          href="javascript:;"
        >
          <div class="weui-cell__hd">
            <svg
              width="1.25rem"
              height="1.5rem"
              viewBox="0 0 640 640"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
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
                  id="Artboard"
                  transform="translate(-2270.000000, -3300.000000)"
                  fill="#0ABA08"
                >
                  <g
                    id="report_personal_year"
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
            </svg>
          </div>
          <div class="weui-cell__bd">
            <p>生日</p>
          </div>
          <div class="weui-cell__ft">{{userInfos.birthday?getBirthday(userInfos.birthday):'未填写'}}</div>

        </div>
      </li>
      <li @click="modifyUserPhone">
        <div
          class="weui-cell weui-cell_access"
          href="javascript:;"
        >
          <div class="weui-cell__hd"> <svg
              width="1.25rem"
              height="1.5rem"
              viewBox="0 0 26 34"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <!-- Generator: Sketch 49 (51002) - http://www.bohemiancoding.com/sketch -->
              <title>me_personal_phone_icon</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g
                id="交互设计"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g
                  id="个人信息"
                  transform="translate(-24.000000, -574.000000)"
                >
                  <g
                    id="新手引导"
                    transform="translate(0.000000, 540.000000)"
                  >
                    <g
                      id="me_personal_phone_icon"
                      transform="translate(24.000000, 34.000000)"
                    >
                      <rect
                        id="Rectangle-2"
                        fill="#4CAF50"
                        x="8"
                        y="4"
                        width="10"
                        height="1.5"
                        rx="0.75"
                      ></rect>
                      <circle
                        id="Oval"
                        stroke="#4CAF50"
                        stroke-width="1.5"
                        cx="13"
                        cy="26"
                        r="3"
                      ></circle>
                      <rect
                        id="Rectangle"
                        stroke="#4CAF50"
                        stroke-width="2"
                        x="1"
                        y="1"
                        width="24"
                        height="32"
                        rx="3"
                      ></rect>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div class="weui-cell__bd">
            <p>手机号</p>
          </div>
          <div class="weui-cell__ft">{{changePhone(userInfos.phone)}}</div>
        </div>
      </li>
      <li class="bmi">
        <div>BMI:{{computedBMI()}}</div>
      </li>
      <li @click="showHeightPicker">
        <div
          class="weui-cell weui-cell_access"
          href="javascript:;"
        >
          <div class="weui-cell__hd"> <svg
              width="1.25rem"
              height="1.5rem"
              viewBox="0 0 640 640"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <!-- Generator: Sketch 49 (51002) - http://www.bohemiancoding.com/sketch -->
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
                  id="Artboard"
                  transform="translate(-2590.000000, -6728.000000)"
                  fill="#0ABA08"
                  fill-rule="nonzero"
                >
                  <g
                    id="report_personal_height"
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
            </svg>
          </div>
          <div class="weui-cell__bd">
            <p>身高</p>
          </div>
          <div class="weui-cell__ft">{{userInfos.height?userInfos.height+"cm":'未填写'}}</div>
        </div>
      </li>
      <li @click="showWeightPicker">
        <div
          class="weui-cell weui-cell_access"
          href="javascript:;"
        >
          <div class="weui-cell__hd">
            <svg
              width="1.25rem"
              height="1.5rem"
              viewBox="0 0 640 640"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <!-- Generator: Sketch 49 (51002) - http://www.bohemiancoding.com/sketch -->
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
                  id="Artboard"
                  transform="translate(-2590.000000, -8021.000000)"
                  fill="#0ABA08"
                >
                  <g
                    id="report_personal_weight"
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
          </div>
          <div class="weui-cell__bd">
            <p>体重</p>
          </div>
          <div class="weui-cell__ft">{{userInfos.weight?userInfos.weight+"kg":'未填写'}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  import moment from "moment";
  import Common from "../common/common";
  import { userInfos } from "../entity/user";
  @Component
  export default class UserInfo extends Vue {
    userId: string; // 用户id
    userInfos: userInfos;
    datePicker: any; // 时间选择器
    sexPicker: any; // 性别选择器
    heightPicker: any; // 身高选择器
    heightArray: object[] = []; // 身高对象数组
    weightPicker: any = null; // 体重选择器
    weightArray: object[] = []; // 体重对象数组
    // ----ui----------
    // isName:
    loadding: boolean = false;
    constructor() {
      super();
      this.userId = "";
      this.userInfos = new userInfos();
    }
    /**
     * 获取用户详细信息
     */
    created() {
      this.userId = this.$route.params.id;
      this.getUser();
    }
    mounted() {
      for (let i = 0; i < 250; i++) {
        this.heightArray.push({ text: i + "cm", value: i });
        this.weightArray.push({ text: i + "kg", value: i });
      }
    }
    back() {
      this.$store.state.isBack = true;
      this.$router.back();
    }
    /**
     * 获取用户信息
     */
    getUser() {
      this.$server.getUser(this.userId).then((res: userInfos) => {
        console.log(res);
        this.loadding = true;
        this.userInfos = Object.assign({}, this.userInfos, res);
      });
    }
    /**
     * 转换性别
     */
    changeSex(input: string) {
      return Common.getSex(input);
    }
    /**
     * 生日格式
     */
    getBirthday(input: number) {
      return moment(input).format("YYYY-MM-DD");
    }
    /**
     * 计算BMI
     */
    computedBMI() {
      if (this.userInfos.height && this.userInfos.weight) {
        return Common.computedBMI(this.userInfos.height, this.userInfos.weight);
      }
    }
    /**
     * 修改用户姓名
     */
    modifyUserName() {
      this.$router.push({
        path: "/modifyusername/" + this.userId,
        query: {
          username: this.userInfos.name
        }
      });
    }
    /**
     * 更换手机号
     */
    modifyUserPhone() {
      this.$router.push({
        path: "/modifyuserphone/" + this.userId,
        query: {
          userphone: this.userInfos.phone
        }
      });
    }
    /**
     * 生日选择器
     */
    showDatePicker() {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: "选择生日",
          min: new Date(1920, 1, 1),
          max: new Date(2020, 9, 20),
          value: new Date(this.userInfos.birthday),
          onSelect: (date: Date, selectedVal: any, selectedText: string) => {
            // 确定
            this.userInfos.birthday = date.getTime();
            this.modify();
          },
          onCancel: () => {
            // 取消
          },
          columnCount: 3,
          zIndex: 1000,
          format: {
            year: "YYYY年",
            month: "MM月",
            date: "DD 日"
          }
        });
      }
      this.datePicker.show();
    }
    /**
     * 性别选择器
     */
    showSexPicker() {
      if (!this.sexPicker) {
        this.sexPicker = this.$createPicker({
          title: "选择性别",
          selectedIndex: [this.userInfos.sex],
          data: [
            [
              {
                text: "男",
                value: "0"
              },
              {
                text: "女",
                value: "1"
              }
            ]
          ],
          onSelect: (
            selectedVal: any,
            selectedIndex: number,
            selectedText: string
          ) => {
            // 确定
            this.userInfos.sex = selectedVal[0];
            this.sexPicker = null;
            this.modify();
          },
          onCancel: () => {
            // 取消
            this.sexPicker = null;
          }
        });
        this.sexPicker.show();
      }
    }
    /**
     * 身高选择器
     */
    showHeightPicker() {
      if (!this.heightPicker) {
        this.heightPicker = this.$createPicker({
          title: "选择身高",
          selectedIndex: [this.userInfos.height],
          data: [this.heightArray],
          onSelect: (
            selectedVal: any,
            selectedIndex: number,
            selectedText: string
          ) => {
            // 确定
            this.userInfos.height = selectedVal[0];
            this.heightPicker = null;
            this.modify();
          },
          onCancel: () => {
            // 取消
            this.heightPicker = null;
          }
        });
        this.heightPicker.show();
      }
    }
    /**
     * 体重选择器
     */
    showWeightPicker() {
      if (!this.weightPicker) {
        console.log(224);
        this.weightPicker = this.$createPicker({
          title: "选择体重",
          selectedIndex: [this.userInfos.weight],
          data: [this.weightArray],
          onSelect: (
            selectedVal: any,
            selectedIndex: number,
            selectedText: string
          ) => {
            // 确定
            this.userInfos.weight = selectedVal[0];
            this.weightPicker = null;
            this.modify();
          },
          onCancel: () => {
            // 取消
            this.weightPicker = null;
          }
        });
        this.weightPicker.show();
      }
    }
    /**
     * 确定修改
     */
    modify() {
      this.$server
        .modify(
          this.userId,
          this.userInfos.name,
          this.userInfos.sex,
          this.getBirthday(this.userInfos.birthday),
          this.userInfos.height,
          this.userInfos.weight
        )
        .then((res: BaseEntity.BaseEntityResult) => {});
    }
    /**
     * 手机号格式
     */
    changePhone(input: string) {
      return Common.change(input);
    }
  }
</script>
<style lang='scss' scoped>
  .userinfo {
    min-height: 100%;
    > .header {
      height: $header-height;
      background-color: $baseGreen;
      text-align: center;
      > .title {
        height: 100%;
        color: #fff;
        font-size: 1.5rem;
        line-height: $header-height;
      }
    }
    > .userinfos {
      padding-top: 1rem;
      > li {
        background: #fff;
        box-shadow: 1px 1px 5px 0 rgba(76, 175, 80, 0.2);
        > div {
          > .weui-cell__hd {
            line-height: 1.25rem;
          }
          > .weui-cell__bd {
            > p {
              padding-left: 0.4rem;
              font-size: 1.5rem;
              color: #858383;
            }
          }
          > .weui-cell__ft {
            color: #858383;
            font-size: 1.25rem;
          }
          > .no-content {
            color: $baseGreen;
          }
        }
      }
      > .bmi {
        background: transparent;
        > div {
          padding: 1rem 1rem 0.33rem;
          font-size: 1.5rem;
          font-family: "STHeitiTC-Medium";
          color: #737373;
        }
      }
    }
  }
</style>