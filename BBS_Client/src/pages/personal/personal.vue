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
    }
    .personal-small{
        font-size: 14px;
        line-height: 20px;
        box-sizing: border-box;
    }
</style>
<template>
    <div class="personal">
        <div class="personal-head ov">
            <div class="personal-head-pic fl" @click="changeHeadPicBg" :style="{background:headPicBg}"></div>
            <div class="personal-user fl">
                <div class="ov">
                    <h4 class="title personal-username fl">Lokep</h4>
                    <span class="personal-sign fl" v-if="!isEditSign" @click="editSign">与你的相遇更像是就别重逢</span>
                    <el-input class="fl" v-model="sign" v-else size="small" prefix-icon="el-icon-edit"></el-input>
                </div>
                <span class="personal-small"><i class="el-icon-message"></i> Email：iamlokep@163.com</span>
                <span class="personal-small"><i class="el-icon-phone"></i> Tel：15557106128</span>
            </div>
        </div>
        <div class="personal-body">
            <ul class="personal-choice">
                <li>我的文章</li>
                <li>我关注的话题</li>
                <li>我关注的用户</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            headPicBg:'#'+Math.floor(Math.random()*1000000),
            sign:'',
            isEditSign:false
        }
    },
    methods:{
        changeHeadPicBg(){
            this.headPicBg = '#'+Math.floor(Math.random()*1000000)
        },
        editSign(){
            this.isEditSign = true
        }
    }
}
</script>