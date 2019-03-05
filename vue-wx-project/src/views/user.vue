<template>
  <div class="user">
    <cube-popup
      type="my-popup"
      ref="myPopup"
      content=" <cube-loading :size='40'></cube-loading>"
    >

    </cube-popup>
    <div class="header">
      我的
    </div>
    <!-- 用户 -->
    <div
      class="userphone"
      @click="goMyInfo"
    >
      <img
        :src="headImgUrl"
        alt=""
      >
      <div
        v-cloak
        class="tel"
      >
        {{ changePhone(userPhone)}}
      </div>
      <div class="next">
        <img
          src="../assets/ic_searh_next@2x.png"
          alt=""
        >
      </div>
    </div>
    <div
      v-if="noFamily"
      class="families"
    >
      <div class="no-family">
        暂无关注亲属
      </div>
    </div>
    <!-- 亲属列表 -->
    <div
      class="families"
      v-else
    >
      <h5>亲属列表</h5>
      <div class="scroll-list-wrap">
        <!-- <cube-scroll
          ref="scroll"
          :data="families"
          class="scroll-list-inner-wrap"
          nest-mode="native"
        > -->
        <ul
          class="items-wrapper"
          ref="familyLists"
        >
          <li
            v-for="(item,index)  in families"
            :key="item.id"
            class="item-item border-1px family"
            @touchstart="onTouchStart(item,$event)"
            @touchend="onTouchEnd(item,index,$event)"
            @touchmove="onTouchMove(item,$event)"
            @click="goFamilyInfo(item.id)"
          >
            <div class="item-content">
              <span
                v-cloak
                class="name"
              >{{item.name}}</span><span class="sex">
                <svg
                  v-if="item.sex==='0'"
                  width="1.6rem"
                  height="1.6rem"
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
                  width="1.6rem"
                  v-if="item.sex==='1'"
                  height="1.6rem"
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
              </span>
              <div
                v-cloak
                class="phone"
              >
                {{changePhone(item.phone)}}
              </div>
            </div>
            <div
              @click.stop="changeWord(item)"
              class="cancel"
              :class="{showCancel:isShowCancel === index}"
            >
              <div
                class="want-cancel"
                v-if="CancelWords"
              >取消关注</div>
              <div
                class="sure-cancel"
                v-else
              >确认取消关注</div>
            </div>
          </li>
        </ul>
        <!-- </cube-scroll> -->
      </div>
    </div>
    <!-- 添加亲属 -->
    <div class="add-famliy">
      <add-famliy
        @qrcode="getQrCode"
        :userId='userid'
      ></add-famliy>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import Common from "../common/common";
  import AddFamliy from "@/components/addFamily.vue";
  import axios from "axios";
  import ls from "local-storage";
  @Component({
    components: {
      AddFamliy
    },
    name: "user"
  })
  export default class UserComponent extends Vue {
    public userPhone: string = "";
    public families: Patient.PatientInfo[] = [];
    public headImgUrl: string = "";
    public userid: string = "";
    // ----滑动相关----
    public timer: any; // 判断长按事件的定时器
    public isLongtouch?: boolean; // 判断是长按事件;true:是 false:不是
    public startX: number = 0; // 开始触摸的位置x
    public startY: number = 0; // 开始触摸的位置y
    public moveX: number = 0; // 滑动时的位置x
    public moveY: number = 0; // 滑动时的位置y
    public disX: number = 0; // 移动距离,
    // ------亲属列表配置项----
    public options?: any;
    // ---ui--
    public isShowCancel?: number = 10000;
    public CancelWords: boolean = true;
    public loadding: boolean = true;
    public noFamily: boolean = false;
    isFirst: boolean = true; //是第一次进入防止请求多次接口
    /**
     * 钩子
     */
    public created() {
      this.Initialize();
    }
    /**
     * dom加载完成钩子
     */
    public mounted() {}
    activated() {
      if (!this.isFirst) {
        console.log(this.isFirst);
        this.$store.state.isBack = false;
        this.$server.getPatient(this.userid).then((res: any) => {
          this.families = res.result;
        });
      }
    }
    /**
     * 缓存的组件离开后调用
     */
    deactivated() {
      this.isFirst = false;
    }
    /**
     *  初始化
     */
    public Initialize() {
      // // 页面加载蒙层
      // const myPopup: any = this.$refs.myPopup;
      // myPopup.show();
      this.userid = this.$route.params.id;
      axios
        .all([
          this.$server.getPatient(this.userid),
          this.$server.getUser(this.userid)
        ])
        .then(
          axios.spread((Patient: Patient.PatientList, User: any) => {
            // myPopup.hide();
            // 两个请求现在都执行完成
            this.families = Patient.result;
            this.noFamily = this.families.length === 0 ? true : false;
            this.headImgUrl = ls.get("headImg");
            this.userPhone = User.phone;
            this.loadding = false;
          })
        );
    }
    /**
     * 点击查看患者详情
     */
    public goFamilyInfo(id: number) {
      const selectedFamily = this.families.find(x => x.id === id);
      ls.set("selectedFamily", selectedFamily);
      this.$router.push({ path: `/kinsfolkinfo/${id}` });
    }
    /**
     * 用户信息详情
     */
    public goMyInfo() {
      this.$router.push({ path: `/userinfo/${this.userid}` });
    }
    /**
     * 转换手机号码格式
     */
    public changePhone(input: number) {
      return Common.change(input.toString());
    }
    public onTouchStart(item: any, event: TouchEvent): void {
      // 将长按状态初始化 false
      this.isLongtouch = false;

      this.timer = setTimeout(() => {
        // 定时 1.5s内未清定时器即为长按事件
        this.isLongtouch = true;
        if (this.isLongtouch) {
          // console.log(this.$refs.list)
          // this.isalldel = false;
          // this.$refs.list.scrollTop = scrollTop;
        }
      }, 1500);
      const familyLists = this.$refs.familyLists;
      this.startX = event.targetTouches[0].clientX;
      this.startY = event.targetTouches[0].clientY;
      this.moveY = event.targetTouches[0].clientY;
      this.moveX = event.targetTouches[0].clientX;
    }
    public onTouchMove(item: any, event: TouchEvent): void {
      clearTimeout(this.timer);
      this.isLongtouch = false;
      this.moveX = event.targetTouches[0].clientX;
      this.moveY = event.targetTouches[0].clientY;
    }
    public onTouchEnd(item: any, index: number, event: Event): void {
      clearTimeout(this.timer);
      if (!this.isLongtouch) {
        if (
          this.moveX - this.startX > 20 &&
          Math.abs(this.moveY - this.startY) < 30
        ) {
          this.isShowCancel = 100000;
        } else if (
          this.moveX - this.startX < -20 &&
          Math.abs(this.moveY - this.startY) < 30
        ) {
          this.CancelWords = true;
          this.isShowCancel = index;
        }
      }
    }
    /**
     * 解绑亲属
     */
    public changeWord(item: any) {
      if (!this.CancelWords) {
        this.$server.delPaitient(+this.userid, item.id).then(res => {
          if (res.code == "C200") {
            let index = this.families.findIndex(e => e.id === item.id);
            this.families.splice(index, 1);
            console.log(this.families);
            this.noFamily = this.families.length === 0 ? true : false;
            this.isShowCancel = 100000;
          }
        });
      } else {
        // 切换文字
        this.CancelWords = false;
      }

      console.log(item);
    }
    /**
     * 扫码关注亲属后回调
     */
    public getQrCode() {
      this.$server.getPatient(this.userid).then((res: any) => {
        this.families = res.result;
      });
    }
  }
