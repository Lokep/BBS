<style>
    .topics-list{
        width: 230px;
        height: 75px;
        padding: 5px 10px;
        margin: 0 8px 25px 0;
    }
    .topics-list img{
        width: 72px;
        height: 72px;
        border-radius: 4px;
        float: left;
    }
    .topics-info{
        width: 140px;
    }
    .topics-info-title{
        font-weight: 600;
        color: #2e3135;
        font-size: 18px;
        cursor: pointer;
    }
    .topics-info-title:hover{
        color:#007fff;
    }
    .topics-info-follow{
        font-size:14px;
        color:#8a9aa9;
        padding: 5px 0 3px;
    }
    .top-info-button{
        color:#37c701;
        font-size: 14px;
        -webkit-appearance: none;
        border:none;
        outline:none;
        background-color: #fff;
        cursor: pointer;
    }
</style>
<template>
    <div class="topics-list ov fl">
        <router-link to="/">
            <img src="../../assets/images/topics.jpg" alt="LOGO">
        </router-link>
        <div class="topics-info fr">
            <router-link to="/" class="topics-info-title" tag="h5">我的开源项目</router-link>
            <span class="topics-info-follow">{{follower}} 关注</span>
            <button class="top-info-button" @click="follow"  v-if="!isFollow"> + 关注 </button>
            <button class="top-info-button" @click="follow"  v-else> 已关注 </button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            isFollow:true,
            follower:3316
        }
    },
    methods:{
        follow(e){
            this.isFollow?this.follower--:this.follower++
            this.isFollow = !this.isFollow
        }
    },
}
</script>
