import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './base.scss';
import './calendar.scss';
import './indexList.scss';
import './cube-ui';
import 'weui';
import {
  /* eslint-disable no-unused-vars */
  Dialog,
  createAPI,
  DatePicker,
  Picker, IndexList,
} from 'cube-ui';
Vue.use(DatePicker, Picker, IndexList);

import Server from './fetch/fetch';
import Common from './common/common';
import VueRouter from 'vue-router';
// import VueQuickLoadmore from 'vue-quick-loadmore';
// declare var VueQuickLoadmore: any;

// Vue.use(VueQuickLoadmore);

Vue.config.productionTip = false;
Vue.prototype.$server = Server;
Vue.prototype.$common = Common;
router.beforeEach((to, from, next) => {


  if (to.meta.title) {
    document.title = to.meta.title;
  }

  next();
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
