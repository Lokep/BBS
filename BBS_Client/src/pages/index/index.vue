<style>
    .lists{
        background-color: #fff;
        width: 694px;
        margin-right: 100px;
        border-radius: 4px;
    }
    
</style>
<template>
    <div class="index ov">
        <Menu></Menu>
        <div class="lists fr">
            <List :p="l" v-for="(l,i) in listSum" :key='i'></List>
        </div>
    </div>
</template>
<script>
import Menu from '../../components/index/menu'
import List from '../../components/index/list'

export default {
    
    data(){
        return{
            listSum:[]
        }
    },
    components:{
        List,
        Menu
    },
    methods:{

    },
    mounted(){
        let listAPI =`/api/articleList`
        this.$axios.post(listAPI).then(res=>{
            // console.log(res)
            this.listSum = res.data
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