<style>
    .colleciton-lists{
        background-color: #fff;
        width: 694px;
        min-height: calc(100vh - 120px);
    }
    .colleciton-lists{
        padding: 20px;
    }
</style>
<template>
    <div class="collection ov">
        <Menu></Menu>
        <div class="colleciton-lists fr ov">
            <div class="ov">
                <topics-list v-for='(k,i) in TOPICS' :key='i' :i='i' :topicsContent='k'></topics-list>
            </div>
            <EnddingLine></EnddingLine>
        </div>
    </div>
</template>
<script>
import Menu from '../../components/index/menu'
import TopicsList from '../../components/topics/topics-list'
import EnddingLine from '../../components/endding-line/endding-line'
import STORAGE from '../../assets/javascripts/storage.js'
export default {
    data(){
        return{
            TOPICS:[{
                topicImg:'...',
                topicTitle:'sdafsasdfk sda',
                topicSum:2356,
                isFollow:true
            }]
        }
    },
    mounted(){
        let collectionAPI = '/api/follow/myfollow'
        let params = {
            userID:STORAGE.GET('USERINFO')[0].userID
        }
        console.log(params)
        this.$axios.post(collectionAPI,params).then(res=>{
            console.log(res)
            this.TOPICS = res.data
        }).catch(err=>{
            console.log(err)
        })
    },
    components:{
        Menu,
        TopicsList,
        EnddingLine
    }
}
</script>
