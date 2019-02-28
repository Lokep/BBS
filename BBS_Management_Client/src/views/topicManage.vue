<template>
  <div class="topic_manage">
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
      <el-button type="primary" size="small">创建新活动</el-button>
    </div>
    <div class="topic_list_box">
      <el-table :data="topicList" border style="width: 100%">
        <el-table-column align="center" header-align="center" prop="createAt" label="创建日期"></el-table-column>
        <el-table-column align="center" header-align="center" prop="title" label="标题"></el-table-column>
        <el-table-column align="center" header-align="center" prop="url" label="链接"></el-table-column>
        <el-table-column align="center" header-align="center" prop="picture" label="图片"></el-table-column>
        <el-table-column align="center" header-align="center" prop="state" label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.state ? "已上架" : "已下架"}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" header-align="center" label="Action" width="160">
          <template slot-scope="scope">
            <el-button type="primary" size="small">发布</el-button>
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
      topicList: [
        {
          createAt: "2019-03-01",
          title: "21天ps入门教学",
          url: "http://www.baidu.com",
          picture: "",
          state: true
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

.topic_list_box {
  clear: both;
}
</style>
