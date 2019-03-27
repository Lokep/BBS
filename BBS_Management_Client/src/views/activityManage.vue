<template>
  <div>
    <div v-if="$route.name === '活动管理'" class="activity_manage">
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
        <el-button type="primary" size="small" @click="createActivity">创建新活动</el-button>
      </div>
      <div class="activity_list_box">
        <el-table :data="activityList" border style="width: 100%" size="small">
          <el-table-column align="center" header-align="center" prop="title" label="活动名称"></el-table-column>
          <el-table-column align="center" header-align="center" prop="time" label="活动日期"></el-table-column>
          <el-table-column align="center" header-align="center" prop="city" label="城市" width="120"></el-table-column>
          <el-table-column align="center" header-align="center" prop="link" label="链接"></el-table-column>
          <el-table-column align="center" header-align="center" prop="imgSrc" label="图片">
            <template slot-scope="scope">
              <img width="100%" :src="scope.row.imgSrc" alt="">
            </template>
          </el-table-column>
          <el-table-column align="center" header-align="center" prop="type" label="活动形式" width="120">
            <template slot-scope="scope">
              <span>{{scope.row.type === "1" ? "线上" : "线下"}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="Action" width="120">
            <template slot-scope="scope">
              <el-button type="danger" size="small" @click="delActivity(scope.row, scope.$index)">删除</el-button>
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
        activityList: []
      };
    },
    methods: {
      createActivity() {
        this.$router.push({
          name: "活动管理"
        })
      },
      getActivityList() {
        this.$axios.get("/activities")
          .then(res => {
            if(res.data.code) {
              this.activityList = res.data.result
            }
          })
      },
      onSearch() {
        this.$axios.get("/activities", {params: {condition: this.search_cont}})
          .then(res => {
            if(res.data.code === "200" && res.data.result.length !== 0) {
              this.$message({
                type: "success",
                message: res.data.message
              })
              this.activityList = res.data.result
              this.search_cont = ""
            } else {
              this.$message({
                type: "error",
                message: res.data.message
              })
            }
          })
      },
      delActivity(row, index) {
        this.$confirm('确认删除此活动?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.get("/activities/del_activity", {params: {id: row.id}})
            .then(res => {
              if(res.data.code === "200") {
                this.$message({
                  type: "success",
                  message: res.data.message
                })
                this.activityList.splice(index, 1)
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
    mounted() {
      this.getActivityList()
    },
    watch: {
      $route (to, from) {
        if(to.name === "活动管理") {
          this.getActivityList()
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

  .activity_list_box {
    clear: both;
  }
</style>
