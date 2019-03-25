<template>
  <div class="topic_manage">
    <div class="search_box">
      <el-input
        class="search_input"
        v-model="condition"
        placeholder="请输入主题名称"
        size="medium"
        @keyup.enter.native="onSearch"
      ></el-input>
      <el-button type="primary" size="small" @click="onSearch">搜索</el-button>
    </div>
    <div class="create_btn">
      <el-button type="primary" size="small">创建新活动</el-button>
    </div>
    <div class="topic_list_box">
      <el-table :data="topicList" border style="width: 100%">
        <el-table-column align="center" header-align="center" prop="createAt" label="创建日期"></el-table-column>
        <el-table-column align="center" header-align="center" prop="topicName" label="标题"></el-table-column>
        <el-table-column align="center" header-align="center" prop="topicImg" label="图片">
          <template slot-scope="scope">
            <img width="50" :src="scope.row.topicImg" alt="">
          </template>
        </el-table-column>
        <el-table-column align="center" header-align="center" prop="state" label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.state ? "已发布" : "未发布"}}</span>
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
      condition: "",
      topicList: []
    };
  },
  mounted() {
    this.getTopicsList()
  },
  methods: {
    getTopicsList() {
      this.$axios.get("/topics").then(res => {
        if(res.data.code === "200") {
          this.topicList = res.data.result
        }
      })
    },
    onSearch() {
      this.$axios.get("/topics", {
        params: {
          condition: this.condition
        }
      }).then(res => {
        if(res.data.code === "200") {
          this.topicList = res.data.result
          this.condition = ""
        }
      })
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

.topic_list_box {
  clear: both;
}
</style>
