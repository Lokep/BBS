<template>
  <div class="create_page">
    <h2>{{$route.name === "添加管理员" ? "添加新管理员" : "修改信息"}}</h2>
    <el-form class="admin_form" :model="adminForm" label-width="80px">
      <el-form-item label="账号名称">
        <el-input v-model="adminForm.admin" size="small"></el-input>
      </el-form-item>
      <el-form-item label="账户密码">
        <el-input v-model="adminForm.password" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-if="$route.name === '添加管理员'" size="small" type="primary" @click="onSubmit">立即创建</el-button>
        <el-button v-else size="small" type="primary" @click="onUpdate">立即修改</el-button>
        <el-button size="small" @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        adminForm: {}
      }
    },
    mounted() {
      if(this.$route.name === "修改信息") {
        this.adminForm = this.$route.params
      }
    },
    methods: {
      onSubmit() {
        this.$axios.post("/admins", this.adminForm)
          .then(res => {
            if(res.data.code === '200') {
              this.$message(res.data.message);
              this.onCancel()
            }
          })
      },
      onCancel() {
        this.adminForm = {};
        this.$router.go(-1)
      },
      onUpdate() {
        this.$axios.post("/admins/update_info", this.adminForm)
          .then(res => {
            if(res.data.code === '200') {
              this.$message({
                type: "success",
                message: res.data.message + "，请重新登录"
              });
              this.onCancel()
              localStorage.setItem("user", "")
              this.$store.commit("delUserInfo", "")
            }
          })
      }
    }
  }
</script>

<style>
  .admin_form {
    width: 400px;
    margin: 0 auto;
  }

  .create_page h2 {
    text-align: center;
    margin: 30px 0;
  }
  .admin_img {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
