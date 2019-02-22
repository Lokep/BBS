<style>
    .activity{
        width: 220px;
        height: 282px;
        background: #f3f3f3;
        border-radius: 2px;
        margin: 0 10px 20px;
    }
    .activity-title{
        font-size: 16px;
        max-height: 38px;
        line-height: 1.2;
        color: #333;
        cursor: pointer;
    }
    .activity-info{
        padding: 15px 15px 0;
    }
    .activity-img{
        width: 100%;
        height: auto;
    }
    .activity-detail{
        font-size: 13px;
        color: #999;
    }
    .activity-detail:nth-of-type(1){
        margin: 8px 0 0;
    }
    .btn {
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
        margin: 15px;
    }
</style>
<template>
    <div class="activity fl">
        <a :href="activityInfo.link">
            <img class="activity-img" :src="activityInfo.imgSrc" alt="LOGO">
        </a>
        <div class="activity-info">
            <a :href="activityInfo.link" class="ellipsis-within-two-rows activity-title hover-in-blue">{{activityInfo.title}}</a>
            <span class="activity-detail">时间：{{activityInfo.time}}</span>
            <span class="activity-detail">城市：{{activityInfo.city}}</span>
        </div>
        <div class="ov">
            <a :href="activityInfo.link" class="fr btn-primary btn-sm btn" target="_blanket">立即报名</a>
        </div>
    </div>
</template>
<script>
export default {
    props:['activityInfo'],
    data(){
        return{
            city:'hangzhou',
            date:'2019/3/07',
            day:'周四',
            now:this.GetDateStr()
        }
    },
    mounted(){
        var b = this.replcement(this.now)>this.replcement(this.date)
    },
    methods:{
        replcement(str){
            return (str.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,''))
        },
        num(s) {
            return s < 10 ? '0' + s: s;
        },
        GetDateStr() { 
            var dd = new Date(); 
            dd.setDate(dd.getDate());//获取AddDayCount天后的日期 
            var y = dd.getFullYear(); 
            var m = dd.getMonth()+1;//获取当前月份的日期 
            var d = dd.getDate(); 
            return y+"-"+this.num(m)+"-"+this.num(d); 
        }
    }
}
</script>
