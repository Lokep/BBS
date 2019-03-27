<template>
  <div class="create_page">
    <h2>创建新话题</h2>
    <el-form class="topic_form" :model="topicForm" label-width="80px">
      <el-form-item label="话题名称">
        <el-input v-model="topicForm.topicName" size="small"></el-input>
      </el-form-item>
      <el-form-item label="话题标题">
        <el-input v-model="topicForm.topicTitle" size="small"></el-input>
      </el-form-item>
      <el-form-item label="话题图片">
        <el-upload
          action="http://localhost:3000/topics/upload"
          name="imageFile"
          :show-file-list="false"
          :on-success="handleImageSuccess">
          <img v-if="imageUrl" :src="imageUrl" class="topic_img">
          <el-button v-else size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="onSubmit">立即创建</el-button>
        <el-button size="small" @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        topicForm: {},
        imageUrl: ""
      }
    },
    mounted() {

    },
    methods: {
      onSubmit() {
        this.$axios.post("/topics", this.topicForm)
          .then(res => {
            if(res.data.code === '200') {
              this.$message(res.data.message);
              this.onCancel()
            }
          })
      },
      onCancel() {
        this.topicForm = {};
        this.$router.push({
          name: "话题管理"
        })
      },
      handleImageSuccess(res, file) {
        this.imageUrl = "http://localhost:3000/uploads/" + res.filename
        this.topicForm.topicImg = this.imageUrl
      },
    }
  }
</script>

<style>
  .topic_form {
    width: 400px;
    margin: 0 auto;
  }

  .create_page h2 {
    text-align: center;
    margin: 30px 0;
  }
  .topic_img {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
