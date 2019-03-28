<template>
  <div class="article_manage">
    <div class="search_box">
      <el-input
        class="search_input"
        v-model.trim="condition"
        placeholder="请输入文章标题、作者"
        size="medium"
        @keyup.enter.native="onSearch"
      ></el-input>
      <el-button type="primary" size="small" @click="onSearch">搜索</el-button>
    </div>
    <div class="article_list_box">
      <el-table :data="articleList" border style="width: 100%">
        <el-table-column sortable align="center" header-align="center" prop="createAt" label="发布日期">
          <template slot-scope="scope">
            <span>{{formatDate(scope.row.createAt, "yy-MM-dd hh:mm:ss")}}</span>
          </template>
        </el-table-column>
        <el-table-column sortable align="center" header-align="center" prop="author" label="作者"></el-table-column>
        <el-table-column align="center" header-align="center" prop="title" label="文章标题" width="200"></el-table-column>
        <el-table-column sortable align="center" header-align="center" prop="agrees" label="点赞数"></el-table-column>
        <el-table-column align="center" header-align="center" prop="disagrees" label="反对数"></el-table-column>
        <el-table-column align="center" header-align="center" prop="collects" label="收藏数"></el-table-column>
        <el-table-column align="center" header-align="center" prop="noInterests" label="不感兴趣"></el-table-column>
        <el-table-column align="center" header-align="center" prop="accusation" label="举报"></el-table-column>
        <el-table-column align="center" header-align="center" label="Action" width="100">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="delArticle(scope.row, scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {formatDate} from "../utils/formatDate"
export default {
  data() {
    return {
      condition: "",
      articleList: []
    };
  },
  mounted() {
    if(this.$route.query.username) {
      this.viewAuthorArticles(this.$route.query.username)
    } else {
      this.getArticleList()
    }
  },
  methods: {
    formatDate,
    getArticleList() {
      this.$axios.get("/articles").then(res => {
        if(res.data.code === "200") {
          this.articleList = res.data.result
        }
      })
    },
    onSearch() {
      this.$axios.get("/articles", {
        params: {
          condition: this.condition
        }
      }).then(res => {
        if(res.data.code === "200") {
          this.articleList = res.data.result
          this.condition = ""
        }
      })
    },
    viewAuthorArticles(author) {
      this.$axios.get("/articles/author_articles", {
        params: {
          author: author
        }
      }).then(res => {
        if(res.data.code === "200") {
          this.articleList = res.data.result
        }
      })
    },
    delArticle(row, index) {
      this.$confirm('确认删除此文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get("/articles/del_article", {params: {id: row.id}})
          .then(res => {
            if(res.data.code === "200") {
              this.$message({
                type: "success",
                message: res.data.message
              })
              this.articleList.splice(index, 1)
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

.article_list_box {
  margin-top: 20px;
}
</style>
