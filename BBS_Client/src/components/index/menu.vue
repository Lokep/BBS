<style>
    .index-left{
        position: fixed;
        top: 160px;
        left: 50%;
        margin-left: -400px;
    }
    .index-block{
        margin-bottom: 10px;
        /* background: #FFFFFF; */
        overflow: hidden;
        border-radius: 2px;
        box-sizing: border-box;
        /* width: 276px; */
        padding: 0 10px;
    }
    .index-left-edit{
        height: 97px;
        display: table;
    }
    .index-left-edit>span{
        display: table-cell;
        font-size: 15px;
        color: #8590A6;
        text-align: center;
    }
    .index-icon-edit{
        width: 24px;
        height: 24px;
        margin: 25px auto 5px;
    }

    .index-left-special>li{
        height: 40px;
        color:#8590A6;
        font-size: 14px;
        border-radius: 40px;
        background-color: #fff;
        box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
        width: 40px;
        overflow: hidden;
        margin-bottom: 15px;
    }
    .index-left-special>li:hover{
        background-color: #0084FF;
    }
    .index-left-special>li:hover .index-icon-special{
        fill: #fff;
        color:#fff;
    }
    .index-icon-special{
        display: block;
        width: 18px;
        height: 18px;
        margin: 11px auto;
        text-align: center;
        line-height: 20px;
        font-size: 18px;
    }
    .index-icon-hot{
        width: 22px;
        height: 22px;
        margin-left: -3px;
    }
</style>
<template>
    <div class="index-left fl">
        <!-- <div class="index-left-edit index-block ">
            
            <router-link to='/editor' tag="span" class="pointer">
                <img class="index-icon-edit" src="../../assets/svgs/edit-thought.svg" alt="">
                写想法
            </router-link>
        </div> -->
        <ul class="index-left-special index-block">

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
        </ul>
        <div class="index-footer">
            
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    }
}
</script>
