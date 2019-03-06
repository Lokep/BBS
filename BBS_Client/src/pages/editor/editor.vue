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
    .el-upload-list--picture-card{
        display: none;
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
        bottom: 0;
        height: 40px;
    }
    .el-tag{
        cursor: pointer;
        margin: 0 4px;
    }
    .editor-title-tag>.el-tag{
        margin:4px;
    }
    .editor-submit{
        margin: 0 auto;
        display: block;
    }
    .editor-tag .el-form-item__label{
        float: none;
    }
    .showError{
        position: fixed;
        left: 0;
        right: 0;
        margin: auto;
        top: 0;
        bottom: 0;
        width: 250px;
        height: 40px;
    }
</style>
<template>
    <div class="editor">
        <el-form>
            <div class="editor-upload">
                <el-upload
                class="upload-box"
                ref="upload"
                drag
                list-type="picture-card"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :auto-upload=false
                :on-change="handleChange"
                :on-progress="handleProgress"
                name="image"
                action="/api/editor/images"
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip" v-show = !preViewVisible>只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <img class="pre-view" v-show = preViewVisible :src="dialogImageUrl" alt="">
                <div class="el-upload__tip">{{imageName}}</div>
            </div>
            <el-form-item label="请输入标题" class="editor-title">
                <el-input
                    placeholder="请输入标题..."
                    v-model="articleInfo.title"
                    clearable>
                </el-input>
                <div class="editor-title-tag">
                    <el-tag :type="tagType[i]" v-for='(t,i) in articleInfo.tags' :key="t.topicName" :index='i' closable @close="tagClose">{{t.topicName}}</el-tag>
                </div>
            </el-form-item>
            <el-form-item label="添加标签" class="editor-tag">
                <el-tag v-for="(k,i) in offerTags" :key = 'k.topicName' :index = 'i' :type='tagType[i]' @click="selectTag(k)">{{k.topicName}}</el-tag>
            </el-form-item>
            <el-form-item label="文章内容" class="editor-content" prop="content">
                <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入内容"
                    v-model="articleInfo.content">
                </el-input>
            </el-form-item>
            <el-button type="primary" class="editor-submit" @click="submitArticle"><i class="el-icon-edit"></i> 发布</el-button>
        </el-form>
        
        <el-alert
            class="showError"
            v-show="isShowError"
            :title="alertTitle"
            type="error"
            @close="hideError"
            show-icon>
        </el-alert>
    
    </div>
</template>
<script>
import STORAGE from '../../assets/javascripts/storage'
export default {
    data(){
        
        return{
            dialogImageUrl: '',
            imageName:'',
            preViewVisible:false,
            tagType:['primary','success','info','warning','danger'],
            // offerTags:[{'tagName':'闺蜜','tagCode':'00001'},{'tagName':'摄影','tagCode':'00001'},{'tagName':'户外','tagCode':'00001'},{'tagName':'Photoshop','tagCode':'00001'},{'tagName':'写作','tagCode':'00001'},{'tagName':'青春','tagCode':'00001'}],
            offerTags:[],
            articleInfo:{
                title:'',
                tags:[],
                content:'',
                createAt:new Date().toLocaleDateString(),
                author:STORAGE.GET()[0].userName
            },
            alertTitle:'',
            isShowError:false
        }
    },
    mounted(){
        let tagAPI = '/api/editor/tags'
        let that =this
        this.$axios.post(tagAPI).then(res=>{
            /* 
            * topicName topicID
            */
            that.offerTags=res.data            
            console.log(that.offerTags)
        }).catch(err=>{
            console.log(err)
        })
    },
    methods: { 
        selectTag(e){
            if(!this.articleInfo.tags.length){
                let i = this.offerTags.indexOf(e)
                this.articleInfo.tags.push(e)
                this.offerTags.splice(i,1)
            }else{
                this.showError('一次只能选择一个标签哦~')
            }
            
        },
        tagClose(e){
            //删除selectTag里最后一个tag
            this.offerTags.push(this.articleInfo.tags[0])
            this.articleInfo.tags.splice(-1,1)
            //or
            // this.articleInfo.tags.pop()
        },

        handleRemove(file, fileList) {
            
            this.preViewVisible = false
        },
        handlePreview(file) {
            
        },
        handleProgress(event, file, fileList){
            
        },
        handleChange(file, fileList){
            this.dialogImageUrl = file.url
            this.imageName = file.name
            this.preViewVisible = true
        },
        submitArticle(){
            let editorAPI = '/api/editor/content'
            let leastWords = 140
            let that = this
            if(this.articleInfo.title==''){
                this.showError('标题不可以为空哦')
            }else if(this.articleInfo.tags.length == 0){
                this.showError('记得选标签哦')
            }else if(this.articleInfo.content.length<=leastWords){
                this.showError(`文章内容不可以少于${leastWords}个字哦`)
            }else{
                this.$refs.upload.submit();
                this.$axios.post(editorAPI,that.articleInfo).then(res=>{
                    console.log(res)
                }).catch(err=>{
                    console.log(err)
                });
                console.log(this.articleInfo)
            }
            
        },
        showError(alertTitle){
            this.isShowError = true
            this.alertTitle = alertTitle
        },
        hideError(){
            this.isShowError = false
            this.alertTitle = ''
        }
    }
}
</script>
