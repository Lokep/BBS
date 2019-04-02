<style scope>
  #app {
    overflow: hidden;
  }

  .container {
    padding: 0;
  }

  .sign {

  }

  .sign-form {
    box-shadow: 0 0 4px rgba(6, 10, 29, 0.04);
    background-color: #fff;
    padding: 35px;
    border-radius: 3px;
    margin: 180px auto 0;
    width: 550px;
    position: relative;
  }

  .sign-carton {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: -160px;
  }

  /* .sign-buttons{
      width: 200px;
      margin: 0 auto;
  } */
  .sign-button {
    width: 120px;
    margin: 0 auto;
    display: block;
  }

  .sign-forgetPWD, .sign-shift {
    font-size: 14px;
    color: #8b9196;
    line-height: 50px;
    height: 40px;
  }

</style>

<template>
  <div class="sign">
    <div class="sign-form">
      <img class="sign-carton" v-if="cartonIndex==0" src="../../assets/images/sign-normal.png">
      <img class="sign-carton" v-else-if="cartonIndex==1" src="../../assets/images/sign-greeting.png">
      <img class="sign-carton" v-else src="../../assets/images/sign-blindfold.png">
      <div>
        <el-form :model="resetForm">
          <el-form-item label="手机号/邮箱">
            <el-input v-model="resetForm.account" placeholder="请输入手机号或邮箱" @focus="shiftCarton"
                      @blur="initCarton"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="resetForm.newPassword" placeholder="请输入新的密码" type="password" @focus="shiftCarton"
                      @blur="initCarton"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="resetForm.confirmPassword" placeholder="请再次输入新的密码" type="password" @focus="shiftCarton"
                      @blur="initCarton"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="sign-buttons ov">
              <el-button type="primary" size="medium" class="sign-button" @click="onSubmit">提交</el-button>
            </div>
          </el-form-item>
        </el-form>
        <div class="ov">
          <router-link to="/sign" tag="span" class="fl sign-forgetPWD hover-in-blue pointer">去登录</router-link>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import STORAGE from '../../assets/javascripts/storage.js'

  export default {
    data() {
      return {
        loginOrRegister: true,
        cartonIndex: 0,
        regForEmail: /(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
        resetForm: {
          account: '',
          accountType: '',
          newPassword: '',
          confirmPassword: ''
        }
      }
    },
    components: {},
    methods: {
      shiftCarton(e) {
        let iptType = e.target.type;
        if (iptType === 'text') {
          this.cartonIndex = 1
        } else if (iptType === 'password') {
          this.cartonIndex = 2
        } else {
          this.cartonIndex = 0
        }
      },
      shiftSign() {
        this.loginOrRegister = !this.loginOrRegister;
      },
      initCarton() {
        this.cartonIndex = 0;
      },
      onSubmit() {
        if (this.resetForm.account !== '' && this.resetForm.newPassword !== '' && this.resetForm.confirmPassword !== '') {
          if (this.resetForm.newPassword !== this.resetForm.confirmPassword) {
            this.$message({
              type: "error",
              message: '两次输入密码不一致，请重新输入'
            })
          } else {
            this.resetForm.accountType = this.regForEmail.test(this.resetForm.account) ? 'email' : 'phone';
            this.$axios.post('/api/users/resetPwd', this.resetForm).then(res => {
              if (res.data.code === "200") {
                this.$message({
                  type: "success",
                  message: res.data.message
                });
                STORAGE.REMOVE();
                this.$router.push({path: '/login'})
              }
            }).catch(err => {
              this.$message({
                type: "error",
                message: res.data.message
              });
            })
          }
        } else {
          this.$message({
            type: "error",
            message: "请检查您的输入是否有误"
          })
        }
      }
    }
  }
</script>