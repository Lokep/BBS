<style>
    .index-left{
        position: fixed;
        top: 70px;
        left: 50%;
        margin-left: -515px;
        width: 296px;
    }
    .index-block{
        margin-bottom: 10px;
        background: #FFFFFF;
        overflow: hidden;
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
        box-sizing: border-box;
        width: 276px;
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
    .index-left-special{
        height: 120px;
    }
    .index-left-special>li{
        height: 40px;
        text-align: left;
        color:#8590A6;
        font-size: 14px;
        line-height: 40px;
    }
    .index-icon-special{
        display: inline-block;
        width: 18px;
        height: 18px;
        margin: -4px 0 0 0;
        vertical-align: middle;
    }
    .index-icon-hot{
        width: 22px;
        height: 22px;
        margin-left: -3px;
    }
</style>
<template>
    <div class="index-left fl">
        <div class="index-left-edit index-block ">
            <router-link to='/editor' tag="span" class="pointer">
                <img class="index-icon-edit" src="../../assets/svgs/edit-article.svg" alt="">
                写文章
            </router-link>
            <router-link to='/editor' tag="span" class="pointer">
                <img class="index-icon-edit" src="../../assets/svgs/edit-thought.svg" alt="">
                写想法
            </router-link>
        </div>
        <ul class="index-left-special index-block">
            <router-link to="/" tag="li" class="pointer">
                <img class="index-icon-special" src="../../assets/svgs/like.svg" alt="">
                推荐
            </router-link>

            <router-link to="/collection" tag="li" class="pointer">
                <img class="index-icon-special" src="../../assets/svgs/follow.svg" alt="">
                关注
            </router-link>
            
            <router-link to="/hot" tag="li" class="pointer">
                <img class="index-icon-special index-icon-hot" src="../../assets/svgs/hot.svg" alt="">
                热榜
            </router-link>
            <router-link to="/" tag="li"></router-link>
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
