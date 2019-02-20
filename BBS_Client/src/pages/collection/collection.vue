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
                <topics-list></topics-list>
            </div>
            <EnddingLine></EnddingLine>
        </div>
    </div>
</template>
<script>
import Menu from '../../components/index/menu'
import TopicsList from '../../components/topics/topics-list'
import EnddingLine from '../../components/endding-line/endding-line'
export default {
    data(){
        return{

        }
    },
    components:{
        Menu,
        TopicsList,
        EnddingLine
    }
}
</script>
