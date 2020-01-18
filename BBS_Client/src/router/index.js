import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/index/index'
const Topics = () => import('@/pages/topics/topics')
const Explore = () => import('@/pages/explore/explore')
const Setting = () => import('@/pages/setting/setting')
const Login = () => import('@/pages/sign/login')
const Register = () => import('@/pages/sign/register')
const Sign = () => import('@/pages/sign/sign')
const ResetPwd = () => import('@/pages/sign/reset-password')
const Editor = () => import('@/pages/editor/editor')
const Collection = () => import('@/pages/collection/collection')
const Hot = () => import('@/pages/hot/hot')
const Personal = () => import('@/pages/personal/personal')
const Article = () => import('@/pages/article/article') 

import STORAGE from '../assets/javascripts/storage'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'index',
        component: Index,
        alias: '/index'
    }, {
        path: '/topics',
        name: 'topics',
        component: Topics
    }, {
        path: '/explore',
        name: 'explore',
        component: Explore
    }, {
        path: '/setting',
        name: 'setting',
        component: Setting
    }, {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            notNeedNav: true
        }
    }, {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            notNeedNav: true
        }
    }, {
        path: '/sign',
        name: 'sign',
        component: Sign,
        meta: {
            notNeedNav: true
        }
    }, {
        path: '/reset-password',
        name: 'reset-password',
        component: ResetPwd,
        meta: {
            notNeedNav: true
        }
    }, {
        path: '/editor',
        name: 'editor',
        component: Editor
    }, {
        path: '/collection',
        name: 'collection',
        component: Collection
    }, {
        path: '/hot',
        name: 'hot',
        component: Hot
    }, {
        path: '/personal',
        name: 'personal',
        component: Personal
    }, {
        path: '/article/:articleID',
        name: 'article',
        component: Article
    }]
})

// navigation-guards


router.beforeEach((to, from, next) => {
    // to: Route: 即将要进入的目标 路由对象
    // from: Route: 当前导航正要离开的路由
    // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

    const loginInfo = STORAGE.GET() //array

    //白名单
    const freeRoute = ['login', 'register', 'reset-password']
    const inFreeRoute = freeRoute.indexOf(to.name)
    if (inFreeRoute < 0 && loginInfo.length == '') {

        next('/login');
    } else if (inFreeRoute >= 0 && loginInfo.length == 1) {
        next('/index');
    } else {
        next()
    }
    console.log(`inFreeRoute:${inFreeRoute}`, `loginInfo:${loginInfo.constructor === Array}`)
        // next()
})

export default router