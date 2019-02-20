/* 设置中编辑信息的模态框 */
<style>
    .el-dialog{
        padding-top: 10px;
    }
    .edit-tip{
        margin: -25px auto 24px;
        font-size: 14px;
        color: #8590A6;
        max-width: 240px;
        text-align: center;
    }
    .edit-footer{
        padding-bottom:10px; 
    }
</style>
<template>
    <el-dialog
    title="信息编辑"
    :center=true
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
        <span class="edit-tip">为了保护你的帐号安全，请验证身份，验证成功后进行下一步操作</span>
        <el-form label-width="60px" status-icon>
            <el-form-item label="原号码">
                <el-input placeholder="请输入完整手机号"></el-input>
            </el-form-item>
            <el-form-item label="新号码">
                <el-input placeholder="请输入新的手机号"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer edit-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
    props:['isVisible'],
    data(){
        return{
            dialogVisible: this.isVisible
        }
    },
    methods:{
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        }
    },
    watch:{
        isVisible(val){
            this.dialogVisible = val
        },
         dialogVisible(val){
             this.$emit("on-visible-change",val)
         }
    }
}
</script>
