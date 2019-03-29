<style scope>
.comment{
    background: #fff;
    margin-top: 12px;
}

.yours-comment{
    width: 85%;
    position: relative;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
}
.yours-comment:focus{
    border-color: #409EFF;
}

.el-input__inner{
    border: 0;
}
.el-input__inner:focus{
    border: 0;
}

.yours-reply{
    position: absolute;
    left: 30px;
    top: 0;
    bottom: 0;
    margin: auto;
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
                <el-input :style="{width:inputWidth,paddingLeft:paddingLeft}" v-model='submitComment.content' ref="ipt" placeholder="comments...." prefix-icon="el-icon-edit" ></el-input>
                <el-tag closable type="danger" class="yours-reply" v-show='!replyTag.name==""' @close="cancelReply">回复: {{replyTag.name}}</el-tag>
            </div>
            <el-button class="fr" type="primary" @click="submit">发布</el-button>
        </div>
        <div class="theirs"  v-for="(k,i) in acceptComment" :key='k.id' :index='i'>
            <div class="their-list ov" :id="k.id">
                <div class="their-info">
                    <img src="../../assets/images/head-pic.jpg" alt="" v-if="k.username == 'lokep'">
                    <img src="" alt="" v-else :style="{background:'#'+Math.floor(Math.random()*1000000)}">
                    <span class="their-name">{{k.username}}</span>
                    <span v-if=k.parentname >回复</span>
                    <span v-if=k.parentname class="their-name">{{k.parentname}}</span>
                    <span class="fr their-date">{{k.createAt}}</span>
                </div>
                <div class="their-content">
                    {{k.content}}
                </div>
                <span class="their-add fr" @click="reply(k)">
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
        acceptComment:Array,
        articleID:String
    },
    data(){
        
        return{
            
            their:{
                id:0,
                name:'pokel'
            },
            replyTag:{
                id:'',
                name:''
            },
            paddingLeft:'0%',
            inputWidth:'100%',
            isFocus:false,
            submitComment:{
                content:'',
                parentID:0,
                userID:STORAGE.GET('USERINFO')[0].userID,
                articleID:''
            }
        }
    },
    mounted(){
        // console.log(this.acceptComment)
    },
    methods:{
        reply(e){
            // this.submitComment.content = `回复 ${this.acceptComment.userName}`
            // this.parentID = this.acceptComment.id

            this.replyTag = {
                id:e.id,
                name:e.username
            }
            console.log(e.id)
            this.submitComment.parentID = e.id
            this.$refs.ipt.focus()
            this.submitComment.content = '                    '
            console.log(e)
            this.inputWidth = 100-this.their.name.length + '%'
            this.paddingLeft = this.their.name.length + '%'
        },
        submit(){
            // parentID,userID,content,articleID
            let that = this
            console.log(this.submitComment)
            if(this.submitComment.content){
                let sendCommentAPI = '/api/sendComent'
                this.submitComment.articleID = this.articleID
                this.$axios.post(sendCommentAPI,that.submitComment).then(res=>{
                    that.submitComment= {
                        content:'',
                        parentID:0,
                        userID:STORAGE.GET('USERINFO')[0].userID,
                        articleID:''
                    }
                    that.cancelReply()
                }).catch(err=>{
                    console.log(err)
                })
            }
        },
        cancelReply(){
            this.replyTag = {
                id:'',
                name:''
            },
            this.submitComment.parentID = 0
        }
        
    }
}
</script>
