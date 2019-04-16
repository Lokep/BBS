<style scoped>
    #app{
        overflow: hidden;
    }
    .container{
        padding: 0;
    }
    
    .sign-form{
        box-shadow: 0 0 4px rgba(6, 10, 29, 0.04);
        background-color: #fff;
        padding: 35px;
        border-radius: 3px;
        margin: 180px auto 0;
        width: 550px;
        position: relative;
    }
    .sign-carton{
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
    .sign-button{
        width: 120px;
        margin: 0 auto;
        display: block;
    }
    .sign-forgetPWD,.sign-shift{
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
                <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon>
                    <el-form-item 
                        label="手机号/邮箱"
                        prop="account"
                        >
                        <el-input v-model="loginForm.account" placeholder="请输入手机号或邮箱" @focus="shifrCarton" @blur="initCarton"></el-input>
                    </el-form-item>
                    <el-form-item 
                        label="密码" 
                        prop="password"
                    >
                        <el-input v-model="loginForm.password" placeholder="请输入您的密码" type="password" @focus="shifrCarton" @blur="initCarton"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div class="sign-buttons ov">
                            <el-button type="primary" size="medium" class="sign-button" @click="login('loginForm')" >登录</el-button>
                        </div>
                    </el-form-item>
                </el-form>
                <div class="ov">
                    <router-link to="/register" tag="span" class="sign-shift hover-in-blue pointer fl">没有账号，去注册</router-link>
                    <router-link to="/reset-password" tag="span" class="fr sign-forgetPWD hover-in-blue pointer">忘记密码</router-link>
                </div>
            </div>

            
        </div>
    </div>
</template>
<script>
import STORAGE from '../../assets/javascripts/storage.js'
export default {
    data(){
        return{
            // loginOrRegister:true,
            cartonIndex:0,
            loginForm:{
                account:'',
                accountType:'',
                password:''
            },
            regForPhone:/^1[34578]\d{9}$/,
            regForEmail:/(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
            regForAccount:/(^1[34578]\d{9}$)|(^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$)/i,
            loginRules:{
                account:[{
                    required:true,
                    message: '账号不可为空',
                    trigger: 'blur'
                },{
                    pattern:/(^1[34578]\d{9}$)|(^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$)/i,
                    trigger:'blur',
                    message:'请正确输入您的手机号或者邮箱'
                }],
                password:[{
                    required:true,
                    message: '密码不可为空',
                    trigger: 'blur'
                }]
            }
        }
    },
    created(){
        let that = this;
        document.onkeydown = function(e) {
            var key = window.event.keyCode;
            if (key == 13) {
                that.login('loginForm');
            }
        }
    },
    components:{

    },
    mounted(){
        
    },
    methods:{
        login(formName){
            let that = this
            let loginAPI = '/api/users/login'

            this.$refs[formName].validate((valid) => {
                
                if (valid) {

                    that.loginForm.accountType = that.regForPhone.test(that.loginForm.account)?'phone':'email'
                    console.log(that.loginForm)
                    that.$axios.post(loginAPI,that.loginForm).then(res=>{
                        if(res.data.length){
                            STORAGE.SET(res.data)
                            this.$router.push({path:'/',params:res.data})
                        }
                        
                    }).catch(err=>{
                        console.log(err)
                    })
                } else {
                    return false;
                }
            });
        },
        shifrCarton(e){
            let iptType = e.target.type
            if(iptType=='text'){
                this.cartonIndex = 1
            }else if(iptType == 'password'){
                this.cartonIndex = 2
            }else{
                this.cartonIndex = 0
            }
        },
        initCarton(){
            this.cartonIndex = 0;
        }
    }
}
</script>
