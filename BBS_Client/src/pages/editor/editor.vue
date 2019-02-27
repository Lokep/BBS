<style>
    .el-upload__text{
        line-height: 1.5;
    }
    .el-icon-upload{
        display: block;
    }
    .editor-upload{
        width: 380px;
        position: relative;
        margin: 20px auto;
    }
    .pre-view{
        height: 210px;
        width: 380px;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 4px;
    }
    .el-upload,.el-upload-dragger{
        width: 100%;
        height: 210px;
    }
    .el-upload__tip{
        text-align: center;
    }
    .editor-title,.editor-tag,.editor-content{
        width: 650px;
        margin: 10px auto;
    }
    .editor-content{
        margin: 20px auto;
        min-height: 200px;
    }
    .el-textarea__inner{
        min-height: 150px!important;
    }
    .editor-title{
        position: relative;
    }
    .editor-title-tag{
        position: absolute;
        right: 0;
        top: 0;
        height: 40px;
    }
    .el-tag{
        cursor: pointer;
    }
    .editor-title-tag>.el-tag{
        margin:4px;
    }
    .editor-submit{
        margin: 0 auto;
        display: block;
    }

</style>
<template>
    <div class="editor">
        <div class="editor-upload">
            <el-upload
            class="upload-box"
            drag
            list-type="text"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :auto-upload=false
            :on-change="handleChange"
            :on-progress="handleProgress"
            action="https://jsonplaceholder.typicode.com/posts/"
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip" v-show = !preViewVisible>只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <img class="pre-view" v-show = preViewVisible :src="dialogImageUrl" alt="">
        </div>
        <div class="editor-title">
            <el-input
                placeholder="请输入标题..."
                v-model="articleInfo.title"
                clearable>
            </el-input>
            <div class="editor-title-tag">
                <el-tag closable>标签一</el-tag>
            </div>
        </div>
        <div class="editor-tag">

            <el-tag>标签一</el-tag>
            <el-tag type="success">标签二</el-tag>
            <el-tag type="info">标签三</el-tag>
            <el-tag type="warning">标签四</el-tag>
            <el-tag type="danger">标签五</el-tag>
        </div>
        <div class="editor-content">
            <el-input
                type="textarea"
                autosize
                placeholder="请输入内容"
                v-model="articleInfo.content">
            </el-input>
        </div>
        <el-button type="primary" class="editor-submit"><i class="el-icon-edit"></i> 发布</el-button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            dialogImageUrl: '',
            preViewVisible:false,
            articleInfo:{
                title:'',
                tags:[],
                content:''
            }
        }
    },
    methods: { 
      handleRemove(file, fileList) {
        console.log(file.url, fileList);
        this.preViewVisible = false
      },
      handlePreview(file) {
        console.log(file);
      },
      handleProgress(event, file, fileList){
          console.log(event, file, fileList)
      },
      handleChange(file, fileList){
          this.dialogImageUrl = file.url
          this.preViewVisible = true
          console.log(file, fileList,this.dialogImageUrl)
      }
    }
}
</script>
