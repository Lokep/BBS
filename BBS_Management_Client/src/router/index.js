import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'

Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      redirect: '/userManage'
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {requireAuth: true},
      children: [
        {
          path: '/userManage',
          component: resolve => require(['@/views/userManage.vue'], resolve),
          meta: { title: "用户管理" }
        }, {
          path: '/articleManage',
          component: resolve => require(['@/views/articleManage.vue'], resolve),
          meta: { title: "文章管理" }
        }, {
          path: '/activityManage',
          component: resolve => require(['@/views/activityManage.vue'], resolve),
          meta: { title: "活动管理" }
        }, {
          path: '/topicManage',
          component: resolve => require(['@/views/topicManage.vue'], resolve),
          meta: { title: "话题管理" }
        }, {
          path: '/dataAnalysis',
          component: resolve => require(['@/views/dataAnalysis.vue'], resolve),
          meta: { title: "数据分析" }
        }, {
          path: '/adminManage',
          component: resolve => require(['@/views/adminManage.vue'], resolve),
          meta: { title: "管理员管理" }
        }, {
          path: '/404',
          component: resolve => require(['@/views/404.vue'], resolve),
          meta: { title: '404' }
        }
      ]
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
        path: '*',
        redirect: '/404'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    var data = localStorage.getItem('USERINFO');
    // var dataObj = JSON.parse(data) || {};
    // if (data && new Date().getTime() - dataObj.time < 24 * 60 * 60 * 1000) {
    if(data){
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next();
  }
})



export default router;