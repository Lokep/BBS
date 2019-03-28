<template>
  <div>
    <div class="topic_manage" v-if="$route.name === '话题管理'">
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
        <el-button type="primary" size="small" @click="createTopic">创建新话题</el-button>
      </div>
      <div class="topic_list_box">
        <el-table :data="topicList" border style="width: 100%" size="small">
          <el-table-column align="center" header-align="center" prop="createAt" label="创建日期">
            <template slot-scope="scope">
              <span>{{formatDate(scope.row.createAt, "yyyy-MM-dd hh:mm:ss")}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" header-align="center" prop="topicName" label="话题名称" width="200"></el-table-column>
          <el-table-column align="center" header-align="center" prop="topicTitle" label="话题标题"></el-table-column>
          <el-table-column align="center" header-align="center" prop="topicImg" label="图片" width="120">
            <template slot-scope="scope">
              <img width="50" :src="scope.row.topicImg" alt="">
            </template>
          </el-table-column>
          <el-table-column align="center" header-align="center" prop="topicSum" label="话题关注人数" width="160"></el-table-column>
          <el-table-column align="center" header-align="center" label="Action" width="120">
            <template slot-scope="scope">
              <el-button type="danger" size="small" @click="delTopic(scope.row, scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  // 提起格式化工具
  import {formatDate} from "../utils/formatDate"

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
      formatDate,
      // 获取话题列表
      getTopicsList() {
        this.$axios.get("/topics").then(res => {
          if (res.data.code === "200") {
            this.topicList = res.data.result.reverse()
          }
        })
      },
      // 条件查询
      onSearch() {
        this.$axios.get("/topics", {
          params: {
            condition: this.condition
          }
        }).then(res => {
          if (res.data.code === "200") {
            this.topicList = res.data.result
            this.condition = ""
          }
        })
      },
      // 穿件话题
      createTopic() {
        this.$router.push({
          name: "创建话题"
        })
      },
      // 删除话题
      delTopic(row, index) {
        this.$confirm('确认删除此话题?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.get("/topics/del_topic", {params: {id: row.id}})
            .then(res => {
              if (res.data.code === "200") {
                this.$message({
                  type: "success",
                  message: res.data.message
                });
                this.topicList.splice(index, 1)
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
      // 监听路由变化，用作穿件话题后的列表更新
      $route (to, from) {
        if (to.name === "话题管理") {
          this.getTopicsList()
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

  .topic_list_box {
    clear: both;
  }
</style>
