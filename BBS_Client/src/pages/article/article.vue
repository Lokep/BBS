<style scoped>
    .container,.article{
        background-color: #fff;
        width: 100%;
        min-height: 100vh;
        margin:0;
        padding:0;
    }
    .article-container{
        width: 690px;
        margin: 60px auto 20px;
    }
    .article-headBg{
        width: 45px;
        height: 45px;
        border-radius: 4px;
    }
    .article-img{
        margin: 16px auto 0;
        width: 690px;
    }
    .article-title{
        font-size: 24px;
        line-height: 1.22;
        margin: 24px 0;
        word-wrap: break-word;
    }
    .article-follow{
        color: #fff;
        background-color: #0084ff;
        padding: 0 16px;
        font-size: 14px;
        line-height: 32px;
        text-align: center;
        cursor: pointer;
        border-radius: 3px;
        font-weight: 500;
    }
    .article-user{
        font-size: 14px;
        line-height: 1.6;
        margin-left: 16px;
    }
    .article-user>h6{
        color: #444;
    }
    .article-user span{
        color: #646464;
    }
    .article-content{
        word-break: break-word;
        line-height: 1.6;
        font-size: 13px;
        color: #1a1a1a;
        text-indent: 2em;
        text-align:justify;
        margin-top: 15px;
    }
    .article-create{
        margin-top: 10px;
        font-size: 14px;
        color: #8590a6;
    }
    .el-tag{
        vertical-align: text-bottom;
    }
</style>
<template>
    <div class="article ov">
        <div class="article-container ov">
            
            <!-- 图片 -->
            <img :src="serverPath+articleInfo.path+articleInfo.imgName" v-if='articleInfo.imgName' class="article-img">
            <!-- 文章标题 -->
            <h4 class="article-title">
                <el-tag>{{articleInfo.tagName}}</el-tag>
                {{articleInfo.title}}
            </h4>
            <!-- 文章信息 -->
            <div class="article-info ov">
                <div class="article-headBg fl" :style="{backgroundColor:headPicBg}"></div>
                <div class="article-user fl">
                    <h4>{{articleInfo.author}}</h4>
                    <span class="ellipsis">吃了没呢</span>
                </div>
                
                <div class="article-follow fr">
                    <svg class="Zi Zi--Plus FollowButton-icon inline-middle" fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M13.491 10.488s-.012-5.387 0-5.998c-.037-1.987-3.035-1.987-2.997 0-.038 1.912 0 5.998 0 5.998H4.499c-1.999.01-1.999 3.009 0 3.009s5.995-.01 5.995-.01v5.999c0 2.019 3.006 2.019 2.997 0-.01-2.019 0-5.998 0-5.998s3.996.009 6.004.009c2.008 0 2.008-3-.01-3.009h-5.994z" fill-rule="evenodd"></path></svg>
                    <span class="inline-middle">关注</span>
                </div>
            </div>
            <!-- 文章内容 -->
            <div class="article-content">
                {{articleInfo.content}}
            </div>    
            <span class="article-create">编辑于 {{articleInfo.createAt}}</span>

            <ul class="list-tools ov">
                <li class="list-tools-agree el-icon-caret-top">赞同 {{articleInfo.agrees}}</li>
                <li class="list-tools-disagree el-icon-caret-bottom">{{articleInfo.disagrees}}</li>
                <li class="list-tools-comment" >添加评论{{articleInfo.comments}}</li>
                <li class="list-tools-collect" >收藏{{articleInfo.collects}}</li>
                <li class="list-tools-nointerests">不感兴趣{{articleInfo.noInterests}}</li>
                <li class="list-tools-accusation">举报{{articleInfo.accusation}}</li>
            </ul>
            <div class="comments">
                <Comment @addNewComment = 'addNewComment' :acceptComment=commentsContent :articleID=articleInfo.articleID ></Comment>
            </div>
        </div>
    </div>
</template>
<script>
import Comment from '../../components/index/comment'
export default {
    data(){
        return{
            headPicBg:'#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6),
            serverPath:'http://192.168.1.90:3000',
            articleID:'',
            articleInfo:{},
            commentsContent:[]
        }
    },
    components:{
        Comment
    },
    mounted(){
        let that = this
        this.articleID = this.$route.params
        this.$axios.post('/api/articleDetail',that.articleID).then(res=>{
            that.articleInfo = res.data[0]
            that.articleInfo.createAt = that.articleInfo.createAt.toString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
            console.log(this.articleInfo)
        }).catch(err=>{
            console.log(err)
        })

        this.showComment()
    },
    methods:{
        showComment(){
            let showCommentAPI = '/api/getCommentList'
            // let params={
            //     articleID:this.articleInfo.articleID
            // }
            let that = this
            console.log(that.articleID)
            this.$axios.post(showCommentAPI,that.articleID).then(res=>{
                console.log(res)
                that.commentsContent = res.data
            }).catch(err=>{
                console.log(err)
            })
        },
        addNewComment(v){
            console.log(v)
            this.commentsContent.push(v)
        }
    }
}
</script>
