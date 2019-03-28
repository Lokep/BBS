<template>
  <div>
    <div class="admin_manage" v-if="$route.name === '管理员管理'">
      <div class="search_box">
        <el-input
          class="search_input"
          v-model="search_cont"
          placeholder="请输入活动名称"
          size="medium"
          @keyup.enter.native="onSearch"
        ></el-input>
        <el-button type="primary" size="small" @click="onSearch">搜索</el-button>
      </div>
      <div class="create_btn">
        <el-button type="primary" size="small" @click="createAdmin">添加新管理员</el-button>
      </div>
      <div class="admin_list_box">
        <el-table :data="adminList" border style="width: 100%">
          <el-table-column align="center" header-align="center" prop="admin" label="账户名"></el-table-column>
          <el-table-column align="center" header-align="center" prop="password" label="密码"></el-table-column>
          <el-table-column align="center" header-align="center" label="Action" width="160">
            <template slot-scope="scope">
              <el-button :disabled="scope.row.id === 1" type="danger" size="small"
                         @click="delAdmin(scope.row, scope.$index)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        search_cont: "",
        adminList: []
      };
    },
    mounted() {
        this.getAdminList()
    },
    methods: {
      // 获取管理员列表
      getAdminList() {
        this.$axios.get("/admins")
          .then(res => {
            if (res.data.code === "200") {
              this.adminList = res.data.result
            }
          })
      },
      // 条件搜索
      onSearch() {
        this.$axios.get("/admins", {params: {admin: this.search_cont}})
          .then(res => {
            if (res.data.code === "200" && res.data.result.length !== 0) {
              this.$message({
                type: "success",
                message: res.data.message
              });
              this.adminList = res.data.result;
              this.search_cont = "";
            } else {
              this.$message({
                type: "error",
                message: res.data.message
              })
            }
          })
      },
      // 添加管理员
      createAdmin() {
        this.$router.push({
          name: "添加管理员"
        })
      },
      // 删除管理员
      delAdmin(row, index) {
        this.$confirm('确认删除此管理员?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.get("/admins/del_admin", {params: {id: row.id}})
            .then(res => {
              if (res.data.code === "200") {
                this.$message({
                  type: "success",
                  message: res.data.message
                })
                this.adminList.splice(index, 1)
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    watch: {
      // 监听路由跳转，用作添加管理员后的列表刷新
      $route (to, from) {
        if(to.name === "管理员管理") {
          this.getAdminList()
        }
      }
    }
  };
</script>

<style scoped>
  .search_box {
    float: left;
    margin-bottom: 20px;
  }

  .search_input {
    width: 300px;
  }

  .create_btn {
    float: right;
  }

  .admin_list_box {
    clear: both;
  }
</style>
