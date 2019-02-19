/* 补充Vue类型声明 */
import Vue from 'vue';  // 注意要用这一步
// import Server from '../common/fetch/fetch';
declare module 'vue/types/vue' {
 interface Vue {
  $common: any;
  $localStorage: any;
  $server: Server.IServer;
  ChoseMonth: any;
  // pinyin: pinyin.Options;
 }
 interface VueConstructor {
 }
}
