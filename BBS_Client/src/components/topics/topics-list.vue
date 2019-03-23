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
            <img :src="topicsContent.topicImg" :alt="topicsContent.topicTitle" :title="topicsContent.topicTitle">
        </router-link>
        <div class="topics-info fr">
            <router-link to="/" :title="topicsContent.topicTitle" class="topics-info-title" tag="h5">{{topicsContent.topicName}}</router-link>
            <span class="topics-info-follow">{{topicsContent.topicSum}} 关注</span>
            <button class="top-info-button" @click="follow"  v-if="!topicsContent.isFollow"> + 关注 </button>
            <button class="top-info-button" @click="follow"  v-else> 已关注 </button>
        </div>
    </div>
</template>
<script>

import STORAGE from '../../assets/javascripts/storage.js'

export default {
    props:{
        topicsContent:Object
    },
    data(){
        return{
            isFollow:false,
            follower:3316
        }
    },
    methods:{
        follow(e){
            
            this.topicsContent.isFollow?this.topicsContent.topicSum--:this.topicsContent.topicSum++
            this.topicsContent.isFollow = !this.topicsContent.isFollow
            let followAPI = '/api/follow/click'
            let params={
                userID:STORAGE.GET('userInfo')[0].userID,
                topicID:this.topicsContent.topicID,
                operation:this.topicsContent.isFollow,
                topicSum:this.topicsContent.topicSum
            }
            this.$axios.post(followAPI,params).then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
        }
    },
}
</script>