</script>
<style lang='scss' scoped>
  * {
    overflow: hidden;
  }
  .user {
    width: 100%;
    height: 100%;
    position: relative;
    padding-bottom: 7.15rem;
    display: flex;
    flex-direction: column;
    > .header {
      background-color: $baseGreen;
      width: 100%;
      height: 3.675rem;
      font-size: 1.5rem;
      line-height: 3.675rem;
      text-align: center;
      font-weight: normal;
      color: #fff;
      position: relative;
    }
    > .userphone {
      width: 100%;
      height: 4.5rem;
      line-height: 4.5rem;
      background-color: #fff;
      text-align: left;
      overflow: hidden;
      vertical-align: middle;
      position: relative;
      > img {
        position: absolute;
        top: 50%;
        left: 1.5rem;
        transform: translateY(-50%);
        width: 3rem;
        height: 3rem;
        // vertical-align: middle;
        border-radius: 50%;
      }
      > .tel {
        display: inline-block;
        height: 100%;
        line-height: 4.5rem;
        overflow: hidden;
        font-size: 1.5rem;
        margin-left: 5.5rem;
      }
      > .next {
        position: absolute;
        top: 50%;
        right: 1.5rem;
        transform: translateY(-50%);
        width: 3rem;
        height: 3rem;
        // vertical-align: middle;
        border-radius: 50%;
        > img {
          width: 100%;
          height: 100%;
        }
      }
    }
    > .families {
      padding-top: 0.79rem;
      background-color: #f3f3f3;
      flex: 1;
      display: flex;
      flex-direction: column;
      > h5 {
        color: $basefontcolor;
        font-size: 1.25rem;
        margin: 0.5rem 1rem;
        height: 2rem;
        overflow: visible;
      }
      > .scroll-list-wrap {
        flex: 1;
        overflow-y: scroll;
        ul {
          > .family {
            background-color: #fff;
            padding: 1.29rem 0 1.04rem 2rem;
            margin-top: 1px;
            position: relative;
            overflow-x: hidden;

            > .item-content {
              > .name {
                font-size: 1.25rem;
                color: $basefontcolor;
              }
              > .phone {
                // margin-top: 0.415rem;
                color: #979797;
              }
              > .sex {
                display: inline-block;
                vertical-align: middle;
                // height: 100%;
                margin-left: 0.51rem;
              }
            }
            > .cancel {
              background-color: $baseRed;
              width: 10rem;
              height: 100%;
              position: absolute;
              top: 0%;
              right: 0;
              transform: translateX(100%);
              transition: all 1s;
              z-index: 10;
              text-align: center;
              color: #fff;
              > div {
                width: 100%;
                position: absolute;
                top: 50%;
                left: 0;
                text-align: center;
                font-size: 1.2rem;
                transform: translateY(-50%);
              }
            }
            > .showCancel {
              transform: translateX(0);
            }
          }
        }
      }
      > .no-family {
        width: 100%;
        position: absolute;
        top: 40%;
        text-align: center;
      }
    }
    > .add-famliy {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
</style>