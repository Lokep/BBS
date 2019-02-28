<template>
  <div class="admin_manage">
    <div class="search_box">
      <el-input
        class="search_input"
        v-model="search_cont"
        placeholder="请输入活动名称"
        size="medium"
      ></el-input>
      <el-button type="primary" size="small">搜索</el-button>
    </div>
    <div class="create_btn">
      <el-button type="primary" size="small">添加新管理员</el-button>
    </div>
    <div class="admin_list_box">
      <el-table :data="adminList" border style="width: 100%">
        <el-table-column align="center" header-align="center" prop="admin" label="账户名"></el-table-column>
        <el-table-column align="center" header-align="center" prop="password" label="密码"></el-table-column>
        <el-table-column align="center" header-align="center" label="Action" width="160">
          <template slot-scope="scope">
            <el-button type="primary" size="small">修改</el-button>
            <el-button type="danger" size="small">删除</el-button>
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
      adminList: [
        {
          admin: "admin",
          password: "123456"
        }
      ]
    };
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
