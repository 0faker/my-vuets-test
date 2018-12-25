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
        src="../assets/logo.png"
        alt=""
      >
      <div class="tel">
        {{ changePhone(userPhone)}}
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
              <span class="name">{{item.name}}</span><span class="sex"></span>
              <div class="phone">
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
import { Component, Vue } from 'vue-property-decorator';
import Common from '../common/common';
import AddFamliy from '@/components/addFamily.vue';
import axios from 'axios';
import ls from 'local-storage';
@Component({
  components: {
    AddFamliy,
  },
})
export default class UserComponent extends Vue {
    userPhone: string = '';
    families: Patient.PatientInfo[] = [];
    imgUrl: string = '';
    userid: string = '';
  // ----滑动相关----
    timer: any; // 判断长按事件的定时器
    isLongtouch?: boolean; // 判断是长按事件;true:是 false:不是
    startX: number = 0; // 开始触摸的位置x
    startY: number = 0; // 开始触摸的位置y
    moveX: number = 0; // 滑动时的位置x
    moveY: number = 0; // 滑动时的位置y
    disX: number = 0; // 移动距离,
  // ------亲属列表配置项----
    options?: any;
  // ---ui--
    isShowCancel?: number = 10000;
    CancelWords: boolean = true;
    loadding: boolean = true;
    noFamily: boolean = false;
  /**
   * 钩子
   */
    created() {}
  /**
   * dom加载完成钩子
   */
    mounted() {
    this.Initialize();
  }
  /**
   *  初始化
   */
    Initialize() {
    // 页面加载蒙层
    const myPopup: any = this.$refs.myPopup;
    myPopup.show();
    this.userid = this.$route.params.id;
    axios
      .all([
        this.$server.getPatient(this.userid),
        this.$server.getUser(this.userid),
      ])
      .then(
        axios.spread((Patient: Patient.PatientList, User: any) => {
          myPopup.hide();
          // 两个请求现在都执行完成
          this.families = Patient.result;
          this.noFamily = this.families.length === 0 ? true : false;
          this.userPhone = User.phone;
          this.loadding = false;
        }),
      );
  }
  /**
   * 点击查看患者详情
   */
    goFamilyInfo(id: number) {
    const selectedFamily = this.families.find((x) => x.id === id);
    console.log(selectedFamily);
    ls.set('selectedFamily', selectedFamily);
    this.$router.push({ path: `/kinsfolkinfo/${id}` });
  }
  /**
   * 用户信息详情
   */
    goMyInfo() {
    this.$router.push({ path: `/userinfo/${this.userid}` });
  }
  /**
   * 转换手机号码格式
   */
    changePhone(input: number) {
    return Common.change(input.toString());
  }
    onTouchStart(item: any, event: TouchEvent): void {
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
    onTouchMove(item: any, event: TouchEvent): void {
    clearTimeout(this.timer);
    this.isLongtouch = false;
    this.moveX = event.targetTouches[0].clientX;
    this.moveY = event.targetTouches[0].clientY;
  }
    onTouchEnd(item: any, index: number, event: Event): void {
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
   * 切换取消关注文字
   */
    changeWord(item: any) {
    this.CancelWords = false;
    console.log(item);
  }
  /**
   * 扫码关注亲属后回调
   */
    getQrCode() {
    console.log('qrcode');
    // this.getUser();
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
      > img {
        width: 3rem;
        height: 3rem;
        // vertical-align: middle;
        border-radius: 50%;
        margin: 0.725rem 1rem 0.725rem 1.5rem;
      }
      > div {
        display: inline-block;
        height: 100%;
        overflow: hidden;
        font-size: 1.5rem;
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
                margin-top: 0.415rem;
                color: #979797;
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
              font-size: 1.5rem;
              > div {
                width: 100%;
                position: absolute;
                top: 50%;
                left: 0;
                text-align: center;
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