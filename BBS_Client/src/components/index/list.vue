<style scope>
    .list{
        padding: 20px;
        border-bottom: 1px solid #F0F2F7;     
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
    /* .list-tools>.list-tools-disagree{

    } */
</style>
<template>
    <!-- 无图的时候，展示2行共65个字，有图展示4行共90个 -->

    <div class="list">
        <router-link to="/question" tag="h3" class="list-title">周杰伦心里对王力宏的印象到底是怎样的，对王力宏的才华是怎样看待的？</router-link>
        <div class="list-content ov">
            <img class="list-img fl" src="../../assets/images/article.jpg" alt="article">
            <span class="list-inshort fr ellipsis-within-four-rows list-inshort-with-img read-whole-art">
                老杨叔聊志愿填报： <b>王志文在电视剧《黑冰》里的一段独白，10分钟左右</b> 毒枭郭小鹏（王志文）将被处死刑之前和警方卧底（蒋雯丽）的对话，王志文在剧中台词前部分平静却暗波汹涌后部分却十分激烈，形成了强烈的对比，…
            </span>
        </div>
        <ul class="list-tools">
            <li class="list-tools-agree el-icon-caret-top">赞同</li>
            <li class="list-tools-disagree el-icon-caret-bottom">{{p.a}}</li>
            <li class="list-tools-comment">添加评论</li>
            <li class="list-tools-collect">收藏</li>
            <li class="list-tools-nointerests">不感兴趣</li>
            <li class="list-tools-accusation">举报</li>
        </ul>
        <!-- 评论 -->
    </div>

</template>
<script>


export default {
    props:['p'],
    data(){
        return{

        }
    },
    components:{
        
    },
    methods:{

    },
    mounted(){

    },
    watch:{

    },
    computed:{

    }
}
</script>