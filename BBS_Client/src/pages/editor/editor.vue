
<style scoped>
    html{
        overflow: hidden;
    }
    .editor{
        padding: 50px 32px;
        margin: 0 auto;
        width: 960px;
        background-color: #fff;
    }
    .editor-title{
        height: 44px;
        min-height: 44px;
        display: block;
        width: 100%;
        border: 0;
        border-bottom: 1px solid #ccc;
        margin:20px 0 30px;
        font-size: 32px;
        line-height: 1.4;
        font-weight: 600;
        outline: none;
        box-shadow: none;
    }
</style>

<template>
    <div class="editor">
        <input type="text" class="editor-title" placeholder="请输入标题">
        <quillEditor></quillEditor>
    </div>
</template>

<script>
 import quillEditor from '../../components/editor/quill-editor' //调用编辑器
 export default {
    data() {
        return {
            infoForm: {
                a_title: '',
                a_source: '',
                a_content:'',
                editorOption: {}
            }
        }
    },
    computed: {
        
    },
    mounted() {
    //初始化
    },
    methods: {
        
    },
    components: {
        //使用编辑器
        quillEditor
    }
 }
</script>
