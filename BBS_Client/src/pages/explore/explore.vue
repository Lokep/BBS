<style scoped>
    .el-select{
        margin: 3px 0 0 25px;
        width: 115px;
        color:#009a61;
    }
    .el-input__inner{
        outline: none;
        -webkit-appearance: normal;
        line-height: 56px;
    }
    .explore-lists {
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
    }
    .explore-list {
        margin-right: 38px;
        margin-bottom: 15px;
    }
</style>
<template>
    <div class="explore">
        <div class="explore-title ov">
            <h4 class="common-title fl">最新活动</h4>
            <el-select v-model="type" placeholder="全部类型" size="small" @change='selectActivity'>
                <el-option
                v-for="item in activityType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="city" placeholder="全部城市" size="small" @change='selectActivity' >
                <el-option
                v-for="item in activityCity"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>

        <div class="explore-lists ov">
            <Activity class="explore-list" v-for="(a, i) in activityList" :key = "i" :activityInfo="a"></Activity>
        </div>
        <EnddingLine></EnddingLine>
    </div>
</template>
<script>

import Activity from '../../components/explore/activity'
import EnddingLine from '../../components/endding-line/endding-line'
import { city } from '../../assets/javascripts/city.js'
export default {
    data(){
        return {
            activityType: [{
                value: '',
                label: '全部类型'
            },  {
                value: '0',
                label: '线上活动'
            }, {
                value: '1',
                label: '线下活动'
            }],
            activityCity:city,
            type: '',
            city:'',
            activityList:[]
        }
    },
    components:{
        Activity,
        EnddingLine
    },
    methods:{
        selectActivity(){
            let exploreApi = '/api/explore/activity'
            let params = {
                type:this.type,
                city:this.city
            }
            console.log(this.type)
            this.$axios.post(exploreApi,params).then(res=>{
                this.activityList = res.data;
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    mounted(){
        this.selectActivity()
    },
    watch:{

    },
    computed:{

    }
}
</script>
