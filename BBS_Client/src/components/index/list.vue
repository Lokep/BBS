<style scope>
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
    .list-tools{
        width: 654px;
        height: 32px;
        margin: 25px 0 0;
    }
    .list-tools>li{
        float: left;
        padding: 0 12px;
        color: hsl(220.00000000000003, 15.6398104265%, 53.6274509804%);
        font-size: 14px;
        line-height: 30px;
        cursor: pointer;
        margin-right: 10px;
    }
    .list-tools>.list-tools-agree,.list-tools>.list-tools-disagree{
        padding: 0 12px;
        color: #0084FF;
        background: rgba(0, 132, 255, 0.1);
        border-color: transparent;
        border-radius: 4px;
    }
    .list-tag{
        display: inline;
        font-size: 14px;
        vertical-align: middle;
        background: #0084FF;
        border-radius: 4px;
        color: #fff;
        padding: 3px 5px;
        font-weight: 400;
        margin-right: 10px;
    }
</style>
<template>
    <!-- 无图的时候，展示2行共65个字，有图展示4行共90个 -->

    <div class="list">
        <router-link to="/question" tag="h3" class="list-title"><span class="list-tag">{{p.tagName}}</span>{{p.title}}</router-link>
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
            <li class="list-tools-agree el-icon-caret-top">赞同 {{p.agrees}}</li>
            <li class="list-tools-disagree el-icon-caret-bottom">{{p.disagrees}}</li>
            <li class="list-tools-comment" @click="showComment">添加评论{{p.comments}}</li>
            <li class="list-tools-collect">收藏{{p.collects}}</li>
            <li class="list-tools-nointerests">不感兴趣{{p.noInterests}}</li>
            <li class="list-tools-accusation">举报{{p.accusation}}</li>
        </ul>
        <Comment :acceptComment=p></Comment>
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
            serverPath:'http://192.168.1.90:3000'
        }
    },
    components:{
        Comment
    },
    methods:{
        
        showComment(){
            // let showCommentAPI = '/api/getCommentList'
            // let params={
            //     articleID:this.p.articleID
            // }
            // console.log(params)
            // this.$axios.post(showCommentAPI,params).then(res=>{
            //     console.log(res)
            // }).catch(err=>{
            //     console.log(err)
            // })
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