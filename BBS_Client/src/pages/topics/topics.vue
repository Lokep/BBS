<style>
    
</style>
<template>
    <div class="topics ov">
        <h4 class="common-title">全部话题</h4>
        <div class="topics-lists ov">
            <TopicsList v-for="(k,i) in topicsList" :key="i" :index="i" :topicsContent="k" ></TopicsList>
        </div>
    </div>
</template>
<script>
import TopicsList from '../../components/topics/topics-list'
export default {
    
    data(){
        return{
            topicsList:[]
        }
    },
    components:{
        TopicsList
    },
    methods:{
        
    },
    mounted(){
        let topicAPI = '/api/topics/list'
        let that =this
        this.$axios.post(topicAPI).then(res=>{
            this.topicsList = res.data
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    },
    watch:{

    },
    computed:{

    }
}
</script>