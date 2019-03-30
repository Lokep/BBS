<style>
    .personal{
        width: 1000px;
        margin: 0 auto; 
    }
    .personal-head{
        height: 160px;
        padding: 20px;
        background-color: #fff;
    }

    .personal-head-pic{
        width: 160px;
        height: 160px;
        border-radius: 4px;
    }
    .personal-user{
        margin-left: 32px;
        width: 400px;
        padding-top: 80px;
    }
    .title{
        font-size: 26px;
        line-height: 30px;
    }
    .personal-username{
        margin-bottom: 10px;
    }
    .personal-sign{
        font-size: 18px;
        white-space: nowrap;
        word-break: break-word;
        line-height: 2;
        margin-left: 16px;
        width: 300px;
    }
    .personal-small{
        font-size: 14px;
        line-height: 20px;
        box-sizing: border-box;
    }
    .personal-body{
        margin: 20px auto;
    }
    .personal-content{
        width: 800px;
        height: 200px;
        background-color: #fff;
    }
</style>
<template>
    <div class="personal">
        <div class="personal-head ov">
            <div class="personal-head-pic fl" @click="changeHeadPicBg" :style="{background:headPicBg}"></div>
            <div class="personal-user fl">
                <div class="ov">
                    <h4 class="title personal-username fl">{{userInfo.userName}}</h4>
                    <span class="personal-sign ellipsis fl" v-if="!isEditSign" @click="editSign">与你的相遇更像是就别重逢</span>
                    <el-input class="personal-sign fl" v-model="sign" v-else size="small" prefix-icon="el-icon-edit"></el-input>
                </div>
                <span class="personal-small"><i class="el-icon-message"></i> Email：{{userInfo.email}}</span>
                <span class="personal-small"><i class="el-icon-phone"></i> Tel：{{userInfo.phone}}</span>
            </div>
        </div>
        <div class="personal-body ov">
            <!-- <ul class="index-left-special index-block fr">

                <router-link to="/" tag="li" class="pointer">
                    <el-tooltip class="item" effect="dark" content="推荐" placement="right-end">
                        <i class="fa fa-heart index-icon-special"></i>
                    </el-tooltip>
                </router-link>

                <router-link to="/collection" tag="li" class="pointer">
                    <el-tooltip class="item" effect="dark" content="关注" placement="right-end">
                        <i class="fa fa-star index-icon-special"></i>
                    </el-tooltip>
                </router-link>
                
                <router-link to='/editor' tag="li" class="pointer">
                    <el-tooltip class="item" effect="dark" content="写文章" placement="right-end">
                        <i class="fa fa-edit index-icon-special"></i>
                    </el-tooltip>    
                </router-link>
            </ul> -->

            <div class="personal-content">

            </div>
        </div>
    </div>
</template>
<script>
import STORAGE from '../../assets/javascripts/storage.js'
export default {
    data(){
        return{
            headPicBg:'#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6),
            sign:'',
            isEditSign:false,
            userInfo:STORAGE.GET('USERINFO')[0]
        }
    },
    methods:{
        changeHeadPicBg(){
            this.headPicBg = '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6)
        },
        editSign(){
            this.isEditSign = true
        }
    }
}
</script>