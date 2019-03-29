/* 设置中编辑信息的模态框 */
<style>
  .el-dialog {
    padding-top: 10px;
  }

  .edit-tip {
    margin: -25px auto 24px;
    font-size: 14px;
    color: #8590A6;
    max-width: 240px;
    text-align: center;
  }

  .edit-footer {
    padding-bottom: 10px;
  }
</style>
<template>
  <el-dialog title="信息编辑" :center=true :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
    <!--<span class="edit-tip">为了保护你的帐号安全，请验证身份，验证成功后进行下一步操作</span>-->
    <el-form label-width="80px" status-icon>
      <el-form-item :label="'原' + inputType">
        <el-input v-model.trim="oldInfo" :placeholder="'请输入原始' + inputType"></el-input>
      </el-form-item>
      <el-form-item :label="'新' + inputType">
        <el-input v-model.trim="newInfo" :placeholder="'请输入新的' + inputType"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer edit-footer">
            <el-button @click="onCancel">取 消</el-button>
            <el-button type="primary" @click="onConfirm">确 定</el-button>
        </span>
  </el-dialog>
</template>
<script>
  export default {
    props: ['isVisible', "inputType"],
    data() {
      return {
        dialogVisible: this.isVisible,
        oldInfo: "",
        newInfo: "",
        userinfo: {}
      }
    },
    mounted() {
      let userinfo = localStorage.getItem("USERINFO");
      if (userinfo) {
        userinfo = JSON.parse(userinfo)
        this.userinfo = userinfo[0]
        console.log(this.userinfo, "this.userinfo")
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {
            });
      },
      onConfirm() {
        switch (this.inputType) {
          case '密码':
            this.updatePwd()
            break;
          case '手机号':
            this.updatePhone()
            break;
          default:
            this.updateEmail();
        }
      },
      onCancel() {
        this.oldInfo = this.newInfo = "";
        this.dialogVisible = false
      },
      updatePwd() {
        this.$axios.post("/api/users/update_pwd", {
          id: this.userinfo.id,
          oldpwd: this.oldInfo,
          newpwd: this.newInfo
        }).then(res => {
          if (res.data.code === "200") {
            this.$message({
              type: "success",
              message: res.data.message
            });
            this.onCancel()
          }
        })
      },
      updatePhone() {
        this.$axios.post("/api/users/update_phone", {
          id: this.userinfo.id,
          oldphone: this.oldInfo,
          newphone: this.newInfo
        }).then(res => {
          if (res.data.code === "200") {
            this.$message({
              type: "success",
              message: res.data.message
            });
            this.onCancel()
          }
        })
      },
      updateEmail() {
        this.$axios.post("/api/users/update_email", {
          id: this.userinfo.id,
          oldemail: this.oldInfo,
          newemail: this.newInfo
        }).then(res => {
          if (res.data.code === "200") {
            this.$message({
              type: "success",
              message: res.data.message
            });
            this.onCancel()
          }
        })
      }
    },
    watch: {
      isVisible(val) {
        this.dialogVisible = val
      },
      dialogVisible(val) {
        this.$emit("on-visible-change", val)
      }
    }
  }
</script>
