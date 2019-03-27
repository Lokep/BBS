<template>
  <div class="header">
    <div class="logo">
      <i class="el-icon-menu"></i>
      <span>后台管理系统</span>
    </div>
    <div class="header_right">
      <div class="btn_bell">
        <router-link to="/tabs">
          <i class="el-icon-bell"></i>
        </router-link>
        <span class="btn-bell-badge" v-if="message"></span>
      </div>
      <div class="user_avatar">
        <img src="../../static/img/head-pic.jpg" alt srcset>
      </div>
      <el-dropdown class="user_name" placement="bottom-start">
        <span class="el-dropdown-link">
          {{admin}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><span @click="updatePwd">修改密码</span></el-dropdown-item>
          <el-dropdown-item><span @click="logout">退出登录</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  props: ["admin"],
  data() {
    return {
      message: true
    };
  },
  methods: {
    logout() {
      localStorage.setItem("user", "");
      this.$store.commit("delUserInfo", "");
      this.$message({
        type: "success",
        message: "退出登录成功"
      });
      this.$router.push("/login")
    },
    updatePwd() {
      let user = localStorage.getItem("user");
      user = JSON.parse(user);
      this.$router.push({
        name: "修改信息",
        params: user
      })
    }
  }
  };
</script>

<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  background: #fff;
  color: rgb(0, 159, 255);
  border-bottom: 1px solid #eee;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}

.header .logo i {
  float: left;
  padding: 0 21px;
  line-height: 70px;
}

.header_right {
  float: right;
  line-height: 70px;
  margin-right: 50px;
}

.btn_bell {
  position: relative;
  float: left;
}

.el-icon-bell {
  color: rgb(0, 159, 255);
}

.btn-bell-badge {
  display: block;
  position: absolute;
  top: 20px;
  right: 2px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: red;
}

.user_avatar {
  float: left;
  width: 35px;
  height: 35px;
  margin: 0 10px 0 20px;
}

.user_avatar img {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  margin-top: 18px;
}

.user_name {
  float: left;
  height: 40px;
  color: rgb(0, 159, 255);
}
</style>

