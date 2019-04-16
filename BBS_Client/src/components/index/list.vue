<style>
    .list{
        padding: 20px 0;
        width: 654px;
        margin: 0 auto;
        border-bottom: 1px solid #F0F2F7;     
    }
    .list:last-child{
        border-bottom: 0
    }
    .list-title{
        font-size: 18px;
        line-height: 1.6;
        color: #1A1A1A;
        margin-top: -4px;
        cursor: pointer;
    }
    .list-content{
        margin: 16px auto 0;
    }
    .list-img{
        background-color: #409EFF;
        width: 190px;
        height: 105px;    
        border-radius: 4px;
    }
    .list-inshort{
        color:#1A1A1A;
        font-size: 15px;
        word-break: break-word;
        line-height: 1.6;
        margin-top: 5px;
    }
    .read-whole-art:after{
        content:'阅读全文';
        padding: 0 10px;
        margin-left: -10px;
        color: #175199;
        background-color: rgba(255,255,255,.4);
        cursor: pointer;
    }
    
</style>
<template>
    <!-- 无图的时候，展示2行共65个字，有图展示4行共90个 -->

    <div class="list">
        <router-link :to=" '/article/'+p.articleID" tag="h3" class="list-title"><span class="list-tag">{{p.tagName}}</span>{{p.title}}</router-link>
        <div class="list-content ov" v-if='p.imgName'>
            <img class="list-img fl" :src="serverPath + p.path+p.imgName" alt="article">
            <span class="list-inshort fr ellipsis-within-four-rows list-inshort-with-img read-whole-art">
                <b>{{p.author}}</b>： {{p.content}}
            </span>
        </div>
        <div class="list-content ov" v-else>
            <span class="list-inshort fr ellipsis-within-four-rows list-inshort-without-img read-whole-art">
                <b>{{p.author}}</b>： {{p.content}}
            </span>
        </div>
        <ul class="list-tools ov">
            <li class="list-tools-agree el-icon-caret-top" :isAgree="isAgree"  @click="agree(isAgree)">赞同 {{p.agrees}}</li>
            <!-- <li class="list-tools-disagree el-icon-caret-bottom">{{p.disagrees}}</li> -->
            <li class="list-tools-comment" @click="showComment">添加评论</li>
            <!-- <li class="list-tools-collect" @click="collect">收藏{{p.collects}}</li> -->
            <!-- <li class="list-tools-nointerests">不感兴趣{{p.noInterests}}</li> -->
            <!-- <li class="list-tools-accusation">举报{{p.accusation}}</li> -->
        </ul>
        <div class="comments" v-show="showComments">
            <Comment @addNewComment='addNewComment' :acceptComment=commentsContent :articleID=p.articleID ></Comment>
        </div>
        <!-- 评论 -->
    </div>

</template>
<script>

import Comment from './comment'

export default {
    props:{
        p:Object
    },
    data(){
        return{
            serverPath:'http://192.168.1.90:3000',
            showComments:false,
            commentsContent:[],
            isAgree:true
        }
    },
    components:{
        Comment
    },
    methods:{
        
        showComment(){
            this.showComments = !this.showComments
            let showCommentAPI = '/api/getCommentList'
            let params={
                articleID:this.p.articleID
            }
            console.log(this.p.articleID)
            this.$axios.post(showCommentAPI,params).then(res=>{
                // console.log(res)
                this.commentsContent = res.data
            }).catch(err=>{
                console.log(err)
            })
        },
        
        addNewComment(v){
            this.commentsContent.push(v)
        },

        agree(e){
            let that = this

            if(!this.p.agrees){
                this.p.agrees = 0
            }
            if(e){
                this.p.agrees++
            }else{
                this.p.agrees--
            }

            this.$axios.get('/api/agrees',{
                params: {
                    articleID: that.p.articleID,
                    agrees:that.p.agrees
                }
            }).then(res=>{
                if(res.status == 200){
                    this.isAgree=!e
                }
            }).catch(err=>{
                return false
            })
        }
    },
    mounted(){
        let data = this.p
        Object.keys(data).forEach(key =>{
            if(!data[key]){
                data[key] = ''
            }
        })
    },
    watch:{

    },
    computed:{

    }
}
</script>