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
        margin: 90px auto 0;
        width: 550px;
        position: relative;
    }
    .sign-carton{
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        top: -120px;
        width: 180px;
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
                <el-form ref="registerForm" :model="registerForm" :rules="registerRules" status-icon>
                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="registerForm.userName" placeholder="请来一个阔爱的用户名" @focus="shifrCarton" @blur="initCarton"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="registerForm.phone" placeholder="请输入手机号" @focus="shifrCarton" @blur="initCarton"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱E-mail" prop="email">
                        <el-input v-model="registerForm.email" placeholder="请输入邮箱" @focus="shifrCarton" @blur="initCarton"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="registerForm.password" placeholder="请输入您的密码" type="password" @focus="shifrCarton" @blur="initCarton"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="confirmPassword">
                        <el-input v-model="registerForm.confirmPassword" placeholder="请再次输入您的密码" type="password" @focus="shifrCarton" @blur="initCarton"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div class="sign-buttons ov">
                            <el-button type="primary" size="medium" class="sign-button" @click="register('registerForm')">注册</el-button>
                        </div>
                    </el-form-item>
                </el-form>
                <div class="ov">
                    <router-link to="/login" tag="span" class="sign-shift hover-in-blue pointer fl">已有账号，去登录</router-link>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
import STORAGE from '../../assets/javascripts/storage.js'
export default {
    data(){
        const ruleForConfirmPassword=(rule,value,callback)=>{
            let pwd = this.$refs.registerForm.model.password;
            if(value!==pwd){
                callback(new Error('两次输入的密码不一致'))
            }else{
                callback()
            }
        };
        const ruleForUniquePhone=(rule,value,callback)=>{
            let checkPhoneAPI = '/api/users/checkUniquePhone'
            let params = {
                phone:this.$refs.registerForm.model.phone
            }
            if(value===''){
                callback(new Error('手机号不可为空'))
            }else if( !this.regForPhone.test(value) ){
                callback(new Error('请正确输入您的手机号'))
            }else{

                this.$axios.post(checkPhoneAPI,params).then(res=>{
                    console.log(res.data)
                    if(res.data.isExisits){
                        callback(new Error('该号码已存在'))
                    }else{
                        callback()
                    }
                }).catch(err =>{
                    callback(new Error('请重新输入手机号'))
                })
            }
            
        }
        const ruleForUniqueEmail = (rule,value,callback)=>{
            let checkEmailAPI = '/api/users/checkUniqueEmail'
            let params = {
                email:this.$refs.registerForm.model.email
            }
            if(value===''){
                callback(new Error('邮箱不可为空哦'))
            }else if( !this.regForEmail.test(value) ){
                callback(new Error('请正确输入您的Email'))
            }else{

                this.$axios.post(checkEmailAPI,params).then(res=>{
                    console.log(res.data)
                    if(res.data.isExisits){
                        callback(new Error('该邮箱已存在啦'))
                    }else{
                        callback()
                    }
                }).catch(err =>{
                    callback(new Error('请重新输入您的邮箱'))
                })
            }
        }
        return{
            cartonIndex:0,
            registerForm:{
                userName:'',
                phone:'',
                email:'',
                password:'',
                confirmPassword:''
            },
            regForPhone:/^1[34578]\d{9}$/,
            regForEmail:/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
            regForAccount:/(^1[34578]\d{9}$)|(^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$)/i,
            registerRules:{
                userName:[{
                    required:true,
                    message:'用户名不阔以为空哦',
                    trigger:'blur'
                }],
                phone:[{
                    required:true,
                    validator: ruleForUniquePhone,
                    trigger: 'blur'
                },{
                    pattern:/^1[34578]\d{9}$/,
                    trigger:'blur',
                    message:'请正确输入您的手机号'
                }],
                email:[{
                    required:true,
                    message: '邮箱地址不可为空',
                    trigger: 'blur'
                },{
                    required:true,
                    validator: ruleForUniqueEmail,
                    trigger: 'blur'
                }],
                password:[{
                    required:true,
                    message: '密码不可为空',
                    trigger: 'blur'
                }],
                confirmPassword:[{
                    required:true,
                    message: '密码不可为空',
                    trigger: 'blur'
                },{
                    validator:ruleForConfirmPassword,
                    trigger:'blur',
                    required:true
                }]
            }
        }
    },
    components:{

    },
    mounted(){
        // if(STORAGE.GET().length != 0){
        //     this.$router.push('/')
        // }
    },
    methods:{
        register(formName){
            let that = this
            let registerAPI = '/api/users/register'
            this.$refs[formName].validate((valid) => {
                
                if (valid) {

                    that.$axios.post(registerAPI,that.registerForm).then( res =>{
                        console.log(res)
                    }).catch (err =>{
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