<template>
  <div class="article_manage">
    <div class="search_box">
      <el-input
        class="search_input"
        v-model="search_cont"
        placeholder="请输入文章标题、作者"
        size="medium"
      ></el-input>
      <el-button type="primary" size="small">搜索</el-button>
    </div>
    <div class="article_list_box">
      <el-table :data="articleList" border style="width: 100%">
        <el-table-column sortable align="center" header-align="center" prop="createAt" label="发布日期"></el-table-column>
        <el-table-column sortable align="center" header-align="center" prop="author" label="作者"></el-table-column>
        <el-table-column align="center" header-align="center" prop="title" label="文章标题"></el-table-column>
        <el-table-column sortable align="center" header-align="center" prop="articleType" label="文章类型"></el-table-column>
        <el-table-column sortable align="center" header-align="center" prop="agrees" label="点赞数"></el-table-column>
        <el-table-column align="center" header-align="center" prop="disagrees" label="反对数"></el-table-column>
        <el-table-column align="center" header-align="center" prop="collects" label="收藏数"></el-table-column>
        <el-table-column align="center" header-align="center" prop="noInterests" label="不感兴趣"></el-table-column>
        <el-table-column align="center" header-align="center" prop="accustion" label="举报"></el-table-column>
        <el-table-column align="center" header-align="center" label="Action" width="150">
          <template slot-scope="scope">
            <el-button type="primary" size="small">审核</el-button>
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
      articleList: [
        {
          createAt: "2019-02-28",
          author: "姬和不如",
          title: "听说用欧阳娜娜做头像可以脱单？",
          articleType: "娱乐新闻",
          agrees: 2345,
          disagrees: 123,
          collects: 444,
          noInterests: 32,
          accustion: 12
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

.article_list_box {
  margin-top: 20px;
}
</style>
