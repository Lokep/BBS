<style>
    .setting{
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        border-radius: 3px;
        box-shadow: 0 0 4px rgba(6, 10, 29, 0.04);
        margin: 20px auto;
        padding: 15px 5px;
        width: 724px;

    }
    .setting-left{
        color: #8590A6;
        /* height: 50px; */
        overflow: hidden;
        padding-left: 28px;
        font-size: 15px;
        line-height: 50px;
        width: 110px;
    }
    .setting-left li{
        height: 50px;
    }
    .setting-right{
        /* height: 619px; */
        padding-bottom: 40px;
        border-left: 1px solid #EBEBEB;
        width: 525px;
        /* padding: 0 18px 0; */
    }
    .setting-block{
        overflow: hidden;
        padding: 20px 18px 20px;
        border-bottom: 1px solid #EBEBEB;
    }
    .setting-title{
        color: #1A1A1A;
        font-size: 19px;
        font-weight: 600;
        height: 26px;
        line-height: 26px;
        margin-bottom: 9px;
    }
    .setting-desc{
        color: #8590A6;
        font-size: 14px;
        line-height: 1.5;
        width: 270px;
        word-break: break-all;
    }
    .setting-sub-title{
        color: #1A1A1A;
        font-size: 15px;
        font-weight: 600;
        height: 21px;
        line-height: 21px;
        margin: 0 0 5px 0;
    }
    .setting-sub-block{
        margin-left: 38px;
        position: relative;
    }
    .setting-btn{
        position: absolute;
        right: 30px;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 30px;
        color: #0084FF;
        font-size: 15px;
        height: 21px;
        line-height: 21px;
    }
</style>
<template>
    <div class="setting ov">
        <div class="setting-left fl">
            <ul>
                <li>
                    <img class="inline-middle" src="../../assets/svgs/user.svg">
                    <span class="inline-middle">账户与密码</span>
                </li>
            </ul>
        </div>
        <div class="setting-right fr">
            <div class="setting-block">
                <h3 class="setting-title">帐户设置</h3>
                <span class="setting-desc">帐户设置/密码服务</span>
            </div>
            <div class="setting-block">
                <h4 class="setting-sub-title">帐户与密码</h4>
                <span class="setting-desc">绑定手机和邮箱，并设置密码，帐号更安全注意：为保证帐号安全，需进行二次验证。</span>  
            </div>
            <div class="setting-block setting-sub-block">
                <h4 class="setting-sub-title">密码</h4>
                <span class="setting-desc">帐户设置/密码服务</span>
                <button class="fr setting-btn" @click="modalEdit('密码')">编辑</button>
            </div>
            <div class="setting-block setting-sub-block">
                <h4 class="setting-sub-title">绑定手机</h4>
                <span class="setting-desc">{{confusion.phone}}</span>
                <button class="fr setting-btn" @click="modalEdit('手机号')">编辑</button>
            </div>
            <div class="setting-block setting-sub-block">
                <h4 class="setting-sub-title">绑定邮箱</h4>
                <span class="setting-desc">{{confusion.email}}</span>
                <button class="fr setting-btn" @click="modalEdit('邮箱')">编辑</button>
            </div>
            
        </div>

        <EditModal :isVisible="modalVisible" :inputType="inputType" @on-visible-change="onVisibleChange" ></EditModal>
    </div>
</template>
<script>
import EditModal from '../../components/modal/setting-edit'
import STORAGE from '../../assets/javascripts/storage.js'
export default {
    data(){
        return{
            modalVisible:false,
            inputType: "",
            confusion:{
                phone:'',
                email:''
            }
        }
    },
    components:{
        EditModal
    },
    methods:{
        modalEdit(inputType){
            this.modalVisible = true;
            this.inputType = inputType
        },
        onVisibleChange(val){
            console.log(val)
            this.modalVisible=val;//④外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
        },
        confusionPhone(v,row){
            row = row||4
            var len= v.length;
            var star= v.substring(3,len-row);
            var value = v.replace(star,"****");
            return value;
        },
        confusionEmail(v,row){
            row = row||4
            var len= v.length;
            var arr = v.split('@')
            var suffix = '@'+arr[arr.length-1]
            var star= arr[0].substring(3,len-row);
            var value = arr[0].replace(star,"****")+suffix;
            return value;
        }
    },
    mounted(){
        this.confusion.email = this.confusionEmail(STORAGE.GET('USERINFO')[0].email,4)
        this.confusion.phone = this.confusionPhone(STORAGE.GET('USERINFO')[0].phone,4)
    }
}
</script>
