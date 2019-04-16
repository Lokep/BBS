<template>
  <div id="app">
    <Nav v-if="!$route.meta.notNeedNav"></Nav>
    <div class="container">
        <router-view/>
        
    </div>
    
  </div>
</template>

<script>
import Nav from './components/layout/nav'
export default {
  name: 'App',
  data(){
    return{
      notNeedNav:false
    }
  },
  components:{
      Nav
  },
  methods:{

  },
  mounted(){
    // console.log(this.$route)
  }
}
</script>

<style>
#app{
  width: 100%;
    height: auto;
    min-height: 100%;
    min-height: 100vh;
    overflow: hidden;
}
.container{
  width: 1032px;
  margin: 70px auto;
  /* padding: 60px 0 0 0; */
}
</style>
