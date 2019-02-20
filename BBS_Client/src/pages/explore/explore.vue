<style>
    .explore-title{
        margin-bottom: 20px;
    }
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
</style>
<template>
    <div class="explore">
        <div class="explore-title ov">
            <h4 class="common-title fl">最新活动</h4>
            <el-select v-model="value" placeholder="全部类型" size="small">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="value" placeholder="全部类型" size="small">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>

        <div class="explore-lists ov">
            <Activity></Activity>
        </div>
        <EnddingLine></EnddingLine>
    </div>
</template>
<script>

import Activity from '../../components/explore/activity'
import EnddingLine from '../../components/endding-line/endding-line'
export default {
    data(){
        return {
            options: [{
            value: '选项1',
            label: '全部类型'
            }, {
            value: '选项2',
            label: '黑客马拉松'
            }, {
            value: '选项3',
            label: '线上活动'
            }, {
            value: '选项4',
            label: '线下活动'
            }],
            value: ''
        }
    },
    components:{
        Activity,
        EnddingLine
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
