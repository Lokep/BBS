<template>
  <div class="tags">
    <ul>
      <li class="tans_li" v-for="(item, index) in tagList" :key="index">
        <<router-link :to="item.path" class="tags_li_title">
          {{item.title}}
        </router-link>
        <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tagList: []
    }
  }
}
</script>
