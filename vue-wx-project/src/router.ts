import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/user/:id',
      name: 'user',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/user.vue'),
      meta: {
        keepAlive: true,
        title: '我的',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/login.vue'),
      meta: {
        title: '登录',
      },
    },
    {
      path: '/addfamilybyphone/:id',
      name: 'addFamilyByPhone',
      component: () => import(/* webpackChunkName: "about" */ './views/addFamilyByPhone.vue'),
      meta: {
        title: '验证手机号码添加亲属',
      },
    },
    {
      path: '/userinfo/:id',
      name: 'userinfo',
      component: () => import(/* webpackChunkName: "about" */ './views/userInfo.vue'),
      meta: {
        title: '个人信息',
      },
    },
    {
      path: '/modifyusername/:id',
      name: 'modifyUserName',
      component: () => import(/* webpackChunkName: "about" */ './views/modifyUserName.vue'),
      meta: {
        title: '设置姓名',
      },
    },
    {
      path: '/modifyuserphone/:id',
      name: 'modifyUserPhone',
      component: () => import(/* webpackChunkName: "about" */ './views/modifyUserPhone.vue'),
      meta: {
        title: '更换手机号',
      },
    },
    {
      path: '/kinsfolkinfo/:id',
      name: 'kinsfolkInfo',
      component: () => import(/* webpackChunkName: "about" */ './views/kinsfolkInfo.vue'),
      meta: {
        title: '亲属详情',
      },
    },
    {
      path: '/cycleprescriptionlists/:id',
      name: 'cycleprescriptionlists',
      component: () => import(/* webpackChunkName: "about" */ './views/cyclePrescriptionLists.vue'),
      meta: {
        title: '康复处方',
      },
    },
    {
      path: '/cycleprescription/:id',
      name: 'cycleprescriptions',
      component: () => import(/* webpackChunkName: "about" */ './views/cyclePrescription.vue'),
      meta: {
        title: '康复处方',
      },
    },
    {
      path: '/dailyprescriptions/:id',
      name: 'dailyprescriptions',
      component: () => import(/* webpackChunkName: "about" */ './views/dailyPrescriptions.vue'),
      meta: {
        title: '康复处方',
      },
    },
    {
      path: '/reportlists/:id',
      name: 'reportLists',
      component: () => import(/* webpackChunkName: "about" */ './views/reportLists.vue'),
      meta: {
        title: '康复报告列表',
      },
    },
    {
      path: '/report/:userid/:recordid',
      name: 'report',
      component: () => import(/* webpackChunkName: "about" */ './views/recoveryReport.vue'),
      meta: {
        title: '康复报告',
      },
    },
    {
      path: '/accomplish/:id',
      name: 'accomplish',
      component: () => import(/* webpackChunkName: "about" */ './views/accomplish.vue'),
      meta: {
        title: '康复记录列表',
      },
    },
    {
      path: '/preventlist/:id',
      name: 'preventList',
      component: () => import(/* webpackChunkName: "about" */ './views/preventList.vue'),
      meta: {
        title: '预防记录列表',
      },
    },
    {
      path: '/assessmentlist/:id',
      name: 'assessmentList',
      component: () => import(/* webpackChunkName: "about" */ './views/assessmentList.vue'),
      meta: {
        title: '监测记录列表',
      },
    },
    {
      path: '/monitorlist/:id',
      name: 'monitorlist',
      component: () => import(/* webpackChunkName: "about" */ './views/monitorList.vue'),
      meta: {
        title: '评价记录列表',
      },
    },
  ],
});
