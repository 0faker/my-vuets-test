import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [

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
      path: '/',
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
        title: '康复处方进度',
      },
    },
    {
      path: '/dailyprescriptions/:id',
      name: 'dailyprescriptions',
      component: () => import(/* webpackChunkName: "about" */ './views/dailyPrescriptions.vue'),
      meta: {
        title: '康复日处方',
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
      path: '/accomplishlist/:id',
      name: 'accomplishList',
      component: () => import(/* webpackChunkName: "about" */ './views/accomplishList.vue'),
      meta: {
        title: '康复记录列表',
      },
    },
    {
      path: '/:patientid/accomplishinfo/:id',
      name: 'accomplishInfo',
      component: () => import(/* webpackChunkName: "about" */ './views/accomplishInfo.vue'),
      meta: {
        title: '康复记录详情',
      },
    },
    {
      path: '/accomplishedprescription/:id',
      name: 'AccomplishedPrescription',
      component: () => import(/* webpackChunkName: "about" */'./views/accomplishedPrescription.vue'),
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
      path: '/preventinfo/:id',
      name: 'preventInfo',
      component: () => import(/* webpackChunkName: "about" */ './views/preventInfo.vue'),
      meta: {
        title: '预防记录详情',
      },
    },
    {
      path: '/preventplan/:id',
      name: 'preventPlan',
      component: () => import(/* webpackChunkName: "about" */ './views/preventPlan.vue'),
      meta: {
        title: '预防运动方案',
      },
    },
    {
      path: '/assessmentlist/:id',
      name: 'assessmentList',
      component: () => import(/* webpackChunkName: "about" */ './views/assessmentList.vue'),
      meta: {
        title: '评价记录列表',
      },
    },
    {
      path: '/assessmentinfo/:id',
      name: 'assessmentInfo',
      component: () => import(/* webpackChunkName: "about" */ './views/assessmentInfo.vue'),
      meta: {
        title: '评价记录详情',
      },
    },
    {
      path: '/assessmentpreventplan/:id',
      name: 'assessmentpreventPlan',
      component: () => import(/* webpackChunkName: "about" */ './views/assessmentPreventPlan.vue'),
      meta: {
        title: '评价的预防运动方案',
      },
    },
    {
      path: '/monitorlist/:id',
      name: 'monitorlist',
      component: () => import(/* webpackChunkName: "about" */ './views/monitorList.vue'),
      meta: {
        title: '监测记录列表',
      },
    },
    {
      path: '/monitorinfo/:id',
      name: 'monitorInfo',
      component: () => import(/* webpackChunkName: "about" */ './views/monitorInfo.vue'),
      meta: {
        title: '监测记录详情',
      },
    },
    {
      path: '/wxpay/:id',
      name: 'wxpay',
      component: () => import(/* webpackChunkName: "about" */ './views/wxPay.vue'),
      meta: {
        title: '微信代付',
      },
    },
    {
      path: '/wxpayfail',
      name: 'wxPayFail',
      component: () => import(/* webpackChunkName: "about" */ './views/wxPayFail.vue'),
      meta: {
        title: '微信代付失败',
      },
    },
    {
      path: '/wxpaysuccess',
      name: 'wxPaySuccess',
      component: () => import(/* webpackChunkName: "about" */ './views/wxPaySuccess.vue'),
      meta: {
        title: '微信代付成功',
      },
    },
    {
      path: '/choosepatient',
      name: 'choosepatient',
      component: () => import(/* webpackChunkName: "about" */ './views/serviceShop/choosePatient.vue'),
      meta: {
        title: '选择服务',
      },
    },
    {
      path: '/chooseservice',
      name: 'chooseService',
      component: () => import(/* webpackChunkName: "about" */ './views/serviceShop/chooseService.vue'),
      meta: {
        title: '专家医生服务',
      },
    },
    {
      path: '/searchdoctor',
      name: 'searchdoctor',
      component: () => import(/* webpackChunkName: "about" */ './views/serviceShop/searchDoctor.vue'),
      meta: {
        title: '搜索医生',
      },
    },
    {
      path: '/matchdoctor',
      name: 'matchdoctor',
      component: () => import(/* webpackChunkName: "about" */ './views/serviceShop/matchDoctor.vue'),
      meta: {
        title: '搜索医生',
      },
    },
    {
      path: '/threeminutesrecords/:id',      // 监测记录id
      name: 'threeMinutesRecords',
      component: () => import(/* webpackChunkName: "about" */ './views/threeMinutesRecords.vue'),
      meta: {
        title: '3分钟心电记录列表',
      },
    },
    {
      path: '/threeminutesresult/:id',      // 监测记录id
      name: 'threeMinutesResult',
      component: () => import(/* webpackChunkName: "about" */ './views/threeMinutesResult.vue'),
      meta: {
        title: '3分钟心电记录结果',
      },
    },
    {
      path: '/invalidecg',      // 监测记录id
      name: 'invalidEcg',
      component: () => import(/* webpackChunkName: "about" */ './views/invalidEcg.vue'),
      meta: {
        title: '无效心电',
      },
    },
  ],

});
