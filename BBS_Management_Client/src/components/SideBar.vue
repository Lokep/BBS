<!--侧边导航组件-->
<template>
  <div class="side_bar">
    <el-menu :default-active="onRoutes" router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu index="1" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 侧边栏的导航渲染数组
      items: [
        {
          icon: "el-icon-news",
          index: "userManage",
          title: "用户管理",
          hasPower: false
        },
        {
          icon: "el-icon-document",
          index: "articleManage",
          title: "文章管理",
          hasPower: false
        },
        {
          icon: "el-icon-date",
          index: "activityManage",
          title: "活动管理",
          hasPower: false
        },
        {
          icon: "el-icon-service",
          index: "topicManage",
          title: "话题管理",
          hasPower: false
        },
        {
          icon: "el-icon-tickets",
          index: "dataAnalysis",
          title: "数据分析",
          hasPower: false
        },
        {
          icon: "el-icon-mobile-phone",
          index: "adminManage",
          title: "管理员管理",
          hasPower: true
        }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  }
};
</script>

<style scoped>
.side_bar {
  width: 240px;
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}

.side_bar::-webkit-scrollbar {
  width: 0;
}

.side_bar ul {
  height: 100%;
}
</style>
