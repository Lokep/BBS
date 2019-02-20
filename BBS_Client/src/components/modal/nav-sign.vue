/* 设置中编辑信息的模态框 */
<style>
    .el-dialog{
        padding-top: 10px;
    }
    .sign-footer{
        padding-bottom:10px; 
    }
</style>
<template>
    <el-dialog
    title="登录"
    :center=true
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
        <span class="sign-head"></span>
        <el-form label-width="60px" status-icon>
            <el-form-item label="手机号">
                <el-input placeholder="请输入完整手机号"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input placeholder="请输入您的密码"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer sign-footer">
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
