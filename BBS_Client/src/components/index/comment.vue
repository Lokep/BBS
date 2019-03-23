<style>
.comment{
    background: #fff;
    margin-top: 12px;
}

.yours-comment{
    width: 85%;
}
.their-info{
    padding: 10px 0;
}
.their-info>*{
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
}
.their-info img{
    width: 24px;
    height: 24px;
    border-radius: 2px;
}
.their-info span,.their-content,.their-add{
    font-size: 14px;
}
.their-name,.their-date{
    color: #8590a6;
}
.their-add{
    color:transparent;
    cursor: pointer;
}
.their-list:hover .their-add{
    color:#66b1ff;
}
.their-add svg{
    vertical-align: middle;
    margin-right: -3px;
}
.their-content{
    padding-left: 34px;
    line-height: 1.7;
}
</style>
<template>
    <div class="comment">
        <div class="yours ov">
            <div class="fl yours-comment">
                <el-input v-model='submitComment.content' ref="ipt" placeholder="comments...." prefix-icon="el-icon-edit" ></el-input>
            </div>
            <el-button class="fr" type="primary">发布</el-button>
        </div>
        <div class="theirs">
            <div class="their-list ov" id="111">
                <div class="their-info">
                    <img src="../../assets/images/head-pic.jpg" alt="">
                    <span class="their-name">lokep(作者)</span>
                    <span>回复</span>
                    <span class="their-name">pekol</span>
                    <span class="fr their-date">5 days ago</span>
                </div>
                <div class="their-content">
                    进入角色（体验派）是一件很难的事。千万不要被一些营销号带偏了，但凡谈到谁谁谁就是沉浸角色无法自拔。徐铮是体验派，但同时也是有加入方法派表演技巧的。
                </div>
                <span class="their-add fr" @click="reply">
                    <svg class="Zi Zi--Reply" fill="currentColor" viewBox="0 0 24 24" width="16" height="16"><path d="M22.959 17.22c-1.686-3.552-5.128-8.062-11.636-8.65-.539-.053-1.376-.436-1.376-1.561V4.678c0-.521-.635-.915-1.116-.521L1.469 10.67a1.506 1.506 0 0 0-.1 2.08s6.99 6.818 7.443 7.114c.453.295 1.136.124 1.135-.501V17a1.525 1.525 0 0 1 1.532-1.466c1.186-.139 7.597-.077 10.33 2.396 0 0 .396.257.536.257.892 0 .614-.967.614-.967z" fill-rule="evenodd"></path></svg>
                    添加评论
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import STORAGE from '../../assets/javascripts/storage.js'
export default {
    props:{
        acceptComment:Object
    },
    data(){
        return{
            isFocus:false,
            submitComment:{
                content:'',
                parentID:'',
                userID:STORAGE.GET('userInfo')[0].userID,
                articleID:this.acceptComment.articleID
            }
        }
    },
    methods:{
        reply(){
            // this.submitComment.content = `回复 ${this.acceptComment.userName}`
            // this.parentID = this.acceptComment.id
            this.submitComment.content = `回复 lokep: `
            this.$refs.ipt.focus()
        },
        submit(){
            // parentID,userID,content,articleID
            if(!this.submitComment.content){
                let sendCommentAPI = '/api/sendComment'
                let params = {

                }
                this.$axios.post(sendCommentAPI,params).then(res=>{
                    console.log(res)
                }).catch(err=>{
                    console.log(err)
                })
            }
        }
        
        
    }
}
</script>
