<template>
  <div class="home">
    <v-header :admin="admin"></v-header>
    <v-sidebar></v-sidebar>
    <div class="content-box">
      <div class="content">
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import vHeader from "@/components/Header.vue";
import vSidebar from "@/components/SideBar.vue";
import vTags from "@/components/Tags.vue";
export default {
  components: {
    vHeader,
    vSidebar,
    // vTags
  },
  data() {
    return {
      tagsList: [],
      admin: ""
    };
  },
  mounted() {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    this.admin = user.admin
  }
};
</script>

<style scoped>
.content-box {
  position: absolute;
  left: 250px;
  right: 0;
  top: 70px;
  bottom: 0;
  padding-bottom: 30px;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
  background: #f0f0f0;
}

.content {
  width: auto;
  height: 100%;
  padding: 10px;
  overflow-y: scroll;
  box-sizing: border-box;
}
</style>
