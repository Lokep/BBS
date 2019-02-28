<template>
  <div class="user_manage">
    <div class="search_box">
      <el-input
        class="search_input"
        v-model="search_cont"
        placeholder="请输入用户名、手机号、邮箱"
        size="medium"
      ></el-input>
      <el-button type="primary" size="small">搜索</el-button>
    </div>
    <div class="user_list_box">
      <el-table :data="userList" border style="width: 100%">
        <!-- <el-table-column fixed prop="date" label="日期" width="150"></el-table-column> -->
        <el-table-column align="center" header-align="center" prop="username" label="用户名"></el-table-column>
        <el-table-column align="center" header-align="center" prop="phone" label="手机号"></el-table-column>
        <el-table-column align="center" header-align="center" prop="email" label="邮编"></el-table-column>
        <el-table-column align="center" header-align="center" label="Action">
          <template slot-scope="scope">
            <el-button type="primary" size="small">查看详情</el-button>
            <el-button type="warning" size="small">冻结</el-button>
            <el-button type="danger" size="small">注销</el-button>
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
      search_cont: "",
      userList: [
        {
          username: "楼天楠",
          phone: "15567890234",
          email: "lokep@163.com"
        }
      ]
    };
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
