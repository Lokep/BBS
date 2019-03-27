<template>
  <div class="user_manage">
    <div class="search_box">
      <el-input
        class="search_input"
        v-model.trim="condition"
        placeholder="请输入用户名、手机号、邮箱"
        size="medium"
        @keyup.enter.native="onSearch"
      ></el-input>
      <el-button type="primary" size="small" @click="onSearch">搜索</el-button>
    </div>
    <div class="user_list_box">
      <el-table :data="userList" border style="width: 100%" size="small">
        <!-- <el-table-column fixed prop="date" label="日期" width="150"></el-table-column> -->
        <el-table-column align="center" header-align="center" prop="userName" label="用户名"></el-table-column>
        <el-table-column align="center" header-align="center" prop="phone" label="手机号"></el-table-column>
        <el-table-column align="center" header-align="center" prop="email" label="邮编"></el-table-column>
        <el-table-column align="center" header-align="center" prop="state" label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.state === "0" ? "正常" : "冻结"}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" header-align="center" label="Action" width="240">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="viewDetail(scope.row)">查看详情</el-button>
            <el-button :type="scope.row.state === '0' ? 'warning' : 'info'" size="small" @click="frozen(scope.row, scope.$index)">{{scope.row.state === "0" ? "冻结" : "解冻"}}</el-button>
            <el-button type="danger" size="small" @click="logoff(scope.row, scope.$index)">注销</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      condition: "",
      userList: []
    };
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      this.$axios.get("/users").then(res => {
        if(res.data.code === "200") {
          this.userList = res.data.result
        }
      })
    },
    onSearch() {
      this.$axios.get("/users", {
        params: {
          condition: this.condition
        }
      }).then(res => {
        if(res.data.code === "200") {
          this.userList = res.data.result
          this.condition = ""
        }
      })
    },
    viewDetail(row) {
      this.$router.push({
        path: "/articleManage",
        query: {username: row.userName}
      })
    },
    frozen(row, index) {
      this.$confirm('确认'+ (row.state === "0" ? "冻结" : "解冻") +'此管理员?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post("/users/frozen", {state: row.state === "0" ? "1" : "0", id: row.id})
          .then(res => {
            if (res.data.code === "200") {
              this.$message({
                type: "success",
                message: res.data.message
              });
              this.getUserList()
              // this.adminList.splice(index, 1)
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作已取消'
        });
      });
    },
    logoff(row, index) {
      this.$confirm('确认注销此用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get("/users/logoff", {params: {id: row.id}})
          .then(res => {
            if (res.data.code === "200") {
              this.$message({
                type: "success",
                message: res.data.message
              });
              this.userList.splice(index, 1)
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
};
</script>

<style scoped>
.search_input {
  width: 300px;
}

.user_list_box {
  margin-top: 20px;
}
</style>
