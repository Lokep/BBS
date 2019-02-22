<style>
.nav {
  position: fixed;
  top: 0;
  z-index: 10;
  left: 0;
  right: 0;
  min-width: 1032px;
  height: 60px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
.container-width > * {
  float: left;
}
.logo {
  width: 45px;
  height: 45px;
  margin: 5.5px 0;
}
.el-menu--horizontal>.el-menu-item.is-active{
    border-bottom:3px solid #009a61;
}
.el-menu{
    border-right: 0;
    float: left;
}

.el-menu-item{
    float: left;
    overflow: hidden;
}

.nav-user>li{
    float: left;
    margin: 0 20px;
    cursor: pointer;
}
.nav-icon-remind{
    width: 22px;
    height: 22px;
    margin: 16px 0;
}
.nav-icon-message{
    width: 28px;
    height: 28px;
    margin: 13px 0;
}
.head-pic{
    background: #FFFFFF;
    border-radius: 2px;
    width: 30px;
    height: 30px;
    margin: 12px 0;
}
.nav-user-head-pic{
    margin: -10px -45px 0 0!important;
    padding: 5px 0;
}
.nav-icon-user,.nav-icon-setting{
    display: inline-block;
    vertical-align: middle;
    margin-top: -3px;
    width: 16px;
    height: 16px;
}
.nav-icon-setting{
    margin-top: -5px;
    margin-left: -3px;
    width: 22px;
    height: 22px;
}
.nav-user>.nav-question{
    color: #FFFFFF;
    background-color: #0084FF;
    padding: 7px 14px;
    margin: 11px 16px;
    font-size: 14px;
    border-radius: 4px;
}
.nav-unlogged-in *{
    border-bottom: 0!important;
}
</style>
<template>
<div class="nav">
    <div class="container-width ov">
        <img src="../../assets/images/logo.jpg" alt="LOGO" class="logo">
            <!-- :default-active="activeIndex" -->
        <el-menu
            :default-active="$route.path"
            class="el-menu-demo"
            :router=true
            mode="horizontal"
            @select="handleSelect"
        >
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/explore">发现</el-menu-item>
            <el-menu-item index="/topics">话题</el-menu-item>

        </el-menu>
        <ul class="nav-user fr nav-logged-in" v-if="isLogged">
            <router-link tag="li" to="/" class="nav-question">
                去提问
            </router-link>
            <router-link tag="li" to="/">
                <img class="nav-icon-remind" src="../../assets/svgs/remind.svg" alt="">
            </router-link>
            <router-link tag="li" to="/">
                <img class="nav-icon-message" src="../../assets/svgs/message.svg" alt="">
            </router-link>
            <li>
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <img class="head-pic" src="../../assets/images/head-pic.jpg" alt="">
                    </span>
                    <el-dropdown-menu slot="dropdown" class="nav-user-head-pic">
                        <el-dropdown-item>
                            <router-link to="/" tag="div">
                                <img class="nav-icon-user" src="../../assets/svgs/user.svg" alt="">
                                我的主页
                            </router-link>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <router-link to="/setting" tag="div">
                                <img class="nav-icon-setting" src="../../assets/svgs/setting.svg" alt="">
                                设置
                            </router-link>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <router-link to="/" tag="div">
                                <img class="nav-icon-user" src="../../assets/svgs/quit.svg" alt="">
                                退出
                            </router-link>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
        </ul>
        <el-menu v-else class="nav-unlogged-in fr nav-user el-menu-demo" :router=true mode="horizontal" @select="show">
            <el-menu-item index='/login'>登录</el-menu-item>
            <el-menu-item index='/register'>注册</el-menu-item>
        </el-menu>
    </div>
</div>
</template>
<script>

export default {
    data() {
        return {
           isLogged:false 
        };
    },
    components:{
        
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        show(key,keyPath){
            console.log(key,keyPath);
        },
        
        
    },
    mounted() {

    },
    watch: {

    },
    computed: {

    }
};
</script>