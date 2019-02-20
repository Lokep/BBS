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
            <div v-if="loginOrRegister==true">
                <el-form>
                    <el-form-item label="手机号/邮箱">
                        <el-input placeholder="请输入手机号或邮箱" @focus="shifrCarton" @blur="initCarton"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input placeholder="请输入您的密码" type="password" @focus="shifrCarton" @blur="initCarton"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div class="sign-buttons ov">
                            <el-button type="primary" size="medium" class="sign-button">登录</el-button>
                        </div>
                    </el-form-item>
                </el-form>
                <div class="ov">
                    <span class="sign-shift hover-in-blue pointer fl" @click="shiftSign">没有账号，去注册</span>
                    <router-link to="/reset-password" tag="span" class="fr sign-forgetPWD hover-in-blue pointer">忘记密码</router-link>
                </div>
            </div>

            <div v-else-if="loginOrRegister==false">
                <el-form>
                    <el-form-item label="手机号">
                        <el-input placeholder="请输入手机号" @focus="shifrCarton" @blur="initCarton"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱E-mail">
                        <el-input placeholder="请输入邮箱" @focus="shifrCarton" @blur="initCarton"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input placeholder="请输入您的密码" type="password" @focus="shifrCarton" @blur="initCarton"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input placeholder="请再次输入您的密码" type="password" @focus="shifrCarton" @blur="initCarton"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div class="sign-buttons ov">
                            <el-button type="primary" size="medium" class="sign-button">注册</el-button>
                        </div>
                    </el-form-item>
                </el-form>
                <div class="ov">
                    <span class="sign-shift hover-in-blue pointer fl" @click="shiftSign">已有账号，去登录</span>
                    <!-- <router-link to="/forgetPWD" tag="span" class="fr sign-forgetPWD hover-in-blue pointer">忘记密码</router-link> -->
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            loginOrRegister:true,
            cartonIndex:0
        }
    },
    components:{

    },
    methods:{
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
        shiftSign(){
            this.loginOrRegister = !this.loginOrRegister;
        },
        initCarton(){
            this.cartonIndex = 0;
        }
    }
}
</script>