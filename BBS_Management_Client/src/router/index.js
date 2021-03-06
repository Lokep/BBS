import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login';
import Home from '@/views/Home';

Vue.use(Router)

const router = new Router({
  mode: "history",
  base: 'manage',
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
          name: "用户管理",
          meta: {title: "用户管理"}
        }, {
          path: '/articleManage',
          component: resolve => require(['@/views/articleManage.vue'], resolve),
          name: "文章管理",
          meta: {title: "文章管理"}
        }, {
          path: '/activityManage',
          component: resolve => require(['@/views/activityManage.vue'], resolve),
          name: "活动管理",
          meta: {title: "活动管理"},
          children: [
            {
              path: 'create',
              name: "创建活动",
              component: resolve => require(['@/views/activity/page.vue'], resolve)
            }
          ]
        }, {
          path: '/topicManage',
          component: resolve => require(['@/views/topicManage.vue'], resolve),
          name: "话题管理",
          meta: {title: "话题管理"},
          children: [
            {
              path: 'create',
              name: "创建话题",
              component: resolve => require(['@/views/topic/page.vue'], resolve)
            }
          ]
        }, {
          path: '/dataAnalysis',
          component: resolve => require(['@/views/dataAnalysis.vue'], resolve),
          name: "数据分析",
          meta: {title: "数据分析"}
        }, {
          path: '/adminManage',
          component: resolve => require(['@/views/adminManage.vue'], resolve),
          name: "管理员管理",
          meta: {title: "管理员管理"},
          children: [
            {
              path: 'create',
              name: "添加管理员",
              component: resolve => require(['@/views/admin/page.vue'], resolve)
            }, {
              path: 'update',
              name: "修改信息",
              component: resolve => require(['@/views/admin/page.vue'], resolve)
            }
          ]
        }, {
          path: '/404',
          component: resolve => require(['@/views/404.vue'], resolve),
          name: "404",
          meta: {title: '404'}
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
});

// 路由守卫,每次路由跳转都会执行,用来判断是否登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    let data = localStorage.getItem("user");
    // 不存在data,跳转登录页
    if (!data) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      // 否则解析data
      data = JSON.parse(data);
      // 判断locastorage是否过时
      if (data && Date.now() - data.date <= 2 * 60 * 60 * 1000) {
        // 管理员页面需要权限进入
        if (to.name === "管理员管理") {
          if (data.power == 1) {
            next();
          } else {
            next({
              path: '/404'
            })
          }
        } else {
          next()
        }
      } else {
        // 清空locastorage, 跳转登录页
        localStorage.setItem("user", "");
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        })
      }
    }
  } else {
    next();
  }
});

export default router;
